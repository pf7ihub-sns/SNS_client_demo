import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, FormEvent, KeyboardEvent, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { dragonSuiteSprite } from '../data/dragonSuiteIcons';
import { MODS, J, LAYERS, FW, ROLES, deckUrl, esc } from '../data/dragonSuite';
import type { DsMsg } from '../data/dragonSuite';
import { HeroFlow } from './DragonHeroFlow';
import './DragonSuitePage.css';

/* =========================================================
   Helpers
   ========================================================= */
type ToastFn = (msg: string) => void;

// Demo form: set ONE of these to make "Book a demo" really deliver requests.
//   DEMO_ENDPOINT : a form service URL. The form POSTs JSON to it.
//   DEMO_EMAIL    : an inbox. The form opens the visitor's email app with the request filled in.
// Leave both empty and the form honestly says it is not connected yet.
const DEMO_ENDPOINT = '';
const DEMO_EMAIL = '';

const THEME_KEY = 'dragon-suite-theme';

// stable object so React does not re-assign the sprite's innerHTML on every render
const SPRITE_HTML = { __html: dragonSuiteSprite };

function Icon({ n, className = 'ic', style }: { n: string; className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} aria-hidden="true">
      <use href={`#i-${n}`} />
    </svg>
  );
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Arrow / Home / End keyboard support shared by both ARIA tab lists */
function useTabKeys(count: number, select: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (i: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    const k = e.key;
    let n: number | null = null;
    if (k === 'ArrowRight' || k === 'ArrowDown') n = (i + 1) % count;
    if (k === 'ArrowLeft' || k === 'ArrowUp') n = (i - 1 + count) % count;
    if (k === 'Home') n = 0;
    if (k === 'End') n = count - 1;
    if (n !== null) {
      e.preventDefault();
      select(n);
      refs.current[n]?.focus();
    }
  };
  return { refs, onKeyDown };
}

/* =========================================================
   Chat player (hero chat + agentic chat)
   ========================================================= */
// `inner` is created once per message: React re-assigns innerHTML whenever it gets a new
// { __html } object, which would replay the pop-in animation and wipe the Approve state.
interface ChatItem {
  id: number;
  kind: 'user' | 'ai' | 'typing' | 'card';
  inner: { __html: string };
}

const toItem = (m: DsMsg, id: number): ChatItem => {
  if (m.r === 'user') return { id, kind: 'user', inner: { __html: m.t } };
  if (m.r === 'ai') {
    return {
      id,
      kind: 'ai',
      inner: { __html: m.t + (m.src ? `<div class="src">${m.src.map((s) => `<span>${esc(s)}</span>`).join('')}</div>` : '') },
    };
  }
  return { id, kind: 'card', inner: { __html: m.html } };
};

function useChatPlayer(
  script: DsMsg[],
  reduce: boolean,
  { onStep, loop = true, gap = 4500 }: { onStep?: (s: number) => void; loop?: boolean; gap?: number } = {},
) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ChatItem[]>([]);
  const [visible, setVisible] = useState(false);
  const onStepRef = useRef(onStep);

  useEffect(() => {
    onStepRef.current = onStep;
  });

  // play only while the chat is on screen
  useEffect(() => {
    const el = bodyRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => setVisible(e.isIntersecting)), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduce) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise<boolean>((r) => setTimeout(() => r(!cancelled), ms));
    let n = 0;
    const run = async () => {
      for (;;) {
        setItems([]);
        onStepRef.current?.(-1);
        for (const m of script) {
          if (cancelled) return;
          if (m.r === 'user') {
            if (!(await wait(450))) return;
            const it = toItem(m, ++n);
            setItems((p) => [...p, it]);
          } else if (m.r === 'ai') {
            if (m.step !== undefined) onStepRef.current?.(m.step);
            const id = ++n;
            setItems((p) => [...p, { id, kind: 'typing', inner: { __html: '' } }]);
            if (!(await wait(m.delay || 900))) return;
            const it = toItem(m, id);
            setItems((p) => p.map((x) => (x.id === id ? it : x)));
          } else {
            if (m.step !== undefined) onStepRef.current?.(m.step);
            if (!(await wait(m.delay || 600))) return;
            const it = toItem(m, ++n);
            setItems((p) => [...p, it]);
          }
          if (!(await wait(m.pause || 600))) return;
        }
        onStepRef.current?.(99);
        if (!loop) return;
        if (!(await wait(gap))) return;
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [script, visible, reduce, loop, gap]);

  // with reduced motion the whole conversation is shown at once
  const reducedItems = useMemo(() => script.map((m, i) => toItem(m, i)), [script]);
  const shown = reduce ? reducedItems : items;

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [shown.length, reduce]);

  return { bodyRef, shown };
}

function ChatBody({
  id,
  bodyRef,
  shown,
  toast,
}: {
  id: string;
  bodyRef: React.RefObject<HTMLDivElement | null>;
  shown: ChatItem[];
  toast: ToastFn;
}) {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-act]');
    if (!b) return;
    const card = b.closest('.acard');
    if (b.dataset.act === 'approve' && card) {
      card.querySelectorAll('button').forEach((x) => {
        x.disabled = true;
      });
      const pill = card.querySelector('.pill');
      if (pill) {
        pill.textContent = 'Submitted';
        pill.classList.add('done');
      }
      toast('Application submitted (illustrative)');
    } else if (b.dataset.act === 'edit') {
      toast('Opens the tailored application (illustrative)');
    }
  };

  return (
    <div className="chat-body" id={id} ref={bodyRef} onClick={onClick}>
      {shown.map((it) => {
        if (it.kind === 'user') return <div key={it.id} className="msg user" dangerouslySetInnerHTML={it.inner} />;
        if (it.kind === 'typing') {
          return (
            <div key={it.id} className="msg ai">
              <span className="av"><Icon n="sparkles" /></span>
              <div className="bub"><span className="typing"><i></i><i></i><i></i></span></div>
            </div>
          );
        }
        if (it.kind === 'ai') {
          return (
            <div key={it.id} className="msg ai">
              <span className="av"><Icon n="sparkles" /></span>
              <div className="bub" dangerouslySetInnerHTML={it.inner} />
            </div>
          );
        }
        // card: its root (.acard) must stay a direct flex child of the chat body
        return <div key={it.id} style={{ display: 'contents' }} dangerouslySetInnerHTML={it.inner} />;
      })}
    </div>
  );
}

/* =========================================================
   Explore bar (sticky section links with scroll-spy)
   ========================================================= */
const EXPLORE_LINKS = [
  ['challenge', 'The problem'],
  ['journeys', 'How it works'],
  ['ecosystem', 'Ecosystem'],
  ['agentic', 'Agentic AI'],
  ['outcomes', 'Outcomes'],
];

function ExploreBar() {
  const [cur, setCur] = useState(-1);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const spy = () => {
      // the current section is the last one whose top has passed the middle of the screen
      // (a fixed 200px line left the bar blank while a section filled most of the view)
      const line = window.innerHeight * 0.5;
      let c = -1;
      EXPLORE_LINKS.forEach(([id], i) => {
        const s = document.getElementById(id);
        if (s && s.getBoundingClientRect().top <= line) c = i;
      });
      // at the very bottom the last link wins even if the final section is short
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) c = EXPLORE_LINKS.length - 1;
      setCur(c);
      const nav = navRef.current;
      const act = nav?.querySelectorAll('a')[c] as HTMLElement | undefined;
      if (nav && act && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: act.offsetLeft - 40, behavior: 'smooth' });
    };
    window.addEventListener('scroll', spy, { passive: true });
    spy();
    return () => window.removeEventListener('scroll', spy);
  }, []);

  return (
    <div className="explore-wrap">
      <div className="explore" id="explore">
        <b>Explore Dragon Suite</b>
        <nav aria-label="Page sections" ref={navRef}>
          {EXPLORE_LINKS.map(([id, label], i) => (
            <a key={id} href={`#${id}`} className={i === cur ? 'on' : undefined}>{label}</a>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* =========================================================
   Journeys + capabilities (one interactive block)
   Every tab is rendered in the same grid cell so the section is always as tall as the tallest tab.
   ========================================================= */
function MockStudent({ go }: { go: boolean }) {
  return (
    <div className={`mock on-tab${go ? ' go' : ''}`}>
      <div className="mock-bar"><i></i><i></i><i></i><span>dragon suite · my profile · sample data</span></div>
      <div className="mock-body">
        <div className="prof">
          <div className="av">AK</div>
          <div><b>Aarav K.</b><small>Verified profile · 3 credentials</small></div>
          <div className="ringbox">
            <svg viewBox="0 0 46 46" width="46" height="46"><circle className="ring-bg" cx="23" cy="23" r="19" /><circle className="ring-fg" cx="23" cy="23" r="19" /></svg>
            <b>92</b>
          </div>
        </div>
        <div className="cols">
          <div className="box">
            <h4><Icon n="shield-check" />Verified credentials</h4>
            <div className="cert"><Icon n="check" /><div>Cloud Practitioner<small>AWS</small></div></div>
            <div className="cert"><Icon n="check" /><div>Associate Cloud Engineer<small>Google Cloud</small></div></div>
            <div className="cert"><Icon n="check" /><div>Azure Fundamentals<small>Microsoft Learn</small></div></div>
          </div>
          <div className="box">
            <h4><Icon n="route" />6-month route · today</h4>
            <div className="task d"><span className="cb"><Icon n="check" /></span><span>Solve 3 graph problems</span></div>
            <div className="task d"><span className="cb"><Icon n="check" /></span><span>System check</span></div>
            <div className="task"><span className="cb"></span><span>Review Arena feedback</span></div>
            <div className="bar" style={{ marginTop: 8 }}><i style={{ '--w': '64%' } as CSSProperties}></i></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockInstitution({ go }: { go: boolean }) {
  return (
    <div className={`mock on-tab${go ? ' go' : ''}`}>
      <div className="mock-bar"><i></i><i></i><i></i><span>dragon suite · cohort view · sample data</span></div>
      <div className="mock-body">
        <div className="box">
          <table className="tbl">
            <thead><tr><th>Student</th><th>Dragon Score</th><th>Readiness</th><th>Risk</th></tr></thead>
            <tbody>
              <tr><td>Student A</td><td>88</td><td>Drive-ready</td><td><span className="ds-badge b-ok">On track</span></td></tr>
              <tr><td>Student B</td><td>74</td><td>Developing</td><td><span className="ds-badge b-warn">Watch</span></td></tr>
              <tr><td>Student C</td><td>52</td><td>Needs support</td><td><span className="ds-badge b-bad">At risk</span></td></tr>
            </tbody>
          </table>
        </div>
        <div className="cols">
          <div className="box">
            <h4><Icon n="bar" />Cohort skill gaps</h4>
            <div className="gap"><span>SQL</span><div className="bar"><i style={{ '--w': '72%' } as CSSProperties}></i></div><b>72</b></div>
            <div className="gap"><span>Aptitude</span><div className="bar"><i style={{ '--w': '58%' } as CSSProperties}></i></div><b>58</b></div>
            <div className="gap"><span>System design</span><div className="bar"><i style={{ '--w': '41%' } as CSSProperties}></i></div><b>41</b></div>
          </div>
          <div className="box">
            <h4><Icon n="sparkles" />Recommended</h4>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.45 }}>Targeted boot camp, plus Dragon Prep paths for flagged students.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockRecruiter({ go }: { go: boolean }) {
  return (
    <div className={`mock on-tab${go ? ' go' : ''}`}>
      <div className="mock-bar"><i></i><i></i><i></i><span>dragon suite · hiring pipeline · sample data</span></div>
      <div className="mock-body">
        <div className="nl"><Icon n="search" />“Backend engineer, cloud certified, open to relocation”</div>
        <div className="cols">
          <div className="box">
            <h4><Icon n="trophy" />Ranked scorecards</h4>
            <div className="rank f"><span className="no">1</span><div><b>Candidate A</b></div><span className="ds-badge b-ok">Strong Hire</span></div>
            <div className="rank"><span className="no">2</span><div><b>Candidate B</b></div><span className="ds-badge b-info">Hire</span></div>
            <div className="rank"><span className="no">3</span><div><b>Candidate C</b></div><span className="ds-badge b-bad">Below Threshold</span></div>
          </div>
          <div className="box">
            <h4><Icon n="users" />Live pipeline</h4>
            <div className="funnel">
              {[['100%', 'Sourced'], ['78%', 'Assessed'], ['52%', 'Shortlisted'], ['30%', 'Offer'], ['18%', 'Hired']].map(([w, l]) => (
                <div key={l} style={{ '--w': w } as CSSProperties}>{l}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MOCKS: Record<string, (p: { go: boolean }) => React.JSX.Element> = {
  mock0: MockStudent,
  mock1: MockInstitution,
  mock2: MockRecruiter,
};

function JourneysSection({ reduce }: { reduce: boolean }) {
  const [t, setT] = useState(0);
  const [step, setStep] = useState(0);
  const [go, setGo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const visibleRef = useRef(false);

  const select = (i: number) => {
    setT(i);
    setStep(0);
    setGo(false);
  };
  const { refs, onKeyDown } = useTabKeys(J.length, select);

  // mock-screen animations start after the tab has painted
  useEffect(() => {
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setGo(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [t]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { visibleRef.current = e.isIntersecting; }), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (reduce || !visibleRef.current) return;
      setStep((s) => (s + 1) % 5);
    }, 2000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="sec reveal" id="journeys" aria-labelledby="j-h" ref={sectionRef}>
      <div className="row-head">
        <div><div className="eyebrow">How it works</div><h2 id="j-h">Choose your role to see <em>how it fits.</em></h2></div>
        <div className="ptabs" role="tablist" aria-label="Pick your journey" id="jTabs">
          {['Companies & HR Teams', 'Placement Officers & Colleges', 'Students & Job Seekers'].map((label, i) => (
            <button
              key={label}
              className="ptab"
              role="tab"
              aria-selected={t === i}
              id={`jt${i}`}
              tabIndex={t === i ? 0 : -1}
              ref={(el) => { refs.current[i] = el; }}
              onClick={() => select(i)}
              onKeyDown={onKeyDown(i)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid' }}>
        {J.map((d, k) => {
          const Mock = MOCKS[d.mock as string];
          const active = t === k;
          return (
            <div
              key={d.title}
              className="jgrid"
              role="tabpanel"
              aria-live="polite"
              aria-hidden={!active}
              style={{ gridArea: '1 / 1', visibility: active ? 'visible' : 'hidden', pointerEvents: active ? 'auto' : 'none' }}
            >
              <div className="jleft">
                <h3>{d.title}</h3>
                <ol className="jstrip">
                  {d.steps.map((s, i) => (
                    <li key={s} className={i < step ? 'done' : i === step ? 'active' : undefined}>
                      <div className="n">{i + 1}</div>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                <div className="jmock">
                  <Mock go={active && go} />
                  <div className="joutcome"><small>Outcome</small><Icon n={d.outIcon} /><span>{d.outcome}</span></div>
                </div>
              </div>
              <div className="jcaps">
                <div className="hint"><Icon n="info" />Hover (or tap) an outcome for the details</div>
                {d.caps.map((c) => (
                  <div
                    key={c.h}
                    className="cap"
                    tabIndex={active ? 0 : -1}
                    data-follow="1"
                    data-name={c.h}
                    data-tip={c.w}
                    data-mods={c.m.join(' · ')}
                  >
                    <Icon n={c.i} />
                    <div className="cap-t">
                      <b>{c.h}</b>
                      <em>{c.r}</em>
                      <span className="sr">{c.w} Modules: {c.m.join(', ')}.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   Ecosystem (layers + flywheel)
   ========================================================= */
function EcosystemSection({ reduce }: { reduce: boolean }) {
  const [fwI, setFwI] = useState(0);
  const holdRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!reduce && !holdRef.current) setFwI((i) => (i + 1) % 6);
    }, 2200);
    return () => clearInterval(id);
  }, [reduce]);

  const cur = FW[fwI];
  const curName = cur.n || MODS[cur.id].n;

  return (
    <section className="sec reveal" id="ecosystem" aria-labelledby="e-h">
      <div className="row-head">
        <div><div className="eyebrow">The Dragon Suite ecosystem</div><h2 id="e-h">One platform. Every stage of the <em>talent cycle.</em></h2></div>
        <p>Each module feeds the next. Every assessment sharpens navigation. Every application sharpens matching. Every hire sharpens calibration.</p>
      </div>
      <div className="eco-grid">
        <div className="layers" id="layers" aria-label="Five platform layers. Hover or focus a module for details.">
          {LAYERS.map((L, n) => (
            <div className="layer" key={L.k}>
              <div className="layer-l" style={{ '--lc': L.c } as CSSProperties}><small>Layer {n + 1}</small><b>{L.k}</b></div>
              <div className="layer-r">
                {L.m.map((id) => {
                  const M = MODS[id];
                  const par = (M.n.match(/\(.*\)/) || [''])[0];
                  return (
                    <span
                      key={id}
                      className={`chip${cur.id === id ? ' hl' : ''}`}
                      tabIndex={0}
                      data-mod={id}
                      data-name={M.n}
                      data-tip={M.d}
                    >
                      <Icon n={M.i} />
                      {M.n.replace(/ \(.*\)/, '')}
                      {par && <span style={{ color: 'var(--muted)', fontWeight: 400 }}>{par}</span>}
                      <span className="sr">. {M.d}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <aside className="fw" aria-label="The Dragon Suite flywheel">
          <h3>The flywheel</h3>
          <svg className="wheel" viewBox="0 0 340 340" role="img" aria-label="Flywheel: Prep, Elite, Agent, Hire, Bridge, GPS, back to Prep">
            <circle className="ring-track" cx="170" cy="170" r="120" />
            <path id="orbit" className="ring-flow" d="M170 50 A120 120 0 0 1 170 290 A120 120 0 0 1 170 50" />
            <circle r="5.5" style={{ fill: 'var(--primary)' }}>
              <animateMotion dur="9s" repeatCount="indefinite"><mpath href="#orbit" /></animateMotion>
            </circle>
            <text className="fw-center" x="170" y="164">Talent</text>
            <text className="fw-center big" x="170" y="186">Flywheel</text>
            <g id="fwNodes">
              {FW.map((f, k) => {
                const a = (k * 60 * Math.PI) / 180;
                const x = 170 + 120 * Math.sin(a);
                const y = 170 - 120 * Math.cos(a);
                const ly = k === 0 ? -34 : 44;
                return (
                  <g
                    key={f.id}
                    className={`fwn${k === fwI ? ' on' : ''}`}
                    data-fw={k}
                    transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
                    tabIndex={0}
                    role="button"
                    aria-label={f.t}
                    data-name={f.n || MODS[f.id].n}
                    data-tip={f.d}
                    onMouseEnter={() => { holdRef.current = true; setFwI(k); }}
                    onMouseLeave={() => { holdRef.current = false; }}
                    onFocus={() => { holdRef.current = true; setFwI(k); }}
                    onBlur={() => { holdRef.current = false; }}
                    onClick={() => setFwI(k)}
                  >
                    <circle className="halo" r="26" />
                    <circle className="c" r="24" />
                    <use href={`#i-${f.i}`} x="-10" y="-10" width="20" height="20" />
                    <text y={ly}>{f.t}</text>
                  </g>
                );
              })}
            </g>
          </svg>
          <div className="fw-info" id="fwInfo" aria-live="polite">
            <b>{curName} → {FW[(fwI + 1) % 6].t}</b>
            <span>{cur.flow}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* =========================================================
   Agentic AI (role tabs + animated chat + 4-step loop)
   ========================================================= */
const LOOP_STEPS = [
  { n: 'eye', t: 'Understand' },
  { n: 'search', t: 'Identify' },
  { n: 'sparkles', t: 'Recommend' },
  { n: 'zap', t: 'Act' },
];

function AgenticSection({ reduce, toast }: { reduce: boolean; toast: ToastFn }) {
  const [k, setK] = useState(0);
  const [stepState, setStepState] = useState(-1);
  const R = ROLES[k];
  const { bodyRef, shown } = useChatPlayer(R.script, reduce, { onStep: setStepState, gap: 2000 });
  const s = reduce ? 99 : stepState;

  const select = (i: number) => {
    setK(i);
    setStepState(-1);
  };
  const { refs, onKeyDown } = useTabKeys(ROLES.length, select);

  return (
    <section className="agentic reveal" id="agentic" aria-labelledby="a-h">
      <div className="row-head">
        <div><div className="eyebrow"><Icon n="sparkles" />Agentic AI</div><h2 id="a-h">Ask once. <em>Dragon AI</em> gets it done.</h2></div>
        <p>Dragon AI knows each user’s profile, history and progress across the suite. It does not describe what could happen. It does it.</p>
      </div>

      <div className="rrow">
        <span className="rlabel" id="roleLabel">View as</span>
        <div className="rtabs" role="tablist" aria-labelledby="roleLabel" id="roleTabs" style={{ '--i': k } as CSSProperties}>
          {[['briefcase', 'Companies & HR Teams'], ['building', 'Placement Officers & Colleges'], ['cap', 'Students & Job Seekers']].map(([icon, label], i) => (
            <button
              key={label}
              className="rtab"
              role="tab"
              aria-selected={k === i}
              tabIndex={k === i ? 0 : -1}
              ref={(el) => { refs.current[i] = el; }}
              onClick={() => select(i)}
              onKeyDown={onKeyDown(i)}
            >
              <Icon n={icon} />{label}
            </button>
          ))}
        </div>
      </div>

      <div className="ag-grid">
        <div className="chatwin">
          <div className="chat-bar">
            <span className="dots"><i></i><i></i><i></i></span>
            <Icon n="sparkles" style={{ color: 'var(--crimson-600)', fontSize: 15 }} />
            <span id="agRoleLabel">{R.label}</span>
          </div>
          <ChatBody id="agChat" bodyRef={bodyRef} shown={shown} toast={toast} />
        </div>
        <div className="loop" id="loop">
          <div className="loop-h"><Icon n="sparkles" />The agentic loop</div>
          {LOOP_STEPS.map((ls, i) => (
            <div
              key={ls.t}
              className={`lstep${i === s || (s === 99 && i === 3) ? ' on' : ''}${(s === 99 ? i < 3 : i < s) ? ' past' : ''}`}
            >
              <div className="n"><Icon n={ls.n} /></div>
              <div><b>{ls.t}</b><p>{R.loop[i]}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="works">
        <b>Works where your teams already are:</b>
        <div className="chips">
          <span className="chip"><Icon n="link" />LinkedIn</span>
          <span className="chip"><Icon n="message" />Slack</span>
          <span className="chip"><Icon n="phone" />WhatsApp</span>
          <span className="chip"><Icon n="git" />GitHub</span>
          <span>and more, via Dragon Nexus</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Demo modal (prototype: nothing is sent anywhere unless DEMO_ENDPOINT / DEMO_EMAIL is set)
   ========================================================= */
function DemoDialog({ onClose }: { onClose: () => void }) {
  const nameRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const [badName, setBadName] = useState(false);
  const [badMail, setBadMail] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errShown, setErrShown] = useState(false);
  const [done, setDone] = useState<{ title: string; msg: string } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => nameRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const n = nameRef.current;
    const m = mailRef.current;
    if (!n || !m) return;
    const okN = n.value.trim().length > 1;
    const okM = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.value.trim());
    setBadName(!okN);
    setBadMail(!okM);
    setErrShown(false);
    if (!okN) return n.focus();
    if (!okM) return m.focus();
    const data = { name: n.value.trim(), email: m.value.trim(), role: roleRef.current?.value ?? '', page: location.href };
    const first = data.name.split(' ')[0];
    if (DEMO_ENDPOINT) {
      setBusy(true);
      try {
        const r = await fetch(DEMO_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error('HTTP ' + r.status);
        setDone({ title: 'Request received', msg: `Thanks, ${first}. We have your request and will be in touch to arrange the demo.` });
      } catch {
        setErrShown(true);
      }
      setBusy(false);
    } else if (DEMO_EMAIL) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nI am a: ${data.role}`;
      location.href = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent('Dragon Suite demo request')}&body=${encodeURIComponent(body)}`;
      setDone({ title: 'Almost there', msg: `Thanks, ${first}. Your email app should open with the request ready to send. Please press send to finish.` });
    } else {
      setDone({ title: 'Demo form not connected yet', msg: `Thanks, ${first}. This preview page does not send requests yet, so nothing was delivered.` });
    }
  };

  return (
    <div className="dialog">
      <button className="x" data-close aria-label="Close" onClick={onClose}><Icon n="x" /></button>
      {!done ? (
        <div id="mForm">
          <h3 id="m-h">Book a Dragon Suite demo</h3>
          <p>Tell us a little about yourself and we’ll set up a walkthrough.</p>
          <form noValidate id="demoForm" onSubmit={submit}>
            <div className={`field${badName ? ' bad' : ''}`}><label htmlFor="f-name">Full name</label><input id="f-name" required autoComplete="name" ref={nameRef} /><span className="err">Please enter your name.</span></div>
            <div className={`field${badMail ? ' bad' : ''}`}><label htmlFor="f-mail">Work email</label><input id="f-mail" type="email" required autoComplete="email" ref={mailRef} /><span className="err">Please enter a valid email address.</span></div>
            <div className="field"><label htmlFor="f-role">I am a</label>
              <select id="f-role" ref={roleRef}><option>Company / HR team</option><option>Placement officer / college</option><option>Student / job seeker</option></select></div>
            <button className="btn ds-btn-primary" type="submit" disabled={busy}><Icon n="send" />Request demo</button>
            <p className="err-banner" id="formErr" role="alert" hidden={!errShown}>Something went wrong. Please try again in a moment.</p>
            <p className="fine" id="formFine">{DEMO_ENDPOINT || DEMO_EMAIL ? 'We’ll only use your details to arrange the demo.' : 'Prototype only. This form does not send data.'}</p>
          </form>
        </div>
      ) : (
        <div className="done-state" id="mDone">
          <div className="tick"><Icon n="check" /></div>
          <h3 id="doneTitle">{done.title}</h3>
          <p id="doneMsg" style={{ marginTop: 6, color: 'var(--muted)', fontSize: 13 }}>{done.msg}</p>
          <button className="btn btn-outline" data-close style={{ marginTop: 18 }} onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  );
}

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const lastFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const f = [...modalRef.current.querySelectorAll<HTMLElement>('input,select,button:not([hidden])')].filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastFocus?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      className={`modal${open ? ' open' : ''}`}
      id="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="m-h"
      ref={modalRef}
      onClick={(e) => { if (e.target === modalRef.current) onClose(); }}
    >
      {open && <DemoDialog onClose={onClose} />}
    </div>
  );
}

/* =========================================================
   Page
   ========================================================= */
export default function DragonSuitePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [reduce] = useState(prefersReducedMotion);
  const [modalOpen, setModalOpen] = useState(false);
  // light / dark theme for the whole Dragon Suite page, remembered between visits
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem(THEME_KEY) === 'dark'; } catch { return false; }
  });
  const [toastState, setToastState] = useState({ msg: '', show: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const toast = useCallback<ToastFn>((msg) => {
    setToastState({ msg, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastState((s) => ({ ...s, show: false })), 2600);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const toggleTheme = useCallback(() => {
    setDark((d) => {
      const next = !d;
      try { localStorage.setItem(THEME_KEY, next ? 'dark' : 'light'); } catch { /* storage unavailable: the theme still switches */ }
      return next;
    });
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  // scroll-reveal + counting numbers
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reveals = [...root.querySelectorAll<HTMLElement>('.reveal')];
    const counters = [...root.querySelectorAll<HTMLElement>('[data-count]')];

    const revealIO = 'IntersectionObserver' in window
      ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO?.unobserve(e.target); } }), { threshold: 0.06, rootMargin: '0px 0px -30px 0px' })
      : null;
    reveals.forEach((el) => (revealIO ? revealIO.observe(el) : el.classList.add('in')));

    const runCount = (el: HTMLElement) => {
      const to = parseFloat(el.dataset.count || '0');
      const dec = +(el.dataset.decimals || 0);
      const suf = el.dataset.suffix || '';
      const fmt = (v: number) => (el.dataset.format === 'comma' ? Math.round(v).toLocaleString('en-US') : v.toFixed(dec)) + suf;
      if (reduce) { el.textContent = fmt(to); return; }
      const t0 = performance.now();
      const dur = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(to * e);
        if (p < 1) requestAnimationFrame(tick);
      };
      tick(t0);
    };
    const cntIO = 'IntersectionObserver' in window
      ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { runCount(e.target as HTMLElement); cntIO?.unobserve(e.target); } }), { threshold: 0.6 })
      : null;
    counters.forEach((el) => cntIO?.observe(el));

    return () => {
      revealIO?.disconnect();
      cntIO?.disconnect();
    };
  }, [reduce]);

  // dark hover tooltip for every [data-tip] element
  useEffect(() => {
    const root = rootRef.current;
    const tip = tipRef.current;
    if (!root || !tip) return;
    let tipEl: HTMLElement | null = null;
    const place = (el: HTMLElement, e?: globalThis.MouseEvent) => {
      const r = el.getBoundingClientRect();
      const t = tip.getBoundingClientRect();
      const cx = el.dataset.follow && e && e.clientX ? e.clientX : r.left + r.width / 2;
      const x = Math.max(10, Math.min(innerWidth - t.width - 10, cx - t.width / 2));
      let y = r.top - t.height - 12;
      if (y < 10) y = r.bottom + 12;
      // x/y are viewport px; the page is zoomed, so convert to the tooltip's own px
      const k = t.width / tip.offsetWidth || 1;
      tip.style.left = x / k + 'px';
      tip.style.top = y / k + 'px';
    };
    const show = (el: HTMLElement, e?: globalThis.MouseEvent) => {
      tipEl = el;
      tip.innerHTML = `${el.dataset.plain !== undefined ? '' : `<b>${esc(el.dataset.name || (el.textContent || '').trim())}</b>`}${esc(el.dataset.tip)}${el.dataset.mods ? `<span class="tm">Modules: ${esc(el.dataset.mods)}</span>` : ''}`;
      tip.classList.add('show');
      place(el, e);
    };
    const hide = () => { tipEl = null; tip.classList.remove('show'); };
    const over = (e: globalThis.MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!root.contains(t)) return hide();
      const el = t.closest<HTMLElement>('[data-tip]');
      if (!el) return hide();
      if (el !== tipEl) show(el, e);
    };
    const move = (e: globalThis.MouseEvent) => { if (tipEl && tipEl.dataset.follow) place(tipEl, e); };
    const focusin = (e: FocusEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-tip]');
      if (el && root.contains(el)) show(el);
    };
    document.addEventListener('mouseover', over);
    document.addEventListener('mousemove', move);
    document.addEventListener('focusin', focusin);
    document.addEventListener('focusout', hide);
    window.addEventListener('scroll', hide, { passive: true });
    return () => {
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('focusin', focusin);
      document.removeEventListener('focusout', hide);
      window.removeEventListener('scroll', hide);
    };
  }, []);

  // in-page anchors: smooth scroll without leaving the route
  const onRootClick = (e: MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')?.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="dragon-suite" data-theme={dark ? 'dark' : 'light'} ref={rootRef} onClick={onRootClick}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs dangerouslySetInnerHTML={SPRITE_HTML} />
      </svg>

      {/* =====================================================
           1. HERO
           ===================================================== */}
      <section className="hero reveal" id="top" aria-labelledby="hero-h">
        <div className="hero-grid">
          <div>
            <div className="eyebrow"><span className="mark"><Icon n="flame" /></span>Dragon Suite by SNS Square</div>
            <h1 id="hero-h">Don’t write a resume. <em>Prove it.</em></h1>
            <p className="lead">Dragon Suite is an agentic AI talent platform for companies and HR teams, placement officers and colleges, and the students and job seekers they work with. It takes talent from first practice question to verified hire, and acts at every step along the way.</p>
            <div className="hero-cta">
              <a className="btn btn-light" href="https://ds.1000dragons.ai" target="_blank" rel="noopener noreferrer">Try Dragon Suite<Icon n="arrow-up-right" /></a>
              <a className="btn btn-ghost" href="https://www.1000dragons.ai/">Visit Website<Icon n="arrow-right" /></a>
              <a className="btn btn-ghost" href={deckUrl} target="_blank" rel="noopener noreferrer">View Deck<Icon n="arrow-up-right" /></a>
            </div>
          </div>

          <HeroFlow reduce={reduce} dark={dark} onToggleTheme={toggleTheme} />
        </div>

        <div className="hero-foot">
          <div className="diffs">
            <div className="diff" tabIndex={0} data-plain data-tip="Credentials pulled from issuing platforms. Scores earned under proctored conditions."><Icon n="shield-check" /><b>Verified, not self-reported.</b><span className="sr">Credentials pulled from issuing platforms. Scores earned under proctored conditions.</span></div>
            <div className="diff" tabIndex={0} data-plain data-tip="Career routes, practice and assessments reshape themselves around each person."><Icon n="route" /><b>Adaptive, not static.</b><span className="sr">Career routes, practice and assessments reshape themselves around each person.</span></div>
            <div className="diff" tabIndex={0} data-plain data-tip="Dragon AI generates tests, screens pipelines, schedules drives and files applications."><Icon n="zap" /><b>Acting, not advising.</b><span className="sr">Dragon AI generates tests, screens pipelines, schedules drives and files applications.</span></div>
          </div>
          <div className="proof" role="list">
            <div role="listitem"><strong data-count="20">20</strong><span>modules</span></div>
            <div role="listitem"><strong data-count="9">9</strong><span>assessment formats</span></div>
            <div role="listitem"><strong data-count="43" data-suffix="+">43+</strong><span>domains</span></div>
            <div role="listitem"><strong data-count="7" data-suffix="-layer">7-layer</strong><span>proctoring</span></div>
            <div role="listitem"><strong data-count="10">10</strong><span>exam streams</span></div>
          </div>
        </div>
      </section>

      <ExploreBar />

      {/* =====================================================
           2. CHALLENGE
           ===================================================== */}
      <section className="sec reveal" id="challenge" aria-labelledby="ch-h">
        <div className="ch-grid">
          <div className="ch-l">
            <div className="eyebrow">The ecosystem challenge</div>
            <h2 id="ch-h">Talent runs on tools that <em>never talk to each other.</em></h2>
            <p>Everyone is working hard. Nobody is working from the same facts.</p>
            <div className="breaks">
              <div className="brk-row"><Icon n="briefcase" /><b>Companies &amp; HR teams</b><p>Assessment questions leak. Generic tests ignore company context. Screening eats weeks.</p></div>
              <div className="brk-row"><Icon n="building" /><b>Placement officers &amp; colleges</b><p>Struggling students surface too late. Batch performance is hard to read before a campus drive.</p></div>
              <div className="brk-row"><Icon n="cap" /><b>Students &amp; job seekers</b><p>Skills are claimed on a resume, not proven. Career data is scattered across dozens of platforms. Preparation has no clear direction.</p></div>
            </div>
            <div className="callout"><Icon n="alert" /><span>Three audiences. One shared problem: <b>no trusted signal.</b></span></div>
          </div>

          <div className="fracture" aria-label="Illustration: disconnected tools">
            <svg className="links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className="l" d="M16 24 L42 44" /><path className="l" d="M82 20 L58 44" /><path className="l" d="M18 78 L42 57" /><path className="l" d="M80 76 L58 57" />
              <path className="l x" d="M16 24 L82 20" /><path className="l x" d="M18 78 L80 76" /><path className="l x" d="M16 24 L18 78" /><path className="l x" d="M82 20 L80 76" />
            </svg>
            <div className="brk" style={{ left: '29%', top: '34%' }}><Icon n="x" /></div>
            <div className="brk" style={{ left: '70%', top: '32%', animationDelay: '-.6s' }}><Icon n="x" /></div>
            <div className="brk" style={{ left: '30%', top: '67%', animationDelay: '-1.2s' }}><Icon n="x" /></div>
            <div className="brk" style={{ left: '69%', top: '66%', animationDelay: '-1.8s' }}><Icon n="x" /></div>
            <div className="hole"><div><Icon n="help" />No trusted signal</div></div>
            <div className="tool" style={{ left: '15%', top: '22%', '--rot': '-6deg' } as CSSProperties}><div className="tile"><Icon n="file-text" /></div><span>Resume</span></div>
            <div className="tool" style={{ left: '83%', top: '19%', '--rot': '5deg', '--dl': '-1.5s' } as CSSProperties}><div className="tile"><Icon n="monitor" /></div><span>Test portal</span></div>
            <div className="tool" style={{ left: '17%', top: '80%', '--rot': '4deg', '--dl': '-3s' } as CSSProperties}><div className="tile"><Icon n="briefcase" /></div><span>Job board</span></div>
            <div className="tool" style={{ left: '82%', top: '79%', '--rot': '-5deg', '--dl': '-4.5s' } as CSSProperties}><div className="tile"><Icon n="table" /></div><span>Spreadsheet</span></div>
          </div>
        </div>
      </section>

      {/* =====================================================
           3. JOURNEYS + CAPABILITIES (one interactive block)
           ===================================================== */}
      <JourneysSection reduce={reduce} />

      {/* =====================================================
           4. ECOSYSTEM
           ===================================================== */}
      <EcosystemSection reduce={reduce} />

      {/* =====================================================
           5. AGENTIC AI
           ===================================================== */}
      <AgenticSection reduce={reduce} toast={toast} />

      {/* =====================================================
           6. BUSINESS OUTCOME
           ===================================================== */}
      <section className="sec outcome-sec reveal" id="outcomes" aria-labelledby="o-h">
        <div className="row-head">
          <div><div className="eyebrow">Business outcome</div><h2 id="o-h">When every party trusts the data, <em>everything moves faster.</em></h2></div>
        </div>
        <div className="cols3">
          <article className="ocol"><div className="hd"><Icon n="briefcase" />Companies &amp; HR Teams</div>
            <ul><li><Icon n="check" />Hire from verified, explained shortlists</li><li><Icon n="check" />Run assessments that cannot leak</li><li><Icon n="check" />Plan hiring around market data</li></ul></article>
          <article className="ocol"><div className="hd"><Icon n="building" />Placement Officers &amp; Colleges</div>
            <ul><li><Icon n="check" />Act on batch data before drives</li><li><Icon n="check" />Close skill gaps with targeted practice</li><li><Icon n="check" />Report placement outcomes with confidence</li></ul></article>
          <article className="ocol"><div className="hd"><Icon n="cap" />Students &amp; Job Seekers</div>
            <ul><li><Icon n="check" />Prove skills instead of claiming them</li><li><Icon n="check" />Follow a route that adapts</li><li><Icon n="check" />Reach roles that fit</li></ul></article>
        </div>
        <svg className="converge" viewBox="0 0 900 26" preserveAspectRatio="none" aria-hidden="true"><path d="M150 0 C150 16 450 8 450 26" /><path d="M450 0 L450 26" /><path d="M750 0 C750 16 450 8 450 26" /></svg>
        <div className="obar">
          <div><small><Icon n="bar" />Talent Intelligence Dashboard</small><p>One verified profile now serves the learner, the college and the employer.</p></div>
          <div className="ind">
            <div><strong data-count="47832" data-format="comma">47,832</strong><span>verified professionals</span></div>
            <div><strong data-count="87.3" data-decimals="1" data-suffix="%">87.3%</strong><span>average match score</span></div>
            <div><strong data-count="11" data-suffix="-day">11-day</strong><span>average time-to-hire</span></div>
          </div>
        </div>
      </section>

      {/* =====================================================
           7. CLOSING CTA (separate section)
           ===================================================== */}
      <section className="sec sec--red cta-sec reveal" id="cta" aria-labelledby="cta-h">
        <div className="eyebrow">See the bigger picture</div>
        <h2 id="cta-h">See Dragon Suite in <em>action.</em></h2>
        <p>Book a demo to see it live. Colleges can plan their next placement season. Companies can run their first assessment campaign.</p>
        <div className="cta-btns">
          <button className="btn ds-btn-primary" data-demo onClick={() => setModalOpen(true)}>Book a demo<Icon n="arrow-up-right" /></button>
        </div>
        <a className="back-link" href="#top">Back to overview<Icon n="arrow-up" /></a>
      </section>

      {/* Demo dialog, tooltip and toast are fixed-position overlays. They are rendered into <body> (inside a
          .dragon-suite wrapper so the styles and theme still apply) so they sit above the hub's sidebar and top bar
          and are centred on the whole window instead of being clipped under the hub chrome. */}
      {createPortal(
        <div className="dragon-suite ds-portal" data-theme={dark ? 'dark' : 'light'}>
          {/* DEMO MODAL (prototype: nothing is sent anywhere) */}
          <DemoModal open={modalOpen} onClose={closeModal} />

          <div className="tip" id="tip" role="tooltip" ref={tipRef}></div>
          <div className={`toast${toastState.show ? ' show' : ''}`} id="toast" role="status"><Icon n="check" /><span>{toastState.msg}</span></div>
        </div>,
        document.body,
      )}
    </div>
  );
}

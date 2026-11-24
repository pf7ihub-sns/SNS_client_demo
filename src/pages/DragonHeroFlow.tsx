import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';

/* =========================================================
   Hero: the Dragon Suite sign-in / sign-up journey, played as a looping
   "screen recording" for the three signup roles (ported from the
   Dragon Suite frontend reference).
   React renders the frame; the effect below drives the screens imperatively,
   exactly like the reference, so typing / cursor timing stays identical.
   ========================================================= */

const ic = (n: string, c = '') => `<svg class="ic ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

interface FlowRole {
  k: string;
  s: string;
  i: string;
  em: string;
  fn: string;
  ln: string;
  lab: string;
  mask: string;
}

const ROLES: FlowRole[] = [
  { k: 'Job Seeker', s: 'Find your next role with AI-powered matching', i: 'users', fn: 'Alex', ln: 'Johnson', em: 'alex.johnson@snsgroups.com', lab: 'Email address', mask: 'ale*********@snsgroups.com' },
  { k: 'HR / Recruiter', s: 'Source verified talent at enterprise scale', i: 'briefcase', fn: 'Alex', ln: 'Johnson', em: 'alex.johnson@snsgroups.com', lab: 'Work email', mask: 'ale*********@snsgroups.com' },
  { k: 'Placement Officer', s: 'Manage campus placements & batch analytics', i: 'cap', fn: 'Alex', ln: 'Johnson', em: 'alex.johnson@snsgroups.com', lab: 'College email', mask: 'ale*********@snsgroups.com' },
];

const VER = [
  { t: 'Verify your credentials', s: 'Each certificate is checked against its issuer', rows: ['Name on the certificate matches your account name', 'Credential confirmed on the issuer’s verification page', 'Issue date matches the verification page', 'Resume details are suggestions you confirm'], done: 'Verified · trust-scored profile' },
  { t: 'Verify your company', s: 'Our team checks your company is registered', rows: ['Work email is on a company domain, not Gmail, Yahoo or Outlook', 'GST registration certificate uploaded (PDF or image, max 5 MB)', 'Company details reviewed by the Dragon Suite team', 'An email tells you: approved, or changes requested'], done: 'Approved · full access to Dragon Hire' },
  { t: 'Verify your institution', s: 'Used by our team to verify your college is recognised', rows: ['College email is on an institutional domain', 'AICTE code and AISHE registry details checked', 'Affiliating university and documents reviewed', '“Welcome onboard” email once approved'], done: 'Approved · manage students and placements' },
];

const TAGS: [string, string, string][][] = [
  [['shield-check', 'Trust Score 92', 'Proctored · verified'], ['award', 'Dragon Score 86', 'Elite eligible (85+)']],
  [['trophy', 'Strong Hire', 'Ranked scorecard'], ['users', 'Live pipeline', 'Sourced to hired']],
  [['alert', 'At-risk flags', 'Ahead of the drive'], ['calendar', 'Drive scheduled', 'Eligible students counted']],
];

const DASH: (() => string)[] = [
  () => `<div class="fl-dh"><span class="fl-av">AJ</span><div><b>Hi, Alex</b><small>Verified profile · 3 credentials</small></div><span class="fl-b r">Elite eligible (85+)</span></div>
    <div class="fl-cols"><div class="fl-card fl-score"><div class="fl-ring"><svg viewBox="0 0 70 70" width="70" height="70"><circle class="bg" cx="35" cy="35" r="26"/><circle class="fg" cx="35" cy="35" r="26"/></svg><b>86</b></div>Dragon Score</div>
    <div class="fl-card"><h5>6-month route · today</h5>
      <div class="fl-task d"><span class="cb">${ic('check')}</span><span>Solve 3 graph problems</span></div>
      <div class="fl-task d"><span class="cb">${ic('check')}</span><span>System check</span></div>
      <div class="fl-task"><span class="cb"></span><span>Review Arena feedback</span></div>
      <div class="fl-bar"><i style="--w:64%"></i></div></div></div>`,
  () => `<div class="fl-dh"><span class="fl-av">AJ</span><div><b>Hi, Alex</b><small>Recruiter · SNS Solutions</small></div><span class="fl-b r">3 active pipelines</span></div>
    <div class="fl-rows">
      <div class="fl-row"><span class="no">1</span><span>Candidate A</span><span class="sc">94</span><span class="fl-b r">Strong Hire</span></div>
      <div class="fl-row"><span class="no">2</span><span>Candidate B</span><span class="sc">81</span><span class="fl-b">Hire</span></div>
      <div class="fl-row"><span class="no">3</span><span>Candidate C</span><span class="sc">49</span><span class="fl-b a">Below Threshold</span></div></div>
    <div class="fl-stg"><span class="fl-b r">Sourced</span><span class="fl-b r">Assessed</span><span class="fl-b r">Shortlisted</span><span class="fl-b">Offer</span><span class="fl-b">Hired</span></div>`,
  () => `<div class="fl-dh"><span class="fl-av">AJ</span><div><b>Hi, Alex</b><small>Placement Officer · SNS Tech</small></div><span class="fl-b r">Drive in 3 weeks</span></div>
    <div class="fl-tiles"><div class="fl-tile"><b>74%</b><small>Readiness</small></div><div class="fl-tile"><b>3</b><small>At-risk flagged</small></div><div class="fl-tile"><b>2</b><small>Drives booked</small></div></div>
    <div class="fl-rows">
      <div class="fl-row"><span class="no">A</span><span>Student A</span><span class="sc">88</span><span class="fl-b">On track</span></div>
      <div class="fl-row"><span class="no">B</span><span>Student B</span><span class="sc">74</span><span class="fl-b a">Watch</span></div>
      <div class="fl-row"><span class="no">C</span><span>Student C</span><span class="sc">52</span><span class="fl-b r">At risk</span></div></div>`,
];

const NAMES = ['Sign in', 'Choose role', 'Create account', 'Verify email', 'Verification', 'Dashboard'];
const DUR = [3700, 3300, 5600, 3900, 5800, 5000];
const STAGE_H = [265, 260, 275, 195, 235, 230];
const LAST = NAMES.length - 1;

const G = '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>';
const MS = '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="9.5" height="9.5" fill="#f25022"/><rect x="12.5" y="2" width="9.5" height="9.5" fill="#7fba00"/><rect x="2" y="12.5" width="9.5" height="9.5" fill="#00a4ef"/><rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#ffb900"/></svg>';
const BACK = '<button type="button" class="fa-back-link"><svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Back</button>';

const hdr = (t: string, sub: string, compact = false) =>
  `<div class="fa-h">${compact ? '' : `<span class="fa-logo">${ic('flame')}</span><span class="fa-brand">Dragon Suite</span>`}<h4>${t}</h4><p>${sub}</p></div><div class="fa-div"></div>`;

interface FlowControls {
  setPaused: (p: boolean) => void;
  seek: (step: number) => void;
}

export function HeroFlow({ reduce, dark, onToggleTheme }: { reduce: boolean; dark: boolean; onToggleTheme: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ctrlRef = useRef<FlowControls | null>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [stepLabel, setStepLabel] = useState(`Step 1 of ${NAMES.length} · ${NAMES[0]}`);
  const [progress, setProgress] = useState(100 / NAMES.length);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = root) => scope.querySelector<T>(sel);
    const $$ = (sel: string, scope: ParentNode = root) => Array.from(scope.querySelectorAll<HTMLElement>(sel));

    const flow = $('.authwin');
    const canvas = $('.screen-canvas');
    const cursor = $('.screen-cursor');
    const stage = $('.fa-stage');
    const tagEls = [$('.float-tag.t1'), $('.float-tag.t2')];
    const screens = [0, 1, 2, 3, 4, 5].map((i) => $(`.fa-s[data-s="${i}"]`));
    if (!flow || !canvas || !cursor || !stage || screens.some((s) => !s)) return;
    const S = screens as HTMLElement[];

    let role = 0;
    let step = 0;
    let tok = 0;
    let visible = false;
    let off = false;
    const frozen = () => reduce;
    const wait = (ms: number, my: number) => new Promise<boolean>((res) => setTimeout(() => res(!off && my === tok && !pausedRef.current), ms));

    const setTags = (on: boolean) =>
      tagEls.forEach((el, n) => {
        if (!el) return;
        const t = TAGS[role][n];
        el.innerHTML = `${ic(t[0])}<div>${t[1]}<small>${t[2]}</small></div>`;
        el.classList.toggle('hide', !on);
      });

    const moveCursor = (target: Element | null, click = false) => {
      if (!target || frozen()) return;
      const c = canvas.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      // rects are in viewport px; the cursor's translate is in the page's (zoomed) px
      const k = c.width / canvas.offsetWidth || 1;
      const x = Math.round((t.left + t.width / 2 - c.left) / k);
      const y = Math.round((t.top + t.height / 2 - c.top) / k);
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      cursor.style.opacity = '1';
      if (click) {
        setTimeout(() => {
          cursor.classList.add('clicking');
          setTimeout(() => cursor.classList.remove('clicking'), 400);
        }, 320);
      }
    };

    const markSteps = (s: number) => {
      step = s;
      setStepLabel(`Step ${s + 1} of ${NAMES.length} · ${NAMES[s]}`);
      setProgress(((s + 1) / NAMES.length) * 100);
      S.forEach((el, i) => el.classList.toggle('on', i === s));
      stage.style.height = `${STAGE_H[s] || 260}px`;
      setTags(false);
    };

    const type = async (el: HTMLElement, text: string, my: number, ms: number) => {
      el.textContent = '';
      for (const ch of text) {
        el.textContent += ch;
        if (!(await wait(ms, my))) return false;
      }
      return true;
    };

    const selectRole = (i: number) =>
      $$('.fa-role', S[1]).forEach((b, k) => {
        b.classList.toggle('sel', k === i);
        b.setAttribute('aria-pressed', String(k === i));
      });

    S[0].innerHTML =
      hdr('Welcome back', 'Sign in to your Dragon Suite account') +
      `<div class="fa-f"><label>Email address</label><div class="fa-in">${ic('mail')}<span class="faEmail"></span><i class="caret"></i></div></div>
      <div class="fa-f"><div class="fa-lr"><label>Password</label><a>Forgot password?</a></div><div class="fa-in">${ic('lock')}<span class="faPass"></span>${ic('eye', 'r')}</div></div>
      <div class="fa-btn faSignBtn">Sign In</div><div class="fa-or"><span>OR</span></div>
      <div class="fa-soc"><span>${G}Google</span><span>${MS}Microsoft</span></div>
      <div class="fa-alt">Don’t have an account? <b>Create one</b></div>`;
    S[1].innerHTML =
      hdr('Join Dragon Suite', 'Choose your role to get started') +
      `<div class="fa-q">I am joining Dragon Suite as a…</div>
      <div class="fa-roles">${ROLES.map((r, i) => `<button type="button" class="fa-role" data-i="${i}" aria-pressed="false"><span class="ri">${ic(r.i)}</span><span><b>${r.k}</b><small>${r.s}</small></span><span class="rd"></span></button>`).join('')}</div>
      <div class="fa-btn dim faCont">Continue</div>
      <div class="fa-alt">Already have an account? <b>Sign in</b></div>`;

    async function enter(s: number, my: number, instant: boolean): Promise<void> {
      markSteps(s);
      const R = ROLES[role];
      if (s === 0) {
        const em = $('.faEmail', S[0]) as HTMLElement;
        const pw = $('.faPass', S[0]) as HTMLElement;
        const targetEmail = 'alex.johnson@snsgroups.com';
        if (instant) { em.textContent = targetEmail; pw.textContent = '••••••••••'; return; }
        em.textContent = ''; pw.textContent = '';
        moveCursor(em);
        if (!(await wait(350, my))) return;
        if (!(await type(em, targetEmail, my, 38))) return;
        moveCursor(pw);
        if (!(await wait(180, my))) return;
        await type(pw, '••••••••••', my, 52);
        moveCursor($('.faSignBtn', S[0]), true);
      } else if (s === 1) {
        const cont = $('.faCont', S[1]) as HTMLElement;
        selectRole(-1);
        cont.classList.add('dim');
        if (instant) { selectRole(role); cont.classList.remove('dim'); return; }
        moveCursor($$('.fa-role', S[1])[role], true);
        if (await wait(750, my)) { selectRole(role); cont.classList.remove('dim'); moveCursor(cont, true); }
      } else if (s === 2) {
        S[2].innerHTML = `
          <div class="fa-top-nav">${BACK}<span class="fa-role-badge">${ic(R.i)} ${R.k.toUpperCase()}</span></div>
          <div class="fa-two fa-f">
            <div><label>First name <span class="req">*</span></label><div class="fa-in">${R.fn}</div></div>
            <div><label>Last name <span class="req">*</span></label><div class="fa-in">${R.ln}</div></div>
          </div>
          <div class="fa-f"><label>${R.lab} <span class="req">*</span></label><div class="fa-in">${ic('mail')}<span class="faEm2"></span><i class="caret"></i></div></div>
          <div class="fa-f"><label>Password <span class="req">*</span></label><div class="fa-in">${ic('lock')}<span class="faPw2"></span>${ic('eye', 'r')}</div></div>
          <div class="fa-f"><label>Confirm password <span class="req">*</span></label><div class="fa-in">${ic('check')}<span class="faPwc2"></span>${ic('eye', 'r')}</div></div>
          <div class="fa-terms"><span class="fa-chk ok">${ic('check')}</span><span>I agree to Dragon Suite's <span class="fa-red-txt">Terms of Service</span> and <span class="fa-red-txt">Privacy Policy</span></span></div>
          <div class="fa-btn dim faCreate">Create Account</div>`;
        const em = $('.faEm2', S[2]) as HTMLElement;
        const pw = $('.faPw2', S[2]) as HTMLElement;
        const pwc = $('.faPwc2', S[2]) as HTMLElement;
        const btn = $('.faCreate', S[2]) as HTMLElement;
        if (instant) {
          em.textContent = R.em; pw.textContent = '••••••••••'; pwc.textContent = '••••••••••';
          btn.classList.remove('dim');
          return;
        }
        moveCursor(em);
        if (!(await wait(380, my))) return;
        if (!(await type(em, R.em, my, 40))) return;
        moveCursor(pw);
        if (!(await wait(200, my))) return;
        pw.textContent = '••••••••••';
        moveCursor(pwc);
        if (!(await wait(200, my))) return;
        pwc.textContent = '••••••••••';
        btn.classList.remove('dim');
        moveCursor(btn, true);
      } else if (s === 3) {
        S[3].innerHTML = `
          <div class="fa-top-nav">${BACK}</div>
          <div class="fa-h">
            <span class="fa-logo mail-logo">${ic('mail')}</span>
            <h4>Check your inbox</h4>
            <p>We sent a 6-digit code to <b>${R.mask}</b>. The code expires in 10 minutes.</p>
          </div>
          <div class="fa-otp">${'<span></span>'.repeat(6)}</div>
          <div class="fa-btn dim faVer">Verify Email</div>
          <div class="fa-alt">Didn’t receive the code? <b>Resend in 59s</b></div>`;
        const boxes = $$('.fa-otp span', S[3]);
        const digits = ['4', '8', '2', '9', '1', '7'];
        const btn = $('.faVer', S[3]) as HTMLElement;
        if (instant) { boxes.forEach((b, i) => { b.textContent = digits[i]; b.classList.add('f'); }); btn.classList.remove('dim'); return; }
        moveCursor(boxes[0]);
        for (let i = 0; i < 6; i++) {
          if (!(await wait(320, my))) return;
          boxes[i].textContent = digits[i];
          boxes[i].classList.add('f');
        }
        if (!(await wait(220, my))) return;
        btn.classList.remove('dim');
        moveCursor(btn, true);
        if (await wait(500, my)) { btn.classList.add('done'); btn.textContent = 'Email verified'; }
      } else if (s === 4) {
        const V = VER[role];
        S[4].innerHTML =
          `<div class="fa-top-nav">${BACK}</div>` +
          hdr(V.t, V.s, true) +
          V.rows.map((r) => `<div class="fa-vr"><span class="vi">${ic('check')}</span><span>${r}</span></div>`).join('') +
          `<div class="fa-res">${ic('shield-check')}${V.done}</div>`;
        const rows = $$('.fa-vr', S[4]);
        const res = $('.fa-res', S[4]) as HTMLElement;
        if (instant) { rows.forEach((r) => r.classList.add('ok')); res.classList.add('on'); return; }
        for (let i = 0; i < rows.length; i++) {
          moveCursor(rows[i]);
          if (!(await wait(180, my))) return;
          rows[i].classList.add('ok');
        }
        res.classList.add('on');
        moveCursor(res, true);
      } else {
        S[5].innerHTML = DASH[role]();
        if (instant) { setTags(true); return; }
        if (await wait(800, my)) setTags(true);
      }
    }

    async function run(from: number, my: number): Promise<void> {
      for (let s = from; s < NAMES.length; s++) {
        void enter(s, my, false);
        if (!(await wait(DUR[s], my))) return;
      }
      role = (role + 1) % ROLES.length;
      void run(0, ++tok);
    }

    // jump to a step: static when motion is reduced, otherwise play on from there
    const start = (from = 0) => {
      const my = ++tok;
      if (frozen()) { void enter(from, my, true); return; }
      void run(from, my);
    };

    const pick = (i: number) => {
      role = i;
      const my = ++tok;
      markSteps(1);
      selectRole(i);
      $('.faCont', S[1])?.classList.remove('dim');
      if (frozen()) { void enter(2, my, true); return; }
      void wait(750, my).then((ok) => { if (ok) void run(2, my); });
    };

    const onRoleClick = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>('.fa-role');
      if (b) pick(Number(b.dataset.i));
    };
    S[1].addEventListener('click', onRoleClick);

    ctrlRef.current = {
      setPaused(p) {
        if (p) tok++;
        else if (visible && !frozen()) void run(step, ++tok);
      },
      seek(s) {
        if (pausedRef.current) { const my = ++tok; void enter(s, my, true); return; }
        start(s);
      },
    };

    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (es) =>
              es.forEach((e) => {
                visible = e.isIntersecting;
                if (visible) {
                  if (frozen()) void enter(LAST, ++tok, true);
                  else if (!pausedRef.current) void run(0, ++tok);
                } else {
                  tok++;
                }
              }),
            { threshold: 0.25 },
          )
        : null;
    if (io) io.observe(flow);
    else void enter(LAST, ++tok, true);

    return () => {
      off = true;
      tok++;
      io?.disconnect();
      S[1].removeEventListener('click', onRoleClick);
      ctrlRef.current = null;
    };
  }, [reduce]);

  const togglePlay = () => {
    if (reduce) return;
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    ctrlRef.current?.setPaused(next);
  };

  const seek = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    ctrlRef.current?.seek(Math.min(LAST, Math.floor(pct * NAMES.length)));
  };

  return (
    <div className="screen-recording-deck" ref={rootRef} aria-label="Dragon Suite login flow screen recording">
      <div className="screen-device">
        {/* Top bar: window controls, address bar & dark-mode pill */}
        <div className="screen-topbar">
          <div className="win-dots" aria-hidden="true">
            <span className="w-dot w-close" title="Close"></span>
            <span className="w-dot w-min" title="Minimize"></span>
            <span className="w-dot w-max" title="Maximize"></span>
          </div>
          <div className="win-address" title="Secure Dragon Suite Portal">
            <svg className="win-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            <span>ds.1000dragons.ai</span>
          </div>
          <button
            type="button"
            className="screen-dark-toggle"
            aria-pressed={dark}
            aria-label={dark ? 'Switch Dragon Suite to light mode' : 'Switch Dragon Suite to dark mode'}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
          >
            {dark ? (
              <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
            ) : (
              <svg className="ic" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
            <span>{dark ? 'LIGHT MODE' : 'DARK MODE'}</span>
          </button>
        </div>

        {/* Screen canvas: dark grid, ambient red glow, margin around the card */}
        <div className="screen-canvas">
          <div className="float-tag t1 hide"></div>
          <div className="float-tag t2 hide"></div>

          {/* simulated mouse pointer */}
          <div className="screen-cursor" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M3 3L10.07 20.97L12.58 13.58L19.97 11.07L3 3Z" fill="#ffffff" stroke="#08090f" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            <span className="cursor-ripple"></span>
          </div>

          <div className="authwin" aria-label="Illustrative Dragon Suite flow: sign in, choose a role, create an account, verify your email, get verified and open your dashboard">
            <div className="fa-stage">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div className="fa-s" data-s={i} key={i}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Video player bottom scrub bar */}
        <div className="screen-video-bar">
          <button type="button" className="video-play-toggle" aria-label={paused ? 'Resume recording' : 'Pause recording'} aria-pressed={paused} disabled={reduce} onClick={togglePlay}>
            <svg className="ic" viewBox="0 0 24 24">
              {paused || reduce ? (
                <polygon points="6 4 18 12 6 20 6 4" fill="currentColor" />
              ) : (
                <>
                  <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                  <rect x="14" y="4" width="4" height="16" fill="currentColor" />
                </>
              )}
            </svg>
          </button>
          <div className="video-scrubber-track" title="Video Progress" onClick={seek}>
            <div className="video-scrubber-progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="video-step-pill">{stepLabel}</div>
        </div>
      </div>
    </div>
  );
}

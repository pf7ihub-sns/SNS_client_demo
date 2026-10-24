import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  FileCheck2,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";
import { okrion } from "../data/okrion";
import {
  workflow,
  roleDetails,
  capabilities,
  aiWorkflow,
} from "../data/okrionExperience";
import "./pages.css";
import "./OkrionPage.css";

const capabilityIcons = [
  Target,
  FileCheck2,
  UsersRound,
  ShieldCheck,
  Layers3,
  BookOpen,
];

export default function OkrionPage() {
  const [selectedRole, setSelectedRole] = useState(0);
  const role = okrion.roles[selectedRole];
  const detail = roleDetails[role.id];

  return (
    <div className="product-showcase-page okr-story">
      <section className="showcase-hero" aria-labelledby="okr-title">
        <div className="showcase-hero-content">
          <div className="showcase-category">
            PRODUCTS / ACADEMIC GOAL MANAGEMENT
          </div>
          <h1 id="okr-title" className="showcase-title okr-solution-title">
            <img
              src="/images/okrion/okrionlogo.svg"
              alt="OKRion"
              width="198"
              height="57"
            />
          </h1>
          <h2 className="okr-hero-tagline">
            Less disconnected work. More forward movement.
          </h2>
          <p className="showcase-short-desc">{okrion.description}</p>
          <div className="detail-actions-row">
            <a
              href={okrion.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-action"
            >
              Visit Website <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a className="btn-secondary-action" href="#okr-workflow">
              View Workflow
            </a>
          </div>
        </div>
        <div className="showcase-hero-visual">
          <img
            src="/images/okrion/placeholder.svg"
            alt="OKRion academic goals and progress overview"
            className="hero-product-image okr-hero-preview"
          />
        </div>
      </section>
      <nav className="okr-section-nav" aria-label="Explore OKRion">
        <span>Explore OKRion</span>
        <a href="#okr-workflow">Workflow</a>
        <a href="#okr-overview">The experience</a>
        <a href="#okr-roles">Who it helps</a>
        <a href="#okr-capabilities">Capabilities</a>
        <a href="#okr-ai">AI & review</a>
      </nav>
      <section
        className="okr-section okr-workflow-section"
        aria-labelledby="okr-workflow-title"
      >
        <div className="okr-section-heading">
          <div>
            <p className="okr-eyebrow">One connected workflow</p>
            <h2 id="okr-workflow-title">A clear path from plan to progress.</h2>
          </div>
          <p>
            One connected workflow for students, faculty, leadership and
            operations.
          </p>
        </div>
        <ol
          id="okr-workflow"
          className="okr-journey"
          aria-label="The six-step OKRion workflow"
        >
          {workflow.map((step, index) => (
            <li key={step.title}>
              <span className="okr-step-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        id="okr-overview"
        className="okr-overview okr-section"
        aria-labelledby="okr-overview-title"
      >
        <div className="okr-section-intro">
          <p className="okr-eyebrow">A shared view of the work</p>
          <h2 id="okr-overview-title">
            From individual effort
            <br />
            to institutional progress.
          </h2>
          <p>
            Academic progress involves more than a completed task. It includes
            the objective behind it, the evidence that supports it and the
            people who review it.
          </p>
          <p>
            OKRion connects those pieces, so a student knows the next step, a
            faculty member sees the review context and leadership can follow the
            wider picture.
          </p>
          <a className="okr-text-link" href="#okr-roles">
            Find your place in the workflow{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div
          className="okr-workboard"
          aria-label="Illustrative submission workflow"
        >
          <div className="okr-board-heading">
            <span>
              <span className="okr-live-dot" /> A connected progress record
            </span>
            <span>Illustrative workflow</span>
          </div>
          {[
            {
              icon: Target,
              label: "THE OBJECTIVE",
              title: "Build practical skills",
              text: "A clear goal, assigned to the right person.",
            },
            {
              icon: FileCheck2,
              label: "THE EVIDENCE",
              title: "Achievement submitted",
              text: "Activity details and supporting evidence, together.",
            },
            {
              icon: UsersRound,
              label: "THE REVIEW",
              title: "Ready for a decision",
              text: "Review context, feedback and a traceable outcome.",
            },
          ].map((item, index) => (
            <div key={item.label}>
              {index > 0 && <div className="okr-record-connector" />}
              <div className="okr-record">
                <div className="okr-record-icon">
                  <item.icon size={21} aria-hidden="true" />
                </div>
                <div>
                  <small>{item.label}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="okr-board-footer">
            <CheckCircle2 size={17} aria-hidden="true" /> The outcome stays
            connected to the original goal.
          </div>
        </div>
      </section>
      <section
        id="okr-roles"
        className="okr-section"
        aria-labelledby="okr-roles-title"
      >
        <div className="okr-section-heading">
          <div>
            <p className="okr-eyebrow">
              Different roles. One connected system.
            </p>
            <h2 id="okr-roles-title">
              The right view for every responsibility.
            </h2>
          </div>
          <p>
            Explore how each role contributes to the same cycle of goals,
            evidence and progress.
          </p>
        </div>
        <div className="okr-role-layout">
          <div
            className="okr-role-list"
            role="group"
            aria-label="Choose a role to learn about"
          >
            {okrion.roles.map((item, index) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={selectedRole === index}
                aria-controls="okr-role-detail"
                onClick={() => setSelectedRole(index)}
              >
                <span>{item.name}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div
            id="okr-role-detail"
            className="okr-role-detail"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="okr-role-detail-icon">
              <UsersRound size={28} aria-hidden="true" />
            </div>
            <p className="okr-eyebrow">
              The {role.name.toLowerCase()} workspace
            </p>
            <h3>{detail.headline}</h3>
            <ul>
              {detail.tasks.map((task) => (
                <li key={task}>
                  <Check size={17} aria-hidden="true" />
                  {task}
                </li>
              ))}
            </ul>
            <div className="okr-role-outcome">
              <span>What this brings together</span>
              <p>{detail.outcome}</p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="okr-capabilities"
        className="okr-section"
        aria-labelledby="okr-capabilities-title"
      >
        <div className="okr-section-heading">
          <div>
            <p className="okr-eyebrow">Built around the full cycle</p>
            <h2 id="okr-capabilities-title">More context. Fewer loose ends.</h2>
          </div>
          <p>
            Bring planning, participation and oversight into a consistent
            working process.
          </p>
        </div>
        <div className="okr-capability-grid">
          {capabilities.map((item, index) => {
            const Icon = capabilityIcons[index];
            return (
              <article key={item.title}>
                <Icon size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section
        id="okr-ai"
        className="okr-ai-section okr-section"
        aria-labelledby="okr-ai-title"
      >
        <div className="okr-ai-heading">
          <div>
            <p className="okr-eyebrow">
              <Sparkles size={14} aria-hidden="true" /> AI-assisted review
            </p>
            <h2 id="okr-ai-title">
              Help reviewers focus
              <br />
              where judgment matters.
            </h2>
          </div>
          <p>
            Use supported checks to bring structure to evidence review. AI
            assistance works within the configured review process, while review
            policies define how outcomes are decided.
          </p>
        </div>
        <ol className="okr-ai-flow">
          {aiWorkflow.map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="okr-ai-note">
          <ShieldCheck size={20} aria-hidden="true" />
          <div>
            <strong>Assistance with accountability.</strong>
            <p>
              Available checks depend on your institution’s configuration.
              Review policies determine which supported checks can complete
              automatically and which submissions require a reviewer’s decision.
            </p>
          </div>
        </div>
      </section>
      <section className="okr-closing" aria-labelledby="okr-closing-title">
        <p className="okr-eyebrow">See the bigger picture</p>
        <h2 id="okr-closing-title">A clearer way to move forward.</h2>
        <p>
          Discover how OKRion brings academic goals, mentoring and evidence-led
          reviews into one connected experience.
        </p>
        <a
          href={okrion.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary-action"
        >
          Explore OKRion <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a href="#okr-title" className="okr-back-top">
          Back to overview <ArrowRight size={14} aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}

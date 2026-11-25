import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  Briefcase,
  CheckCircle2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Printer,
  Sparkles,
} from 'lucide-react';
import { FOUNDER } from '../data/founder';

export function FounderPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Digital Trail Labs
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="dtl-surface-2 inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
        >
          <Printer className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
          Print / Save PDF
        </button>
      </div>

      {/* Executive Header */}
      <section className="dtl-surface rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Founder &amp; Executive Profile
            </span>
            <h1 className="mt-2 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {FOUNDER.name}
            </h1>
            <p className="mt-1.5 text-base font-medium text-[var(--text-secondary)]">
              {FOUNDER.title}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                {FOUNDER.location}
              </span>
              <a
                href={`mailto:${FOUNDER.email}`}
                className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"
              >
                <Mail className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                {FOUNDER.email}
              </a>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                {FOUNDER.phone}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2.5">
            <a
              href={FOUNDER.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-4 py-2.5 font-mono text-xs font-bold text-slate-950 transition-transform hover:scale-105"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn Profile
            </a>
            <a
              href={FOUNDER.github}
              target="_blank"
              rel="noreferrer"
              className="dtl-surface-2 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        <p className="mt-6 border-t border-[var(--border-subtle)] pt-6 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          {FOUNDER.summary}
        </p>
      </section>

      {/* Enterprise AI Playbook */}
      <section className="mt-8">
        <div className="flex items-center gap-2 text-[var(--accent)]">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <h2 className="font-[var(--font-display)] text-xl font-bold text-[var(--text-primary)]">
            Enterprise AI &amp; Platform Transformation Playbook
          </h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {FOUNDER.aiInitiatives.map((item) => (
            <div key={item.title} className="dtl-surface rounded-2xl p-5">
              <h3 className="font-[var(--font-display)] text-base font-bold text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Proficiencies */}
      <section className="dtl-surface mt-8 rounded-2xl p-6">
        <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--text-primary)]">
          Technical &amp; Leadership Proficiencies
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {FOUNDER.proficiencies.map((skill) => (
            <span
              key={skill}
              className="dtl-surface-2 rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--text-primary)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[var(--accent)]">
          <Briefcase className="h-4 w-4" aria-hidden="true" />
          <h2 className="font-[var(--font-display)] text-xl font-bold text-[var(--text-primary)]">
            Executive Experience
          </h2>
        </div>

        <div className="mt-4 space-y-4">
          {FOUNDER.experience.map((job) => (
            <article key={`${job.company}-${job.period}`} className="dtl-surface rounded-2xl p-6">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div>
                  <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--text-primary)]">
                    {job.role}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--accent)]">
                    {job.company} · <span className="font-normal text-[var(--text-muted)]">{job.location}</span>
                  </p>
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)]">{job.period}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {job.summary}
              </p>
              <ul className="mt-3.5 space-y-2">
                {job.highlights.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text-secondary)]"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emerald)]"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Certifications & Education */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="dtl-surface rounded-2xl p-6">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <Award className="h-4 w-4" aria-hidden="true" />
            <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--text-primary)]">
              Certifications
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {FOUNDER.certifications.map((cert) => (
              <li key={cert.title} className="border-b border-[var(--border-subtle)] pb-2.5 last:border-none last:pb-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{cert.title}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {cert.issuer}
                  {cert.year ? ` · ${cert.year}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="dtl-surface flex flex-col justify-between rounded-2xl p-6">
          <div>
            <div className="flex items-center gap-2 text-[var(--accent)]">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--text-primary)]">
                Education
              </h2>
            </div>
            <p className="mt-4 text-base font-bold text-[var(--text-primary)]">
              {FOUNDER.education.degree}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{FOUNDER.education.school}</p>
          </div>

          <div className="dtl-surface-2 mt-6 rounded-xl p-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)]">
              Ready to Connect?
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
              Open to conversations around VP / Director of IT, Enterprise AI Transformation, and
              Platform Engineering leadership roles.
            </p>
            <a
              href={`mailto:${FOUNDER.email}`}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              Email {FOUNDER.email} →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

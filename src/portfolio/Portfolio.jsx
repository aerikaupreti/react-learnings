import { useState } from "react";
import "./Portfolio.css";

const profile = {
  name: "Alex Rivera",
  role: "Frontend Developer",
  tagline:
    "I craft clean, fast, and accessible web experiences with React and modern JavaScript.",
  email: "alex.rivera@example.com",
  location: "San Francisco, CA",
  bio: [
    "I'm a frontend developer with 5+ years of experience turning complex ideas into simple, beautiful interfaces. I care deeply about performance, accessibility, and the small details that make a product feel polished.",
    "When I'm not building for the web, you'll find me sketching UI ideas, contributing to open source, or exploring the city on two wheels.",
  ],
  skills: [
    { name: "React", level: 90 },
    { name: "JavaScript / TypeScript", level: 88 },
    { name: "CSS / Tailwind", level: 85 },
    { name: "Node.js", level: 70 },
    { name: "Figma", level: 75 },
    { name: "Testing (Jest, RTL)", level: 72 },
  ],
  projects: [
    {
      title: "Inkdrop Notes",
      description:
        "A distraction-free markdown note-taking app with offline support, keyboard-first navigation, and seamless sync.",
      stack: ["React", "TypeScript", "IndexedDB"],
      link: "#",
    },
    {
      title: "Trailblaze",
      description:
        "A hiking companion that maps trails, weather, and difficulty ratings. Built for outdoor enthusiasts who plan on the go.",
      stack: ["Next.js", "Mapbox", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Pocket Menu",
      description:
        "A digital menu platform for small restaurants, cutting table-side ordering time in half with a mobile-first flow.",
      stack: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
  ],
  socials: [
    { label: "GitHub", url: "https://github.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
  ],
};

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = ["About", "Skills", "Projects", "Contact"];

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          {profile.name
            .split(" ")
            .map((w) => w[0])
            .join("")}
          .
        </a>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          ))}
          <a
            className="nav-cta"
            href={`mailto:${profile.email}`}
            onClick={() => setOpen(false)}
          >
            Hire me
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <p className="hero-eyebrow">Hello, I&apos;m</p>
      <h1 className="hero-name">{profile.name}</h1>
      <h2 className="hero-role">{profile.role}</h2>
      <p className="hero-tagline">{profile.tagline}</p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#projects">
          View my work
        </a>
        <a className="btn btn-secondary" href={`mailto:${profile.email}`}>
          Get in touch
        </a>
      </div>
      <ul className="hero-socials">
        {profile.socials.map((s) => (
          <li key={s.label}>
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <h2 className="section-title">About me</h2>
      <div className="about-grid">
        <div className="about-bio">
          {profile.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="about-facts">
          <div>
            <span className="fact-label">Location</span>
            <span className="fact-value">{profile.location}</span>
          </div>
          <div>
            <span className="fact-label">Email</span>
            <a className="fact-value" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
          <div>
            <span className="fact-label">Role</span>
            <span className="fact-value">{profile.role}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {profile.skills.map((s) => (
          <div className="skill" key={s.name}>
            <div className="skill-head">
              <span>{s.name}</span>
              <span>{s.level}%</span>
            </div>
            <div className="skill-bar">
              <div className="skill-fill" style={{ width: `${s.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Selected projects</h2>
      <div className="projects-grid">
        {profile.projects.map((p) => (
          <article className="card" key={p.title}>
            <h3 className="card-title">{p.title}</h3>
            <p className="card-desc">{p.description}</p>
            <ul className="card-stack">
              {p.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <a className="card-link" href={p.link}>
              Visit project →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <h2 className="section-title">Let&apos;s work together</h2>
      <p className="contact-text">
        Have a project in mind, or just want to say hi? My inbox is always open.
      </p>
      <a
        className="btn btn-primary contact-btn"
        href={`mailto:${profile.email}`}
      >
        {profile.email}
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React.
      </p>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

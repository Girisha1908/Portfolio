/* =========================================================
   PROFILE: single source of truth for all portfolio content.
   Edit this file to update the site. Every commit page, project
   card, folder and case study renders from here.

   Page blocks (rendered in order):
     { p: "paragraph" }                     plain paragraph
     { lead: "big line" }                   large serif pull-line
     { lines: ["a.", "b."] }                short stacked lines
     { h: "sub heading" }                   section heading
     { sub: "heading" }                     large sub-title
     { list: ["…"] }                        arrow list (→)
     { chips: ["…"] , label: "optional" }   tag chips
     { stats: [{ v, l }] }                  big number strip
     { groups: [{ title, items }] }         grouped chips
     { trio: [{ t, d }] }                   three short columns
     { cards: [{ tag, t, meta, lines, rows, chips, image }] }  cards
     { meta: "…" }                          small mono line
     { projects: true }                     all project stories
     { articles: [...] }                    blog index
     { contact: true }                      contact buttons
     { photo: { src, alt, caption } }       image with caption
     { sign: "name" }                       signature
     { github: true }                       live list of new GitHub repos
     { cta: "work" }                        link to the Work section
   ========================================================= */
window.PROFILE = {
  name: "Girisha Anamala",
  email: "anamalagirisha@gmail.com",
  resumeUrl: "assets/Girisha-Anamala-Resume.pdf", // "" hides every Resume link
  /* GitHub auto-feed: public repos appear on the site automatically.
     mode "auto"  → every public, non-fork repo that has a description
     mode "topic" → only repos tagged with the topic below
     Hide a repo: add the topic "hide-from-portfolio" on GitHub, or list it in exclude. */
  github: {
    user: "Girisha1908",
    mode: "auto",
    topic: "portfolio",
    exclude: ["Girisha1908", "portfolio", "Girisha1908.github.io"],   // profile README + this site's own repo
    limit: 9
  },

  links: {
    github: "https://github.com/Girisha1908",
    githubHandle: "girisha1908",
    linkedin: "https://www.linkedin.com/in/girishaanamala/",
    linkedinHandle: "girisha anamala"
  },

  /* Loader greetings, shown one by one, in order. */
  greetings: [
    { text: "hi", lang: "english", script: "latin" },
    { text: "नमस्ते", lang: "hindi", script: "devanagari" },
    { text: "नमस्कार", lang: "marathi", script: "devanagari" },
    { text: "నమస్కారం", lang: "telugu", script: "telugu" }
    // add the fifth language here, e.g. { text: "…", lang: "…", script: "latin" }
  ],

  /* ---------- Commit pages (one per node in the hero graph) ---------- */
  pages: {
    p: {
      branch: "main", commit: "feat: selected work",
      title: "selected work",
      blocks: [
        { lead: "the goal was never to just write code." },
        { p: "it was to find problems worth solving, build something that actually works, and become good enough with my tools to take on bigger ones." },
        { p: "i’m girisha, a computer science student, builder, product thinker, and open-source community enthusiast." },
        { p: "i like taking messy problems and turning them into systems people can actually use." },
        { p: "currently training in full-stack engineering, product development, systems, and whatever problem looks interesting enough to chase." },
        { h: "projects" },
        { projects: true },
        { github: true },
        { cta: "work" }
      ]
    },

    o1: {
      branch: "main", commit: "docs: about me",
      title: "about me",
      blocks: [
        { lead: "i didn’t start with a perfect roadmap." },
        { p: "i started with curiosity." },
        { p: "somewhere between breaking things, building things, joining communities, failing at things, and trying again, i realized that i don’t just enjoy using technology." },
        { p: "i enjoy creating with it." },
        { p: "today, i’m pursuing a b.tech in computer science engineering at srm university, ap, and i’m constantly moving between engineering, product thinking, community building, and experimentation." },
        { stats: [
          { v: "8.85", l: "cgpa / 10" },
          { v: "9.115", l: "latest semester gpa" },
          { v: "2023–27", l: "b.tech cse · srm university, ap" }
        ] },
        { h: "i care about three things" },
        { trio: [
          { t: "build.", d: "build things that solve real problems." },
          { t: "learn.", d: "learn the systems underneath them." },
          { t: "contribute.", d: "contribute to people and communities around me." }
        ] },
        { lines: ["i’m still figuring things out.", "that’s kind of the point."] }
      ]
    },

    r: {
      branch: "main", commit: "chore: resume & experience",
      title: "experience",
      blocks: [
        { sub: "web development intern at sanjay ghodawat group" },
        { meta: "oct 2025 – jan 2026 · remote · learning & development division" },
        { lead: "i helped build the l&d website, something people could actually use and navigate." },
        { p: "i built the l&d webpage for the learning & development division, working across html, css, bootstrap and javascript to create responsive interfaces, and collaborated with stakeholders to publish content." },
        { chips: ["html", "css", "bootstrap", "javascript"], label: "built with" },
        { chips: ["frontend development", "stakeholder communication", "shipping real work"], label: "experience gained" }
      ]
    },

    t: {
      branch: "main", commit: "build: tech stack",
      title: "tech stack",
      blocks: [
        { groups: [
          { title: "primary tools", items: ["javascript", "typescript", "java", "python", "c++"] },
          { title: "frontend tools", items: ["react", "next.js", "responsive ui", "html / css / bootstrap"] },
          { title: "backend tools", items: ["node.js", "express.js", "rest apis"] },
          { title: "databases", items: ["postgresql", "mongodb", "mysql", "supabase"] },
          { title: "deployment & infrastructure", items: ["docker", "git", "github", "linux"] }
        ] }
      ]
    },

    f: {
      branch: "feature/portfolio", commit: "feat: foss & community",
      title: "foss & community",
      meta: "foss srmap · co-lead · jun 2025 – feb 2026",
      blocks: [
        { sub: "the village" },
        { lead: "technology gets more interesting when you stop learning alone." },
        { photo: { src: "assets/photos/foss-srmap-team.jpg", alt: "The FOSS SRMAP team in matching black t-shirts on stage in front of a FOSS SRMAP screen", caption: "the foss srmap team" } },
        { p: "i’ve spent time building with and contributing to student developer communities, helping people discover open source, collaborate on projects, and actually ship things." },
        { stats: [
          { v: "200+", l: "member open-source community" },
          { v: "13", l: "member core team i led" }
        ] },
        { p: "as a foss community co-lead, i’m learning another kind of engineering:" },
        { lead: "people engineering." },
        { lines: ["organizing.", "communicating.", "mentoring.", "bringing people together."] },
        { p: "creating an environment where someone who knows nothing today can build something tomorrow." }
      ]
    },

    o2: {
      branch: "feature/portfolio", commit: "release: achievements",
      title: "achievements",
      blocks: [
        { cards: [
          { tag: "2nd place", t: "code for connection hackathon", meta: "coding club srmap · feb 2026",
            lines: ["built under pressure.", "shipped with a team.", "learned that the last 20% of a project is usually where the real battle begins."],
            rows: [
              { k: "problem statement", v: "elderly individuals often struggle with complex modern interfaces, making it critically difficult to signal for help safely during emergencies." },
              { k: "our solution", v: "replaces hurdles with an intuitive voice-driven interface equipped with passive ai-powered fall detection and one-tap sos alerts." }
            ],
            chips: ["kotlin", "tensorflow", "firebase", "android"],
            image: { src: "assets/certificates/code-for-connection-2nd-place.jpg", alt: "Certificate of appreciation: 1st runner up, Code for Connection Hackathon, Coding Club SRM University AP, 14 February 2026" } },
          { tag: "certified", t: "oracle certified professional: java se 17 developer", meta: "oracle · feb 2026",
            lines: ["certification unlocked."],
            image: { src: "assets/certificates/oracle-java-se-17-developer.jpg", href: "assets/certificates/oracle-java-se-17-developer.pdf", alt: "Oracle Certified Professional: Java SE 17 Developer certificate, February 18, 2026" } },
          { tag: "certified", t: "red hat certified specialist in containers", lines: ["containers unlocked."] },
          { tag: "course", t: "red hat system administration ii (rh134)", meta: "red hat · nov 2025 · 40 credit hours",
            lines: ["certificate of attendance, version 9.3."],
            verify: "https://www.credly.com/badges/9c3ab4bc-9925-42c3-b561-efe9b5fca04a",
            image: { src: "assets/certificates/red-hat-rh134-system-administration-ii.jpg", href: "assets/certificates/red-hat-rh134-system-administration-ii.pdf", alt: "Red Hat certificate of attendance: Red Hat System Administration II (RH134), November 20, 2025" } }
        ] }
      ]
    },

    l: {
      branch: "feature/portfolio", commit: "test: learning log",
      title: "learning log",
      blocks: [
        { soon: "certifications are being added." }
      ]
    },

    i: {
      branch: "feature/portfolio", commit: "docs: ink & articles",
      title: "ink & articles",
      blog: true,
      blocks: [
        { lead: "i write when i understand something well enough to explain it to someone else." },
        { h: "things i learned while building" },
        { articles: [
          { title: "why authentication isn’t just a login screen", url: "" },
          { title: "what actually happens behind a rest api", url: "" },
          { title: "lessons from building role-based systems", url: "" },
          { title: "what breaks when real-time systems meet real users", url: "" },
          { title: "things i wish i knew before building my first full-stack project", url: "" },
          { title: "cybersecurity lessons from actually touching systems", url: "" },
          { title: "what building with a community taught me about engineering", url: "" }
        ] },
      ]
    },

    o3: {
      branch: "feature/portfolio", commit: "ping: contact me",
      title: "contact",
      blocks: [
        { h: "i’m always interested in" },
        { list: [
          "building something weird",
          "solving a real engineering problem",
          "contributing to open source",
          "product experiments",
          "internships and engineering opportunities",
          "meeting people who like building things"
        ] },
        { h: "ping me on" },
        { contact: true }
      ]
    },

    merge: {
      branch: "main ← feature/portfolio", commit: "git merge → let’s talk",
      title: "let’s talk",
      blocks: [
        { lead: "everybody starts somewhere." },
        { p: "i’m still training." },
        { lines: ["still breaking things.", "still learning.", "still getting better."] },
        { p: "but i’ve stopped waiting to become “ready.”" },
        { lead: "if there’s something worth building, let’s build it." },
        { sign: "girisha" },
        { contact: true }
      ]
    }
  },

  /* ---------- Projects (Work section + selected work page) ---------- */
  projects: [
    {
      id: "collectra",
      name: "Collectra",
      folderName: "Collectra",
      tagline: "Parcels, picked up securely.",
      blurb: "QR-indexed shelves and OTP-verified handover for hostel gates.",
      tags: ["Next.js", "Express", "PostgreSQL"],
      commit: "feat: package lifecycle engine",
      kicker: "campus parcel logistics",
      stack: ["next.js", "node.js", "express", "postgresql", "twilio"],
      story: [
        "hundreds of packages dropped at a hostel gate every day, logged into fraying paper registers, and dumped into cupboards.",
        "the result? 5-minute searches, missing deliveries, and zero verification integrity.",
        "collectra replaced that manual chaos with an end-to-end digital retrieval state machine:"
      ],
      bullets: [
        { k: "qr indexing", v: "incoming parcels are instantly mapped to physical shelf locations." },
        { k: "otp gate", v: "physical handover requires an authentication code sent to the recipient. no forged paper signatures." },
        { k: "lifecycle audit", v: "live status tracking flags unclaimed items after set retention limits, ending the forgotten-box pile-up." }
      ],
      links: [
        { label: "live demo", url: "https://collectra-kappa.vercel.app" },
        { label: "code", url: "https://github.com/Girisha1908/collectra" }
      ]
    },
    {
      id: "gradient",
      name: "Gradient",
      folderName: "Gradient",
      tagline: "Internships, with proof of work.",
      blurb: "Task cards, kanban visibility and a manager review gate.",
      tags: ["React", "TypeScript", "Supabase"],
      commit: "feat: intern workflow & proof-of-work system",
      kicker: "role-aware intern workflow",
      stack: ["react", "typescript", "supabase", "postgresql"],
      story: [
        "most internships get lost inside messy whatsapp groups, expired drive links, and forgotten spreadsheets.",
        "managers waste hours asking “what’s the update?”, and interns finish their term with zero tangible proof of what they actually built.",
        "gradient turns messy internship execution into a structured workspace:"
      ],
      bullets: [
        { k: "central task cards", v: "briefs, links, and discussions live inside the task, so no context gets lost in chat threads." },
        { k: "kanban visibility", v: "real-time state tracking keeps managers informed without manual check-ins." },
        { k: "review gate", v: "tasks cannot close without explicit manager sign-off and deliverable verification." },
        { k: "auto-portfolio", v: "approved submissions compile automatically into an objective, audit-ready proof-of-work log for performance reviews and sign-offs." }
      ],
      links: [
        { label: "code", url: "https://github.com/Girisha1908/Gradient" },
        { label: "design document (pdf)", url: "assets/docs/gradient-design-document.pdf", doc: true }
      ]
    },
    {
      id: "coco",
      name: "CoCo’s Playground",
      folderName: "CoCo’s<br>Playground",
      tagline: "Code together, live.",
      blurb: "One editor, many users, changes moving in real time.",
      tags: ["React", "Socket.IO", "Node.js"],
      commit: "feat: real-time collaborative code editor",
      kicker: "real-time collaborative code editor",
      stack: ["react", "node.js", "socket.io", "codemirror", "express"],
      story: [
        "what if writing code together felt like being in the same room?",
        "coco’s playground is a collaborative coding environment built for pair programming, education and remote collaboration.",
        "powered by react, node.js and socket.io."
      ],
      bullets: [
        { k: "instant code sync", v: "every keystroke is broadcast over socket.io, so collaborators’ editors update as you type." },
        { k: "rooms & sessions", v: "join with a unique room id and a username. no accounts, no setup." },
        { k: "live presence", v: "avatars show who’s in the room, with toasts as people join and leave." },
        { k: "codemirror core", v: "syntax highlighting, line numbers and change tracking in the browser." }
      ],
      links: [
        { label: "live demo", url: "https://cocos-playground.onrender.com" },
        { label: "code", url: "https://github.com/Girisha1908/Collaborative-Code-editor" },
        { label: "capstone presentation (pdf)", url: "assets/docs/coco-capstone-presentation.pdf", doc: true }
      ]
    },
    {
      id: "sahay",
      name: "SAHAY",
      folderName: "SAHAY",
      tagline: "Smartphones, elder-first.",
      blurb: "A voice-first Android companion for elderly safety.",
      tags: ["Kotlin", "Compose", "ML Kit"],
      commit: "feat: ai companion for elderly safety",
      kicker: "ai companion for elderly safety",
      team: "team build · hacksrm 7.0",
      stack: ["kotlin", "jetpack compose", "node.js", "ml kit", "elevenlabs", "datahaven"],
      story: [
        "technology shouldn’t become harder to use as people get older.",
        "sahay is an android companion designed around elderly users.",
        "it combines an elder-first interface, voice interaction, smartphone automation, prescription scanning and a decentralized medical storage backend."
      ],
      bullets: [
        { k: "genie", v: "a voice assistant, with elevenlabs voice integration, so users speak instead of navigating menus." },
        { k: "prescription scanning", v: "ml kit reads prescriptions straight from the camera." },
        { k: "datahaven backend", v: "decentralized storage for medical records." }
      ],
      links: [
        { label: "code", url: "https://github.com/Girisha1908/HACKSRM" },
        { label: "pitch deck (pdf)", url: "assets/docs/sahay-pitch-deck.pdf", doc: true }
      ]
    }
  ]
};

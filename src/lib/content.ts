export type Lang = "fr" | "en";

export const CONTACT = {
  email: "pichotmarc2511@gmail.com",
  // TODO: ajoute ton GitHub / LinkedIn ici (laisse "" pour masquer le bouton)
  github: "https://github.com/pichotmarc2511/portfolio-marc",
  linkedin: "",
};

type Project = {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  did: string[];
  stack: string[];
  facts: { value: number; suffix?: string; label: string }[];
  link?: { label: string; href: string };
  images: string[];
  accent: string; // tailwind-free color for glow
  phone?: boolean;
  events?: { name: string; when: string; detail: string; images?: string[] }[];
};

export type Content = {
  nav: { work: string; method: string; path: string; contact: string };
  hero: {
    hello: string;
    title: string;
    words: string[];
    sub: string;
    cta1: string;
    cta2: string;
    badge: string;
  };
  stats: { value: number; suffix?: string; label: string }[];
  stackTitle: string;
  work: {
    title: string;
    sub: string;
    problem: string;
    did: string;
    open: string;
    events: string;
    eventPhotos: string;
  };
  projects: Project[];
  method: {
    title: string;
    sub: string;
    steps: { n: string; t: string; d: string }[];
    aiTitle: string;
    aiSub: string;
    rules: { t: string; d: string }[];
  };
  path: {
    title: string;
    items: { when: string; role: string; where: string; d: string }[];
  };
  contact: { title: string; sub: string; mail: string; location: string };
  footer: string;
};

const stack = [
  "C#", ".NET", "ASP.NET Core", "React", "TypeScript", "SQL", "MongoDB", "REST API",
  "Java", "Azure DevOps", "Git", "Scrum", "Unity", "Tailwind", "Vite", "Docker",
];
export const STACK = stack;

export const content: Record<Lang, Content> = {
  fr: {
    nav: { work: "Projets", method: "Méthode", path: "Parcours", contact: "Contact" },
    hero: {
      hello: "Marc Pichot",
      title: "Développeur C# / .NET.",
      words: ["API REST", "React", "applications IA", "du besoin à la mise en ligne"],
      sub: "Je conçois, développe et mets en ligne des applications complètes : du recueil du besoin à l'API, l'interface et la production. Trois ans en entreprise, plusieurs produits livrés seul.",
      cta1: "Voir mes projets",
      cta2: "Me contacter",
      badge: "Disponible · Belgique",
    },
    stats: [
      { value: 3, suffix: " ans", label: "d'expérience en entreprise" },
      { value: 517, label: "commits sur PermaPlanner" },
      { value: 175, label: "tests automatisés (backend)" },
      { value: 4, label: "projets complets, de bout en bout" },
    ],
    stackTitle: "Technologies",
    work: {
      title: "Projets",
      sub: "Quatre projets réels, construits de bout en bout.",
      problem: "Le besoin",
      did: "Ce que j'ai fait",
      events: "Sur le terrain",
      eventPhotos: "visuels",
      open: "Voir le site",
    },
    projects: [
      {
        id: "permaplanner",
        name: "PermaPlanner",
        tagline: "Le planificateur de potager en permaculture",
        problem:
          "Planifier un potager (associations de plantes, calendrier, récoltes) demande des connaissances dispersées. L'outil les rassemble et guide pas à pas.",
        did: [
          "Éditeur visuel du jardin avec score de santé du potager et récolte estimée.",
          "API .NET (22 contrôleurs), interface React/TypeScript, base MongoDB.",
          "Encyclopédie, liste de courses, rapport de saison, quiz, abonnements, plusieurs langues.",
          "Mise en production et suivi correctif et évolutif, seul.",
        ],
        stack: ["React", "TypeScript", "Vite", ".NET", "MongoDB", "REST API", "i18n"],
        facts: [
          { value: 517, label: "commits" },
          { value: 175, label: "tests backend" },
          { value: 22, label: "contrôleurs API" },
        ],
        link: { label: "permaplanner.fr", href: "https://permaplanner.fr" },
        events: [
          { name: "Mind & Market, Marche-en-Famenne", when: "18 juin 2026", images: ["/img/events/flyer-recto.webp", "/img/events/flyer-verso.webp"], detail: "Pitch devant un jury de professionnels, dont des responsables de la Foire de Libramont, évalué sur 8 critères (innovation, marché, faisabilité technique et financière, impact, clarté, communication). Stand dans la Test Arena et questionnaire de retour utilisateurs pour prioriser les fonctionnalités et les tarifs." },
          { name: "Foire de Libramont", when: "26 juillet 2026", images: ["/img/events/carte-recto.webp", "/img/events/carte-verso.webp", "/img/events/a3-testez.webp", "/img/events/a3-avis.webp", "/img/events/a3-pourquoi.webp"], detail: "Stand dans la Test Arena, toute la journée. Cartes de visite recto-verso et affiches A3 conçues pour le stand." },
        ],
        images: ["/img/permaplanner-editor.webp", "/img/permaplanner-dashboard.webp"],
        accent: "#34d399",
      },
      {
        id: "mentor",
        name: "Mentor 2.0",
        tagline: "Une app de coaching de vie guidée par l'IA",
        problem:
          "Un coach qui ne donne jamais la solution : il pose des questions, reformule, puis génère des actions concrètes (SMART) à suivre.",
        did: [
          "Protocole de conversation IA (écouter, reformuler, valider, approfondir) piloté par un prompt système strict.",
          "API .NET 8, authentification JWT, MongoDB Atlas, appels à l'API Claude.",
          "Application React packagée pour iOS et Android avec Capacitor, mode vocal, to-do d'actions.",
          "Dossier de publication App Store et Google Play, abonnements, site et blog.",
        ],
        stack: ["React", "Capacitor", ".NET 8", "MongoDB Atlas", "JWT", "Claude API", "iOS / Android"],
        facts: [
          { value: 2, label: "stores visés" },
          { value: 4, label: "règles IA imposées" },
        ],
        link: { label: "mentor2-0.com", href: "https://www.mentor2-0.com/" },
        images: ["/img/mentor-accueil.webp", "/img/mentor-vocal.webp", "/img/mentor-actions.webp"],
        accent: "#60a5fa",
        phone: true,
      },
      {
        id: "labelfrites",
        name: "Label Frites",
        tagline: "Le jeu concours pour la friterie de Rochefort",
        problem:
          "Une friterie voulait animer son comptoir : un bouton, un tirage au sort, des bons d'achat à gagner, sans serveur ni installation lourde.",
        did: [
          "Web app plein écran pour tablette ou mobile, aux couleurs du commerce.",
          "Tirage pondéré (bons de 5, 10, 20 €), délai entre deux essais, compteur d'objectif.",
          "Célébration animée (confettis, sons), écran d'administration protégé par code PIN.",
          "Fonctionne sans backend, données conservées sur l'appareil.",
        ],
        stack: ["JavaScript", "HTML / CSS", "Canvas", "PWA"],
        facts: [
          { value: 3, label: "lots paramétrables" },
          { value: 0, label: "serveur nécessaire" },
        ],
        images: ["/img/labelfrites-jeu.webp", "/img/labelfrites-gagne.webp"],
        accent: "#fb923c",
      },
      {
        id: "simaccess",
        name: "SimAccess",
        tagline: "Le site du sim racing fait main de mon frère",
        problem:
          "Mon frère construit à la main cockpits, pédaliers hydrauliques et afficheurs pour le sim racing. Il lui fallait un site pour documenter ses réalisations, partager plans et kits, et construire une communauté.",
        did: [
          "Site Next.js avec back-office Payload CMS : projets, plans, kits, tutoriels et téléchargements gérables sans code.",
          "Base MongoDB, médias sur Vercel Blob, déploiement sur Vercel.",
          "Site en français et en anglais, SEO, recherche, newsletter, commentaires et formulaire de contact.",
          "Identité visuelle « HUD de course » : thème sombre, logo et héros cinématique. Tests e2e Playwright et tests d'intégration.",
        ],
        stack: ["Next.js", "Payload CMS", "TypeScript", "MongoDB", "Vercel Blob", "Tailwind", "Playwright", "i18n"],
        facts: [
          { value: 5, label: "types de contenu" },
          { value: 2, label: "langues" },
          { value: 22, label: "commits" },
        ],
        link: { label: "simaccess.vercel.app", href: "https://simaccess.vercel.app/" },
        images: ["/img/simaccess-home.webp", "/img/simaccess-cockpit.webp", "/img/simaccess-pedalier.webp", "/img/simaccess-afficheur.webp"],
        accent: "#f43f3e",
      },    ],
    method: {
      title: "Ma méthode",
      sub: "Du besoin flou à la solution en production, en cinq temps.",
      steps: [
        { n: "01", t: "Comprendre", d: "Interviews, questions de clarification, périmètre et hors-périmètre, parties prenantes." },
        { n: "02", t: "Spécifier", d: "Besoins fonctionnels et non fonctionnels, user stories avec critères d'acceptation, règles de gestion." },
        { n: "03", t: "Concevoir", d: "Modèle de données, diagrammes UML (cas d'usage, classes, séquence), choix d'architecture documentés." },
        { n: "04", t: "Construire et tester", d: "API REST, interface, tests automatisés, revues, intégration continue." },
        { n: "05", t: "Documenter et accompagner", d: "Documentation d'exploitation, support, formation des utilisateurs, évolutions." },
      ],
      aiTitle: "L'IA, sous contrôle",
      aiSub: "J'utilise l'IA pour aller plus vite. Je ne livre jamais ce que je ne comprends pas.",
      rules: [
        { t: "Revue humaine", d: "Tout code généré est relu, compris et refactoré avant d'être fusionné." },
        { t: "Tests d'abord", d: "Un comportement non testé n'est pas terminé, qu'il vienne de moi ou de l'IA." },
        { t: "Sécurité", d: "Pas de secret dans le code, requêtes paramétrées, validation des entrées, dépendances vérifiées." },
        { t: "Traçabilité", d: "Décisions, prompts utiles et limites documentés pour que le projet reste maintenable." },
      ],
    },
    path: {
      title: "Parcours",
      items: [
        { when: "2024 – aujourd'hui", role: "PermaPlanner, projet personnel", where: "Belgique", d: "Conception, développement et mise en ligne seul. API .NET, React, base de données, tests, maintenance." },
        { when: "2021 – 2024", role: "Développeur Unity / C#", where: "OUAT!, Bruxelles", d: "C# / .NET, accès aux bases SQL, analyse des demandes, maintenance corrective et évolutive. Équipe Scrum, Jira, Azure DevOps, Git." },
        { when: "Fév. – juin 2021", role: "Développeur applicatif", where: "My Innovation Center, Bruxelles", d: "Application React reliée à une base de données, plateforme HakoBio." },
        { when: "2017 – 2021", role: "Bachelier en informatique de gestion", where: "EPFC / ULB", d: "Avec distinction. Java, bases de données, analyse, gestion de projet, épreuve intégrée." },
      ],
    },
    contact: {
      title: "Parlons de votre projet",
      sub: "Une idée, une application à moderniser, un poste à pourvoir ? Écrivez-moi.",
      mail: "Écrire un e-mail",
      location: "Ciergnon, Belgique · Permis B",
    },
    footer: "Conçu et développé par Marc Pichot.",
  },
  en: {
    nav: { work: "Work", method: "Method", path: "Journey", contact: "Contact" },
    hero: {
      hello: "Marc Pichot",
      title: "C# / .NET developer.",
      words: ["REST APIs", "React", "AI applications", "from need to production"],
      sub: "I design, build and ship complete applications: from gathering the need to the API, the interface and production. Three years in industry, several products shipped solo.",
      cta1: "See my work",
      cta2: "Get in touch",
      badge: "Available · Belgium",
    },
    stats: [
      { value: 3, suffix: " yrs", label: "professional experience" },
      { value: 517, label: "commits on PermaPlanner" },
      { value: 175, label: "automated tests (backend)" },
      { value: 4, label: "complete projects, end to end" },
    ],
    stackTitle: "Technologies",
    work: {
      title: "Work",
      sub: "Four real projects, built end to end.",
      problem: "The need",
      did: "What I did",
      events: "In the field",
      eventPhotos: "visuals",
      open: "Visit site",
    },
    projects: [
      {
        id: "permaplanner",
        name: "PermaPlanner",
        tagline: "The permaculture garden planner",
        problem:
          "Planning a vegetable garden (companion plants, calendar, harvests) takes scattered knowledge. The tool gathers it and guides you step by step.",
        did: [
          "Visual garden editor with a garden health score and estimated harvest.",
          ".NET API (22 controllers), React/TypeScript interface, MongoDB database.",
          "Encyclopedia, shopping list, season report, quiz, subscriptions, several languages.",
          "Production release and corrective/evolutive maintenance, solo.",
        ],
        stack: ["React", "TypeScript", "Vite", ".NET", "MongoDB", "REST API", "i18n"],
        facts: [
          { value: 517, label: "commits" },
          { value: 175, label: "backend tests" },
          { value: 22, label: "API controllers" },
        ],
        link: { label: "permaplanner.fr", href: "https://permaplanner.fr" },
        events: [
          { name: "Mind & Market, Marche-en-Famenne", when: "18 June 2026", images: ["/img/events/flyer-recto.webp", "/img/events/flyer-verso.webp"], detail: "Pitch in front of a jury of professionals, including managers of the Foire de Libramont, scored on 8 criteria (innovation, market, technical and financial feasibility, impact, clarity, communication). Stand in the Test Arena and a user feedback questionnaire to prioritise features and pricing." },
          { name: "Foire de Libramont", when: "26 July 2026", images: ["/img/events/carte-recto.webp", "/img/events/carte-verso.webp", "/img/events/a3-testez.webp", "/img/events/a3-avis.webp", "/img/events/a3-pourquoi.webp"], detail: "Stand in the Test Arena, all day. Double-sided business cards and A3 posters designed for the stand." },
        ],
        images: ["/img/permaplanner-editor.webp", "/img/permaplanner-dashboard.webp"],
        accent: "#34d399",
      },
      {
        id: "mentor",
        name: "Mentor 2.0",
        tagline: "An AI-guided life coaching app",
        problem:
          "A coach that never hands out the answer: it asks questions, rephrases, then generates concrete (SMART) actions to follow.",
        did: [
          "AI conversation protocol (listen, rephrase, validate, deepen) driven by a strict system prompt.",
          ".NET 8 API, JWT authentication, MongoDB Atlas, Claude API calls.",
          "React app packaged for iOS and Android with Capacitor, voice mode, action to-do list.",
          "App Store and Google Play release package, subscriptions, website and blog.",
        ],
        stack: ["React", "Capacitor", ".NET 8", "MongoDB Atlas", "JWT", "Claude API", "iOS / Android"],
        facts: [
          { value: 2, label: "target stores" },
          { value: 4, label: "enforced AI rules" },
        ],
        link: { label: "mentor2-0.com", href: "https://www.mentor2-0.com/" },
        images: ["/img/mentor-accueil.webp", "/img/mentor-vocal.webp", "/img/mentor-actions.webp"],
        accent: "#60a5fa",
        phone: true,
      },
      {
        id: "labelfrites",
        name: "Label Frites",
        tagline: "The prize game for a chip shop in Rochefort",
        problem:
          "A chip shop wanted to liven up its counter: one button, a draw, vouchers to win, with no server and no heavy setup.",
        did: [
          "Full-screen web app for tablet or phone, in the shop's colours.",
          "Weighted draw (5, 10, 20 € vouchers), cooldown between plays, target counter.",
          "Animated celebration (confetti, sounds), admin screen protected by a PIN.",
          "Runs without a backend, data kept on the device.",
        ],
        stack: ["JavaScript", "HTML / CSS", "Canvas", "PWA"],
        facts: [
          { value: 3, label: "configurable prizes" },
          { value: 0, label: "servers needed" },
        ],
        images: ["/img/labelfrites-jeu.webp", "/img/labelfrites-gagne.webp"],
        accent: "#fb923c",
      },
      {
        id: "simaccess",
        name: "SimAccess",
        tagline: "My brother's handmade sim racing website",
        problem:
          "My brother hand-builds cockpits, hydraulic pedals and displays for sim racing. He needed a site to document his builds, share plans and kits, and grow a community.",
        did: [
          "Next.js site with a Payload CMS back office: projects, plans, kits, tutorials and downloads managed without code.",
          "MongoDB database, media on Vercel Blob, deployed on Vercel.",
          "French and English site, SEO, search, newsletter, comments and contact form.",
          "\"Racing HUD\" visual identity: dark theme, logo and cinematic hero. Playwright e2e tests and integration tests.",
        ],
        stack: ["Next.js", "Payload CMS", "TypeScript", "MongoDB", "Vercel Blob", "Tailwind", "Playwright", "i18n"],
        facts: [
          { value: 5, label: "content types" },
          { value: 2, label: "languages" },
          { value: 22, label: "commits" },
        ],
        link: { label: "simaccess.vercel.app", href: "https://simaccess.vercel.app/" },
        images: ["/img/simaccess-home.webp", "/img/simaccess-cockpit.webp", "/img/simaccess-pedalier.webp", "/img/simaccess-afficheur.webp"],
        accent: "#f43f3e",
      },    ],
    method: {
      title: "My method",
      sub: "From a fuzzy need to a solution in production, in five steps.",
      steps: [
        { n: "01", t: "Understand", d: "Interviews, clarifying questions, scope and out-of-scope, stakeholders." },
        { n: "02", t: "Specify", d: "Functional and non-functional requirements, user stories with acceptance criteria, business rules." },
        { n: "03", t: "Design", d: "Data model, UML diagrams (use case, class, sequence), documented architecture decisions." },
        { n: "04", t: "Build and test", d: "REST API, interface, automated tests, reviews, continuous integration." },
        { n: "05", t: "Document and support", d: "Operations documentation, support, user training, evolutions." },
      ],
      aiTitle: "AI, under control",
      aiSub: "I use AI to go faster. I never ship what I do not understand.",
      rules: [
        { t: "Human review", d: "All generated code is read, understood and refactored before it is merged." },
        { t: "Tests first", d: "Untested behaviour is not done, whether it comes from me or from the AI." },
        { t: "Security", d: "No secrets in code, parameterised queries, input validation, vetted dependencies." },
        { t: "Traceability", d: "Decisions, useful prompts and limits are documented so the project stays maintainable." },
      ],
    },
    path: {
      title: "Journey",
      items: [
        { when: "2024 – today", role: "PermaPlanner, personal project", where: "Belgium", d: "Designed, built and shipped solo. .NET API, React, database, tests, maintenance." },
        { when: "2021 – 2024", role: "Unity / C# developer", where: "OUAT!, Brussels", d: "C# / .NET, SQL databases, request analysis, corrective and evolutive maintenance. Scrum team, Jira, Azure DevOps, Git." },
        { when: "Feb – Jun 2021", role: "Application developer", where: "My Innovation Center, Brussels", d: "React application connected to a database, HakoBio platform." },
        { when: "2017 – 2021", role: "Bachelor in business IT", where: "EPFC / ULB", d: "With distinction. Java, databases, analysis, project management, final project." },
      ],
    },
    contact: {
      title: "Let's talk about your project",
      sub: "An idea, an application to modernise, a position to fill? Write to me.",
      mail: "Send an e-mail",
      location: "Ciergnon, Belgium · Driving licence B",
    },
    footer: "Designed and built by Marc Pichot.",
  },
};

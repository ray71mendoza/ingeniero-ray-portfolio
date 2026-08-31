import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'es' | 'en';

export interface DocumentLinks {
  cvSpanish: string;
  cvEnglish: string;
  certificates: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private platformId = inject(PLATFORM_ID);
  
  readonly links: DocumentLinks = {
    cvSpanish: 'https://drive.google.com/file/d/1Y9wl9uEwb_yfH_BQk8rFxUi5Pu06-Hgt/view?usp=sharing',
    cvEnglish: 'https://drive.google.com/file/d/1ey-dOGWT0Uhz8YcgbJGmjDbOjYIsy7_n/view?usp=sharing',
    certificates: 'https://drive.google.com/file/d/1dXW09WP4XYOq1W_bLUyn85ZfbxD2fiNd/view?usp=sharing'
  };

  readonly contactData = {
    fullName: 'Ray Sebastián Mendoza Torres',
    shortName: 'Ray Mendoza',
    email: 'raymendozato@gmail.com',
    phoneColombia: '+57 312 491 6281',
    phoneSpain: '+34 632 224 164',
    phoneColombiaClean: '573124916281',
    phoneSpainClean: '34632224164',
    linkedin: 'https://www.linkedin.com/in/raymendozatorres/',
    github: 'https://github.com'
  };

  currentLang = signal<Language>('es');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('portfolio_lang') as Language;
      if (savedLang === 'es' || savedLang === 'en') {
        this.currentLang.set(savedLang);
      }
    }
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('portfolio_lang', lang);
      document.documentElement.lang = lang;
    }
  }

  toggleLanguage(): void {
    const nextLang = this.currentLang() === 'es' ? 'en' : 'es';
    this.setLanguage(nextLang);
  }

  getCurrentCVLink(): string {
    return this.currentLang() === 'es' ? this.links.cvSpanish : this.links.cvEnglish;
  }

  t = computed(() => {
    const isEs = this.currentLang() === 'es';

    return {
      nav: {
        hero: isEs ? 'Inicio' : 'Home',
        about: isEs ? 'Sobre mí' : 'About',
        experience: isEs ? 'Experiencia' : 'Experience',
        projects: isEs ? 'Proyectos' : 'Projects',
        github: isEs ? 'GitHub' : 'GitHub',
        techStack: isEs ? 'Habilidades' : 'Skills',
        services: isEs ? 'Servicios' : 'Services',
        certifications: isEs ? 'Certificaciones' : 'Certifications',
        contact: isEs ? 'Contacto' : 'Contact',
        ctaTalk: isEs ? 'Hablemos' : "Let's Talk",
        downloadCV: isEs ? 'Descargar CV' : 'Download CV',
        downloadResume: isEs ? 'Descargar Resume (EN)' : 'Download Resume (EN)',
        downloadCerts: isEs ? 'Certificados' : 'Certificates'
      },
      hero: {
        badge: isEs
          ? 'Disponible para Proyectos & Liderazgo Técnico'
          : 'Available for Projects & Technical Leadership',
        greeting: isEs ? 'Hola, soy' : "Hello, I'm",
        name: 'Ray Sebastián Mendoza Torres',
        roleSubtitle: isEs ? 'Ingeniero de Sistemas · Desarrollador Sénior · Líder Técnico' : 'Systems Engineer · Senior Developer · Tech Lead',
        typedStrings: isEs
          ? [
              'Ingeniero de Sistemas',
              'Líder Técnico & Desarrollador Sénior',
              'Especialista en Python, JS, PHP & SQL',
              'Transformación Digital & Ciberseguridad'
            ]
          : [
              'Systems Engineer',
              'Technical Lead & Senior Developer',
              'Full-Stack Developer (Python, JS, PHP, SQL)',
              'Digital Transformation & Cybersecurity'
            ],
        bio: isEs
          ? 'Ingeniero de Sistemas con experiencia en desarrollo sénior, liderazgo técnico y transformación digital. Experto en diseñar e implementar aplicaciones web, automatización de procesos y plataformas de misión crítica.'
          : 'Systems Engineer experienced in senior development, technical leadership, and digital transformation. Specialized in designing scalable web applications, process automation, and high-impact platforms.',
        btnProjects: isEs ? 'Explorar Proyectos' : 'Explore Projects',
        btnContact: isEs ? 'Contacto Directo' : 'Direct Contact',
        btnDownloadCV: isEs ? 'Descargar CV (Español)' : 'Download Resume (English)',
        btnDownloadAlt: isEs ? 'Resume (English)' : 'CV (Español)',
        btnDownloadCerts: isEs ? 'Ver Certificados' : 'View Certificates',
        metric1Value: '3+',
        metric1Label: isEs ? 'Años Exp. TI' : 'Years IT Exp.',
        metric2Value: '7+',
        metric2Label: isEs ? 'Proyectos Core' : 'Core Projects',
        metric3Value: '100%',
        metric3Label: isEs ? 'Compromiso Ágil' : 'Agile Delivery'
      },
      about: {
        badge: isEs ? 'Perfil Profesional' : 'Professional Profile',
        title: isEs ? 'Sobre' : 'About',
        titleAccent: isEs ? 'Mí' : 'Me',
        subtitle: isEs
          ? 'Trayectoria profesional enfocada en soluciones escalables, liderazgo técnico y buenas prácticas de ingeniería.'
          : 'Professional journey focused on scalable solutions, technical leadership, and engineering best practices.',
        tabPresentation: isEs ? 'Presentación' : 'Presentation',
        tabSpecialties: isEs ? 'Áreas de Enfoque' : 'Focus Areas',
        tabValues: isEs ? 'Valores & Metodología' : 'Values & Methodology',
        tabLanguages: isEs ? 'Idiomas' : 'Languages',
        profileText: isEs
          ? 'Ingeniero de Sistemas con experiencia en desarrollo sénior, liderazgo técnico y transformación digital, participando en el diseño, desarrollo e implementación de aplicaciones web, plataformas de aprendizaje, automatización de procesos y soluciones para entidades públicas y privadas. Con conocimientos en Python, PHP, JavaScript, SQL, HTML, CSS, APIs REST, Moodle y metodologías ágiles Scrum. Orientado al desarrollo de soluciones escalables, la mejora continua y la aplicación de buenas prácticas de desarrollo seguro, arquitectura de software y trabajo colaborativo.'
          : 'Systems Engineer with experience in database digitization, web development, software programming, IT support, process automation, and digital transformation. Junior Front-End Developer with hands-on knowledge of HTML, CSS, JavaScript, Python, and modern frameworks. Experienced in developing software solutions, automating operational processes, managing IT platforms, supporting technology infrastructure, and creating technical documentation. Strong analytical and problem-solving skills, with a detail-oriented approach and a focus on delivering efficient, user-centered digital solutions. Foundational knowledge of cybersecurity principles, including ISO 27001, NIST, ethical hacking, and penetration testing, with an interest in secure application and platform development.',
        specialty1Title: isEs ? 'Desarrollo Full Stack & APIs' : 'Full Stack & APIs Development',
        specialty1Desc: isEs
          ? 'Creación de aplicaciones web con Python, JavaScript, PHP, React, Node.js y consumo/diseño de APIs REST seguras.'
          : 'Building end-to-end web apps with Python, JavaScript, PHP, React, Node.js, and designing secure RESTful APIs.',
        specialty2Title: isEs ? 'Liderazgo Técnico & Scrum' : 'Technical Leadership & Scrum',
        specialty2Desc: isEs
          ? 'Gestión de equipos bajo marcos ágiles (Daily Scrum, Sprint Planning, Code Reviews y control de versiones Git).'
          : 'Leading engineering teams under agile frameworks (Daily Scrum, Sprint Planning, Code Reviews, and Git workflows).',
        specialty3Title: isEs ? 'Automatización & Plataformas' : 'Automation & Platforms',
        specialty3Desc: isEs
          ? 'Automatización de procesos operativos, scripting en Python, personalización de Moodle y mesa de ayuda GLPI.'
          : 'Operational process automation, Python scripting, Moodle LMS customization, and GLPI service desk management.',
        specialty4Title: isEs ? 'Ciberseguridad & Buenas Prácticas' : 'Cybersecurity & Best Practices',
        specialty4Desc: isEs
          ? 'Principios ISO 27001, marco NIST, desarrollo seguro y pruebas éticas de penetración.'
          : 'ISO 27001 principles, NIST framework, secure coding practices, and ethical hacking/penetration testing fundamentals.'
      },
      experience: {
        badge: isEs ? 'Trayectoria Laboral' : 'Work History',
        title: isEs ? 'Experiencia' : 'Work',
        titleAccent: isEs ? 'Profesional' : 'Experience',
        subtitle: isEs
          ? 'Historial comprobado en desarrollo de software, liderazgo técnico y soporte a infraestructura.'
          : 'Proven track record in software engineering, technical leadership, and IT infrastructure support.'
      },
      skills: {
        badge: isEs ? 'Competencias Técnicas' : 'Technical Competencies',
        title: isEs ? 'Habilidades &' : 'Skills &',
        titleAccent: isEs ? 'Herramientas' : 'Toolbox',
        subtitle: isEs
          ? 'Dominio de lenguajes, frameworks, bases de datos, ciberseguridad y metodologías de trabajo.'
          : 'Mastery of languages, frameworks, databases, cybersecurity principles, and engineering methodologies.',
        filterAll: isEs ? 'Todas' : 'All'
      },
      projects: {
        badge: isEs ? 'Portafolio de Software' : 'Software Portfolio',
        title: isEs ? 'Proyectos' : 'Featured',
        titleAccent: isEs ? 'Destacados' : 'Projects',
        subtitle: isEs
          ? 'Productos empresariales y sistemas full-stack construidos con altos estándares de arquitectura y usabilidad.'
          : 'Enterprise products and full-stack systems built with rigorous architectural standards and high usability.',
        filterAll: isEs ? 'Todos' : 'All',
        searchPlaceholder: isEs ? 'Buscar por nombre, tecnología o stack...' : 'Search by name, technology or stack...',
        btnViewDetails: isEs ? 'Ver Detalles' : 'View Details',
        btnGithub: isEs ? 'Código' : 'Code',
        btnLiveDemo: isEs ? 'Demo / Info' : 'Demo / Info',
        modalTitle: isEs ? 'Detalle del Proyecto' : 'Project Details',
        techLabel: isEs ? 'Tecnologías utilizadas:' : 'Technologies used:'
      },
      certifications: {
        badge: isEs ? 'Acreditación Continua' : 'Continuous Accreditation',
        title: isEs ? 'Certificaciones' : 'Official',
        titleAccent: isEs ? 'Oficiales' : 'Certifications',
        subtitle: isEs
          ? 'Certificados académicos, técnicos y de ciberseguridad avalados por instituciones reconocidas.'
          : 'Academic, technical, and cybersecurity credentials accredited by recognized institutions.',
        btnDownloadAll: isEs ? 'Descargar Carpeta de Certificados' : 'Download Certificates Folder',
        btnView: isEs ? 'Abrir Certificado' : 'Open Certificate',
        hoursLabel: isEs ? 'Horas' : 'Hours',
        scoreLabel: isEs ? 'Puntaje' : 'Score'
      },
      services: {
        badge: isEs ? 'Propuesta de Valor' : 'Value Proposition',
        title: isEs ? 'Servicios' : 'Core',
        titleAccent: isEs ? 'Profesionales' : 'Services',
        subtitle: isEs
          ? 'Capacidades de consultoría, desarrollo de software y transformación digital.'
          : 'Consulting, software development, and digital transformation capabilities.'
      },
      contact: {
        badge: isEs ? 'Canal Directo' : 'Direct Channel',
        title: isEs ? 'Contacto' : 'Contact',
        titleAccent: isEs ? 'Profesional' : 'Me',
        subtitle: isEs
          ? '¿Interesado en mi perfil para liderar o colaborar en un proyecto tecnológico? Hablemos.'
          : 'Interested in my profile to lead or collaborate on a technology project? Let’s connect.',
        emailLabel: isEs ? 'Correo Electrónico' : 'Email Address',
        phoneColLabel: isEs ? 'Teléfono (Colombia)' : 'Phone (Colombia)',
        phoneEspLabel: isEs ? 'Teléfono (España)' : 'Phone (Spain)',
        linkedinLabel: 'LinkedIn',
        formTitle: isEs ? 'Envíame un Mensaje' : 'Send Me a Message',
        formSubtitle: isEs ? 'Respondo en menos de 24 horas.' : 'I will respond within 24 hours.',
        nameField: isEs ? 'Nombre Completo *' : 'Full Name *',
        namePlaceholder: isEs ? 'Tu nombre o empresa' : 'Your name or organization',
        emailField: isEs ? 'Correo Electrónico *' : 'Email Address *',
        emailPlaceholder: isEs ? 'tu.correo@ejemplo.com' : 'your.email@example.com',
        subjectField: isEs ? 'Asunto *' : 'Subject *',
        subjectPlaceholder: isEs ? 'Ej: Propuesta de Proyecto / Oferta Laboral' : 'Ex: Project Proposal / Job Opportunity',
        messageField: isEs ? 'Mensaje *' : 'Message *',
        messagePlaceholder: isEs ? 'Describe brevemente tus requerimientos o propuesta...' : 'Briefly describe your requirements or proposal...',
        btnSend: isEs ? 'Enviar Mensaje' : 'Send Message',
        sending: isEs ? 'Enviando...' : 'Sending...',
        successMsg: isEs ? '¡Mensaje enviado con éxito! Te responderé muy pronto.' : 'Message sent successfully! I will get back to you shortly.',
        downloadsTitle: isEs ? 'Documentos Descargables' : 'Downloadable Documents',
        btnCVSpain: isEs ? 'Descargar CV (Español)' : 'Download CV (Spanish)',
        btnCVEnglish: isEs ? 'Descargar Resume (Inglés)' : 'Download Resume (English)',
        btnCertificates: isEs ? 'Descargar Certificados (PDF)' : 'Download Certificates (PDF)'
      },
      footer: {
        bio: isEs
          ? 'Ingeniero de Sistemas con experiencia en desarrollo sénior, liderazgo técnico, automatización de procesos y transformación digital.'
          : 'Systems Engineer with experience in senior development, technical leadership, process automation, and digital transformation.',
        quickNav: isEs ? 'Navegación' : 'Navigation',
        statusTitle: isEs ? 'Estado Actual' : 'Current Status',
        statusDesc: isEs ? 'Disponible para nuevos retos y posiciones de alto impacto' : 'Available for new challenges and high-impact roles',
        rights: isEs ? 'Todos los derechos reservados.' : 'All rights reserved.',
        backToTop: isEs ? 'Volver arriba' : 'Back to top'
      }
    };
  });
}

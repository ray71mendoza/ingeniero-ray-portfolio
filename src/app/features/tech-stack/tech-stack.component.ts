import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Cpu, Layers, Server, Database, Shield, Terminal, Wrench, Settings, BookOpen, Globe } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { TechSkill } from '../../models/portfolio.models';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TiltDirective],
  template: `
    <section id="tech-stack" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-neon-cyan/30 text-xs font-mono text-neon-cyan">
            <lucide-icon [img]="CpuIcon" class="w-3.5 h-3.5"></lucide-icon>
            <span>{{ ts.t().skills.badge }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {{ ts.t().skills.title }} <span class="text-gradient-cyan">{{ ts.t().skills.titleAccent }}</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {{ ts.t().skills.subtitle }}
          </p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          @for (cat of categoryOptions(); track cat.key) {
            <button 
              (click)="selectedCategoryKey.set(cat.key)"
              class="px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300"
              [class.bg-gradient-to-r]="selectedCategoryKey() === cat.key"
              [class.from-neon-cyan]="selectedCategoryKey() === cat.key"
              [class.to-neon-purple]="selectedCategoryKey() === cat.key"
              [class.text-gray-950]="selectedCategoryKey() === cat.key"
              [class.font-bold]="selectedCategoryKey() === cat.key"
              [class.shadow-[0_0_15px_rgba(0,242,254,0.3)]]="selectedCategoryKey() === cat.key"
              [class.glass-panel]="selectedCategoryKey() !== cat.key"
              [class.text-gray-400]="selectedCategoryKey() !== cat.key">
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Tech Matrix Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          @for (tech of filteredSkills(); track tech.name) {
            
            <div appTilt [maxTilt]="12" class="relative group cursor-pointer">
              <div class="glass-panel p-4 rounded-2xl border border-cyber-border-dark group-hover:border-neon-cyan/60 transition-all duration-300 text-center space-y-3 relative overflow-hidden bg-cyber-dark/85 h-full flex flex-col justify-between">
                
                <!-- Glowing Top Accent Line -->
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <!-- Skill Icon Badge -->
                <div class="w-12 h-12 rounded-xl bg-cyber-dark border border-cyber-border-dark group-hover:border-neon-cyan/40 group-hover:scale-110 flex items-center justify-center mx-auto transition-all duration-300 shadow-md">
                  <span class="font-extrabold text-sm font-mono text-neon-cyan">{{ getBadgeLetters(tech.name) }}</span>
                </div>

                <!-- Name & Level -->
                <div class="space-y-1">
                  <h4 class="font-bold text-xs text-gray-200 group-hover:text-neon-cyan transition-colors truncate" [title]="tech.name">
                    {{ tech.name }}
                  </h4>

                  <!-- Glowing Progress Bar -->
                  <div class="w-full bg-cyber-dark h-1.5 rounded-full overflow-hidden border border-cyber-border-dark">
                    <div 
                      class="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full transition-all duration-1000"
                      [style.width]="tech.level + '%'">
                    </div>
                  </div>

                  <div class="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1">
                    <span>{{ ts.currentLang() === 'es' ? 'Nivel' : 'Level' }}</span>
                    <span class="text-neon-cyan font-bold">{{ tech.level }}%</span>
                  </div>
                </div>

                <!-- Hover Floating Tooltip Modal Info -->
                <div class="absolute inset-0 bg-cyber-dark/95 backdrop-blur-md p-3 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col justify-center text-left transition-opacity duration-300 pointer-events-none z-20">
                  <span class="text-[10px] font-mono text-neon-cyan font-bold uppercase">
                    {{ ts.currentLang() === 'es' ? tech.categoryEs : tech.categoryEn }}
                  </span>
                  <h5 class="text-xs font-bold text-gray-100 mt-0.5">{{ tech.name }}</h5>
                  <p class="text-[10px] text-gray-300 leading-tight mt-1">
                    {{ ts.currentLang() === 'es' ? tech.descriptionEs : tech.descriptionEn }}
                  </p>
                </div>

              </div>
            </div>

          }
        </div>

      </div>
    </section>
  `
})
export class TechStackComponent {
  ts = inject(TranslationService);

  readonly CpuIcon = Cpu;

  selectedCategoryKey = signal<string>('all');

  categoryOptions = computed(() => {
    const isEs = this.ts.currentLang() === 'es';
    return [
      { key: 'all', label: isEs ? 'Todas' : 'All' },
      { key: 'programming', label: isEs ? 'Programación' : 'Programming' },
      { key: 'web', label: isEs ? 'Desarrollo Web' : 'Web Dev' },
      { key: 'databases', label: isEs ? 'Bases de Datos' : 'Databases' },
      { key: 'automation', label: isEs ? 'Automatización' : 'Automation' },
      { key: 'cybersecurity', label: isEs ? 'Ciberseguridad' : 'Cybersecurity' },
      { key: 'systems', label: isEs ? 'Sistemas & Redes' : 'Systems & Networks' },
      { key: 'tools', label: isEs ? 'Herramientas' : 'Tools' },
      { key: 'methodologies', label: isEs ? 'Metodologías' : 'Methodologies' },
      { key: 'platforms', label: isEs ? 'Plataformas' : 'Platforms' },
      { key: 'support', label: isEs ? 'Soporte TI' : 'IT Support' },
      { key: 'languages', label: isEs ? 'Idiomas' : 'Languages' }
    ];
  });

  readonly skillsList: TechSkill[] = [
    // Programación
    {
      name: 'Python',
      categoryEs: 'Programación',
      categoryEn: 'Programming',
      categoryKey: 'programming',
      level: 95,
      icon: 'python',
      color: '#3776AB',
      descriptionEs: 'Scripting avanzado, análisis y extracción de datos, automatización y desarrollo backend.',
      descriptionEn: 'Advanced scripting, data extraction & analysis, automation, and backend programming.'
    },
    {
      name: 'JavaScript',
      categoryEs: 'Programación',
      categoryEn: 'Programming',
      categoryKey: 'programming',
      level: 92,
      icon: 'javascript',
      color: '#F7DF1E',
      descriptionEs: 'Desarrollo Frontend y Backend (Node.js), manipulación del DOM, ES6+ y lógica asíncrona.',
      descriptionEn: 'Frontend and Backend (Node.js) development, DOM manipulation, ES6+, and async logic.'
    },
    {
      name: 'PHP',
      categoryEs: 'Programación',
      categoryEn: 'Programming',
      categoryKey: 'programming',
      level: 90,
      icon: 'php',
      color: '#777BB4',
      descriptionEs: 'Desarrollo web backend, módulos y personalización avanzada de Moodle y APIs REST.',
      descriptionEn: 'Backend web engineering, custom Moodle modules/plugins, and RESTful web services.'
    },
    {
      name: 'HTML5 & CSS3',
      categoryEs: 'Programación',
      categoryEn: 'Programming',
      categoryKey: 'programming',
      level: 95,
      icon: 'html',
      color: '#E34F26',
      descriptionEs: 'Maquetación semántica, accesibilidad web, diseño responsive y estilos modernos.',
      descriptionEn: 'Semantic markup, web accessibility, responsive layouts, and modern CSS styling.'
    },

    // Desarrollo Web
    {
      name: 'React.js',
      categoryEs: 'Desarrollo Web',
      categoryEn: 'Web Development',
      categoryKey: 'web',
      level: 90,
      icon: 'react',
      color: '#61DAFB',
      descriptionEs: 'Componentes funcionales, hooks, gestión de estado y Single Page Applications.',
      descriptionEn: 'Functional components, hooks, state management, and Single Page Applications.'
    },
    {
      name: 'Node.js',
      categoryEs: 'Desarrollo Web',
      categoryEn: 'Web Development',
      categoryKey: 'web',
      level: 88,
      icon: 'nodejs',
      color: '#339933',
      descriptionEs: 'Creación de servidores web, middlewares, microservicios y backend en JavaScript.',
      descriptionEn: 'Web servers, middlewares, microservices, and server-side JavaScript architecture.'
    },
    {
      name: 'APIs REST',
      categoryEs: 'Desarrollo Web',
      categoryEn: 'Web Development',
      categoryKey: 'web',
      level: 95,
      icon: 'api',
      color: '#00F2FE',
      descriptionEs: 'Diseño, implementación y consumo de APIs RESTful para interoperabilidad entre sistemas.',
      descriptionEn: 'Design, implementation, and consumption of RESTful APIs for cross-platform integration.'
    },

    // Bases de Datos
    {
      name: 'SQL',
      categoryEs: 'Bases de Datos',
      categoryEn: 'Databases',
      categoryKey: 'databases',
      level: 92,
      icon: 'sql',
      color: '#4479A1',
      descriptionEs: 'Consultas complejas, procedimientos almacenados, optimización de queries y normalización.',
      descriptionEn: 'Complex querying, stored procedures, query tuning, optimization, and normalization.'
    },
    {
      name: 'MySQL',
      categoryEs: 'Bases de Datos',
      categoryEn: 'Databases',
      categoryKey: 'databases',
      level: 90,
      icon: 'mysql',
      color: '#4479A1',
      descriptionEs: 'Administración de bases de datos relacionales, mantenimiento, backups y transacciones ACID.',
      descriptionEn: 'Relational database administration, maintenance, backups, and ACID transactions.'
    },
    {
      name: 'PostgreSQL',
      categoryEs: 'Bases de Datos',
      categoryEn: 'Databases',
      categoryKey: 'databases',
      level: 88,
      icon: 'postgresql',
      color: '#4169E1',
      descriptionEs: 'Modelado relacional, indexación, funciones avanzadas y persistencia enterprise.',
      descriptionEn: 'Relational modeling, indexing, advanced stored functions, and enterprise persistence.'
    },

    // Automatización
    {
      name: 'Python Scripting',
      categoryEs: 'Automatización',
      categoryEn: 'Automation',
      categoryKey: 'automation',
      level: 95,
      icon: 'python-script',
      color: '#3776AB',
      descriptionEs: 'Scripts autónomos para extracción de datos, procesamiento masivo y tareas programadas.',
      descriptionEn: 'Autonomous scripts for data extraction, bulk processing, and scheduled tasks.'
    },
    {
      name: 'Automatización de Procesos',
      categoryEs: 'Automatización',
      categoryEn: 'Automation',
      categoryKey: 'automation',
      level: 92,
      icon: 'workflow',
      color: '#00E5FF',
      descriptionEs: 'Optimización de flujos operativos y tareas repetitivas para reducir tiempos de ejecución.',
      descriptionEn: 'Optimizing operational workflows and repetitive tasks to maximize efficiency.'
    },

    // Herramientas
    {
      name: 'Git',
      categoryEs: 'Herramientas',
      categoryEn: 'Tools',
      categoryKey: 'tools',
      level: 92,
      icon: 'git',
      color: '#F05032',
      descriptionEs: 'Control de versiones, ramificación GitFlow, resolución de conflictos y commits limpios.',
      descriptionEn: 'Version control, GitFlow branching models, conflict resolution, and clean history.'
    },
    {
      name: 'GitHub',
      categoryEs: 'Herramientas',
      categoryEn: 'Tools',
      categoryKey: 'tools',
      level: 92,
      icon: 'github',
      color: '#181717',
      descriptionEs: 'Gestión de repositorios, Pull Requests, Code Reviews y flujos de trabajo en equipo.',
      descriptionEn: 'Repository management, Pull Requests, Code Reviews, and team collaboration workflows.'
    },
    {
      name: 'GLPI',
      categoryEs: 'Herramientas',
      categoryEn: 'Tools',
      categoryKey: 'tools',
      level: 90,
      icon: 'glpi',
      color: '#FF6B00',
      descriptionEs: 'Administración de mesa de ayuda, gestión de incidentes, inventario TI y cumplimiento de SLA.',
      descriptionEn: 'IT Service Desk administration, incident tracking, IT asset inventory, and SLA management.'
    },

    // Sistemas y Redes
    {
      name: 'Windows',
      categoryEs: 'Sistemas & Redes',
      categoryEn: 'Systems & Networks',
      categoryKey: 'systems',
      level: 92,
      icon: 'windows',
      color: '#0078D6',
      descriptionEs: 'Administración de sistemas operativos Windows Server y cliente, configuración y soporte.',
      descriptionEn: 'Windows Server and Client OS administration, system provisioning, and support.'
    },
    {
      name: 'Linux',
      categoryEs: 'Sistemas & Redes',
      categoryEn: 'Systems & Networks',
      categoryKey: 'systems',
      level: 88,
      icon: 'linux',
      color: '#FCC624',
      descriptionEs: 'Entornos de servidor Linux, terminal CLI, administración de permisos y servicios.',
      descriptionEn: 'Linux server environments, CLI navigation, service orchestration, and security permissions.'
    },
    {
      name: 'Cisco (Config. Básica)',
      categoryEs: 'Sistemas & Redes',
      categoryEn: 'Systems & Networks',
      categoryKey: 'systems',
      level: 85,
      icon: 'cisco',
      color: '#1BA0D7',
      descriptionEs: 'Configuración básica y automatización de routers y switches mediante scripting.',
      descriptionEn: 'Basic network configuration and automated provisioning of routers/switches via scripting.'
    },

    // Ciberseguridad
    {
      name: 'ISO 27001',
      categoryEs: 'Ciberseguridad',
      categoryEn: 'Cybersecurity',
      categoryKey: 'cybersecurity',
      level: 88,
      icon: 'iso',
      color: '#00E599',
      descriptionEs: 'Fundamentos del Sistema de Gestión de Seguridad de la Información (SGSI) y controles.',
      descriptionEn: 'Information Security Management System (ISMS) fundamentals and security controls.'
    },
    {
      name: 'Marco NIST',
      categoryEs: 'Ciberseguridad',
      categoryEn: 'Cybersecurity',
      categoryKey: 'cybersecurity',
      level: 85,
      icon: 'nist',
      color: '#00B4D8',
      descriptionEs: 'Directrices de ciberseguridad para identificación, protección, detección y respuesta.',
      descriptionEn: 'Cybersecurity framework for identify, protect, detect, respond, and recover.'
    },
    {
      name: 'Ethical Hacking',
      categoryEs: 'Ciberseguridad',
      categoryEn: 'Cybersecurity',
      categoryKey: 'cybersecurity',
      level: 88,
      icon: 'hacking',
      color: '#FF0055',
      descriptionEs: 'Análisis de vulnerabilidades, escaneo de seguridad y mitigación de amenazas.',
      descriptionEn: 'Vulnerability assessment, security scanning, and threat surface mitigation.'
    },
    {
      name: 'Pentesting',
      categoryEs: 'Ciberseguridad',
      categoryEn: 'Cybersecurity',
      categoryKey: 'cybersecurity',
      level: 85,
      icon: 'pentesting',
      color: '#9D4EDD',
      descriptionEs: 'Pruebas de intrusión éticas y remediación de brechas en aplicaciones y redes.',
      descriptionEn: 'Ethical intrusion testing and remediation of security gaps in applications and networks.'
    },

    // Soporte TI
    {
      name: 'Troubleshooting TI',
      categoryEs: 'Soporte TI',
      categoryEn: 'IT Support',
      categoryKey: 'support',
      level: 95,
      icon: 'troubleshoot',
      color: '#FFB703',
      descriptionEs: 'Diagnóstico rápido y resolución de problemas de hardware, software y conectividad.',
      descriptionEn: 'Rapid diagnostics and root cause resolution for hardware, software, and network issues.'
    },
    {
      name: 'Soporte Técnico',
      categoryEs: 'Soporte TI',
      categoryEn: 'IT Support',
      categoryKey: 'support',
      level: 95,
      icon: 'support',
      color: '#2A9D8F',
      descriptionEs: 'Mantenimiento preventivo/correctivo, atención a usuarios y asistencia remota/presencial.',
      descriptionEn: 'Preventive and corrective maintenance, end-user assistance, remote and on-site support.'
    },

    // Metodologías
    {
      name: 'Scrum / Agile',
      categoryEs: 'Metodologías',
      categoryEn: 'Methodologies',
      categoryKey: 'methodologies',
      level: 95,
      icon: 'scrum',
      color: '#06D6A0',
      descriptionEs: 'Gestión ágil de proyectos, sprint planning, daily meetings y liderazgo técnico de equipo.',
      descriptionEn: 'Agile project delivery, sprint planning, daily standups, and technical team leadership.'
    },
    {
      name: 'ITIL',
      categoryEs: 'Metodologías',
      categoryEn: 'Methodologies',
      categoryKey: 'methodologies',
      level: 85,
      icon: 'itil',
      color: '#118AB2',
      descriptionEs: 'Mejores prácticas para la gestión de servicios de tecnología de la información.',
      descriptionEn: 'Best practice framework for Information Technology Service Management (ITSM).'
    },

    // Plataformas
    {
      name: 'Moodle LMS',
      categoryEs: 'Plataformas',
      categoryEn: 'Platforms',
      categoryKey: 'platforms',
      level: 92,
      icon: 'moodle',
      color: '#F98012',
      descriptionEs: 'Desarrollo, personalización, administración de entornos virtuales y automatización.',
      descriptionEn: 'Development, custom theming, virtual learning environment administration, and automation.'
    },

    // Idiomas
    {
      name: 'Español (Nativo)',
      categoryEs: 'Idiomas',
      categoryEn: 'Languages',
      categoryKey: 'languages',
      level: 100,
      icon: 'es',
      color: '#FFD166',
      descriptionEs: 'Lengua materna. Comunicación técnica, redacción de documentación y liderazgo.',
      descriptionEn: 'Native speaker. Full professional fluency in technical communication and leadership.'
    },
    {
      name: 'Inglés (B1 - Intermedio)',
      categoryEs: 'Idiomas',
      categoryEn: 'Languages',
      categoryKey: 'languages',
      level: 70,
      icon: 'en',
      color: '#EF476F',
      descriptionEs: 'Comprensión y redacción técnica, lectura de manuales y comunicación profesional.',
      descriptionEn: 'Intermediate proficiency (B1): technical reading/writing and professional interaction.'
    }
  ];

  filteredSkills(): TechSkill[] {
    const key = this.selectedCategoryKey();
    if (key === 'all') return this.skillsList;
    return this.skillsList.filter(s => s.categoryKey === key);
  }

  getBadgeLetters(name: string): string {
    const clean = name.replace(/[^a-zA-Z]/g, '');
    return clean.slice(0, 3).toUpperCase();
  }
}

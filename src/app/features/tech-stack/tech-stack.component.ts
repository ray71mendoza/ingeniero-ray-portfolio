import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Cpu, Layers, Server, Database, Cloud, Layout, CheckCircle2, Shield, Sparkles } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { TechSkill } from '../../models/portfolio.models';

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
            <span>Dominio Tecnológico</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Stack & <span class="text-gradient-cyan">Herramientas</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Matriz de competencias avanzadas con nivel de dominio, rotación 3D e información interactiva al pasar el puntero.
          </p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          @for (cat of categories; track cat) {
            <button 
              (click)="selectedCategory.set(cat)"
              class="px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300"
              [class.bg-gradient-to-r]="selectedCategory() === cat"
              [class.from-neon-cyan]="selectedCategory() === cat"
              [class.to-neon-purple]="selectedCategory() === cat"
              [class.text-gray-950]="selectedCategory() === cat"
              [class.font-bold]="selectedCategory() === cat"
              [class.shadow-[0_0_15px_rgba(0,242,254,0.3)]]="selectedCategory() === cat"
              [class.glass-panel]="selectedCategory() !== cat"
              [class.text-gray-400]="selectedCategory() !== cat">
              {{ cat }}
            </button>
          }
        </div>

        <!-- Tech Matrix Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          @for (tech of filteredSkills(); track tech.name) {
            
            <div appTilt [maxTilt]="15" class="relative group cursor-pointer">
              <div class="glass-panel p-4 rounded-2xl border border-cyber-border-dark group-hover:border-neon-cyan/60 transition-all duration-300 text-center space-y-3 relative overflow-hidden bg-cyber-dark/80">
                
                <!-- Glowing Top Accent Line -->
                <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <!-- Skill Icon Badge -->
                <div class="w-12 h-12 rounded-xl bg-cyber-dark border border-cyber-border-dark group-hover:border-neon-cyan/40 group-hover:scale-110 flex items-center justify-center mx-auto transition-all duration-300 shadow-md">
                  <span class="font-extrabold text-sm font-mono text-neon-cyan">{{ tech.name.substring(0, 3).toUpperCase() }}</span>
                </div>

                <!-- Name & Level -->
                <div class="space-y-1">
                  <h4 class="font-bold text-xs text-gray-200 group-hover:text-neon-cyan transition-colors truncate">
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
                    <span>Dominio</span>
                    <span class="text-neon-cyan font-bold">{{ tech.level }}%</span>
                  </div>
                </div>

                <!-- Hover Floating Tooltip Modal Info -->
                <div class="absolute inset-0 bg-cyber-dark/95 backdrop-blur-md p-3 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col justify-center text-left transition-opacity duration-300 pointer-events-none z-20">
                  <span class="text-[10px] font-mono text-neon-cyan font-bold uppercase">{{ tech.category }}</span>
                  <h5 class="text-xs font-bold text-gray-100">{{ tech.name }}</h5>
                  <p class="text-[10px] text-gray-400 leading-tight mt-1">{{ tech.description }}</p>
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
  readonly CpuIcon = Cpu;

  selectedCategory = signal<string>('Todos');

  readonly categories = ['Todos', 'Frontend', 'Backend', 'Databases', 'DevOps', 'CMS', 'Testing', 'AI'];

  readonly skillsList: TechSkill[] = [
    // Frontend
    { name: 'Angular 20+', category: 'Frontend', level: 98, icon: 'angular', color: '#DD0031', description: 'Framework primario. Standalone, Signals, Control Flow, SSR y RxJS.' },
    { name: 'TypeScript', category: 'Frontend', level: 96, icon: 'typescript', color: '#3178C6', description: 'Tipado estricto, genéricos, decoradores e interfaces sólidas.' },
    { name: 'RxJS', category: 'Frontend', level: 94, icon: 'rxjs', color: '#B7178C', description: 'Programación reactiva, observables, operadores e inmunidad a memory leaks.' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 95, icon: 'tailwind', color: '#06B6D4', description: 'Diseño ultra-rápido, CSS custom properties y micro-interacciones.' },
    { name: 'SCSS / CSS3', category: 'Frontend', level: 92, icon: 'sass', color: '#CC6699', description: 'Variables SCSS, mixins, flexbox, CSS Grid y glassmorphism.' },
    { name: 'JavaScript ES6+', category: 'Frontend', level: 96, icon: 'javascript', color: '#F7DF1E', description: 'Async/Await, Closures, Proxy, Event Loop y manipulaciones DOM de alto FPS.' },
    { name: 'React & Next.js', category: 'Frontend', level: 88, icon: 'react', color: '#61DAFB', description: 'Desarrollo de componentes funcionales y SSR con Next.js App Router.' },
    { name: 'Three.js & GSAP', category: 'Frontend', level: 85, icon: 'three', color: '#00F2FE', description: 'Animaciones 3D en Canvas WebGL y secuencias avanzadas en scroll.' },
    
    // Backend
    { name: 'Node.js & Express', category: 'Backend', level: 92, icon: 'nodejs', color: '#339933', description: 'Microservicios asincrónicos RESTful, WebSockets y Express API.' },
    { name: 'Python & FastAPI', category: 'Backend', level: 90, icon: 'python', color: '#3776AB', description: 'APIs ultra-rápidas con comprobación Pydantic y soporte asincrónico.' },
    { name: 'PHP & Laravel', category: 'Backend', level: 86, icon: 'laravel', color: '#FF2D20', description: 'Arquitectura MVC, ORM Eloquent, Blade y servicios REST.' },
    { name: 'REST APIs & JWT', category: 'Backend', level: 96, icon: 'api', color: '#00F2FE', description: 'Autenticación stateless con tokens JWT, OAuth2 y límites de tasa.' },

    // Databases
    { name: 'PostgreSQL', category: 'Databases', level: 90, icon: 'postgresql', color: '#4169E1', description: 'Consultas relacionales complejas, indexación B-Tree y JSONB.' },
    { name: 'MySQL / MariaDB', category: 'Databases', level: 92, icon: 'mysql', color: '#4479A1', description: 'Procedimientos almacenados, transacciones ACID y optimización de queries.' },
    { name: 'MongoDB', category: 'Databases', level: 88, icon: 'mongodb', color: '#47A248', description: 'Bases de datos no relacionales de alto rendimiento con Mongoose.' },
    { name: 'Redis', category: 'Databases', level: 85, icon: 'redis', color: '#DC382D', description: 'Caché en memoria de sub-milisegundo y colas de trabajo Pub/Sub.' },

    // DevOps & Cloud
    { name: 'Docker', category: 'DevOps', level: 88, icon: 'docker', color: '#2496ED', description: 'Contenerización de aplicaciones frontend y backend multi-stage.' },
    { name: 'Git & GitHub Actions', category: 'DevOps', level: 95, icon: 'git', color: '#F05032', description: 'Pipelines CI/CD automatizados, linter, tests y deploys automáticos.' },
    { name: 'Linux / Ubuntu', category: 'DevOps', level: 90, icon: 'linux', color: '#FCC624', description: 'Administración de servidores Linux CLI, SSH y bash scripts.' },
    { name: 'Vercel & AWS', category: 'DevOps', level: 92, icon: 'aws', color: '#FF9900', description: 'Despliegue serverless, S3, CloudFront y Vercel Edge Network.' },

    // CMS
    { name: 'WordPress & Moodle', category: 'CMS', level: 88, icon: 'wordpress', color: '#21759B', description: 'Desarrollo de temas custom, plugins PHP e integración Headless CMS.' },

    // Testing
    { name: 'Jest, Karma & Playwright', category: 'Testing', level: 88, icon: 'jest', color: '#C21325', description: 'Pruebas unitarias de componentes, mocks de servicios y e2e e2e.' },

    // AI
    { name: 'Cursor AI, Copilot & OpenAI API', category: 'AI', level: 95, icon: 'ai', color: '#7000FF', description: 'Integración de modelos LLM, ingeniería de prompts e IA agentica.' }
  ];

  filteredSkills(): TechSkill[] {
    const cat = this.selectedCategory();
    if (cat === 'Todos') return this.skillsList;
    return this.skillsList.filter(s => s.category === cat);
  }
}

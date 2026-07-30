import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, FolderGit2, Search, ExternalLink, Github, Eye, X, Sparkles, Layers } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, GlassCardComponent, TiltDirective],
  template: `
    <section id="projects" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Section Header -->
        <div class="text-center space-y-4 mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-neon-cyan/30 text-xs font-mono text-neon-cyan">
            <lucide-icon [img]="FolderIcon" class="w-3.5 h-3.5"></lucide-icon>
            <span>Portafolio de Trabajo</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Proyectos <span class="text-gradient-cyan">Destacados</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Selección de sistemas de producción desarrollados con Angular 20+, arquitecturas en la nube y diseño de alta fidelidad.
          </p>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          <!-- Category Filter Pills -->
          <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
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

          <!-- Search Input Bar -->
          <div class="relative w-full md:w-72">
            <input 
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Buscar por tecnología o título..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel border border-cyber-border-dark text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-colors" />
            <lucide-icon [img]="SearchIcon" class="w-4 h-4 text-gray-400 absolute left-3.5 top-3"></lucide-icon>
          </div>

        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (proj of filteredProjects(); track proj.id) {
            
            <div appTilt [maxTilt]="8" class="h-full">
              <app-glass-card className="h-full flex flex-col justify-between space-y-4 group border border-cyber-border-dark hover:border-neon-cyan/50 transition-all duration-300">
                
                <!-- Project Image Preview -->
                <div class="relative h-48 rounded-xl overflow-hidden bg-cyber-dark">
                  <img 
                    [src]="proj.imageUrl" 
                    [alt]="proj.title" 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  
                  <div class="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-80"></div>
                  
                  <!-- Category Tag -->
                  <div class="absolute top-3 left-3 px-3 py-1 rounded-full bg-cyber-dark/80 backdrop-blur-md border border-neon-cyan/30 text-[10px] font-mono text-neon-cyan">
                    {{ proj.category }}
                  </div>

                  <!-- Hover Action Buttons -->
                  <div class="absolute inset-0 bg-cyber-dark/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                    <button (click)="openProjectModal(proj)" class="w-10 h-10 rounded-full bg-neon-cyan text-gray-950 flex items-center justify-center hover:scale-110 transition-transform">
                      <lucide-icon [img]="EyeIcon" class="w-5 h-5"></lucide-icon>
                    </button>
                    @if (proj.demoUrl) {
                      <a [href]="proj.demoUrl" target="_blank" class="w-10 h-10 rounded-full bg-neon-purple text-white flex items-center justify-center hover:scale-110 transition-transform">
                        <lucide-icon [img]="ExternalIcon" class="w-5 h-5"></lucide-icon>
                      </a>
                    }
                  </div>
                </div>

                <!-- Content Info -->
                <div class="space-y-3 flex-1">
                  <h3 class="text-xl font-bold text-gray-100 group-hover:text-neon-cyan transition-colors">
                    {{ proj.title }}
                  </h3>
                  <p class="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {{ proj.description }}
                  </p>
                </div>

                <!-- Technologies Badges -->
                <div class="flex flex-wrap gap-1.5 pt-2">
                  @for (tech of proj.technologies; track tech) {
                    <span class="px-2 py-0.5 rounded bg-cyber-dark border border-cyber-border-dark text-[10px] font-mono text-gray-300">
                      {{ tech }}
                    </span>
                  }
                </div>

                <!-- Footer Links -->
                <div class="pt-4 border-t border-cyber-border-dark flex items-center justify-between">
                  <a [href]="proj.githubUrl" target="_blank" class="text-xs font-mono text-gray-400 hover:text-neon-cyan flex items-center gap-1.5 transition-colors">
                    <lucide-icon [img]="GithubIcon" class="w-4 h-4"></lucide-icon>
                    GitHub Code
                  </a>

                  @if (proj.demoUrl) {
                    <a [href]="proj.demoUrl" target="_blank" class="text-xs font-mono text-neon-cyan hover:underline flex items-center gap-1">
                      <span>Live Demo</span>
                      <lucide-icon [img]="ExternalIcon" class="w-3.5 h-3.5"></lucide-icon>
                    </a>
                  }
                </div>

              </app-glass-card>
            </div>

          }
        </div>

        <!-- Project Detail Modal -->
        @if (selectedModalProject()) {
          <div class="fixed inset-0 z-50 bg-cyber-dark/80 backdrop-blur-md flex items-center justify-center p-4">
            <div class="max-w-2xl w-full glass-panel border border-neon-cyan/40 p-6 sm:p-8 rounded-3xl space-y-6 animate-in fade-in zoom-in duration-300 relative max-h-[90vh] overflow-y-auto">
              
              <button (click)="selectedModalProject.set(null)" class="absolute top-4 right-4 w-8 h-8 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-neon-cyan">
                <lucide-icon [img]="XIcon" class="w-5 h-5"></lucide-icon>
              </button>

              <div class="space-y-2">
                <span class="px-3 py-1 rounded-full text-xs font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                  {{ selectedModalProject()?.category }}
                </span>
                <h3 class="text-2xl sm:text-3xl font-extrabold text-gray-100">
                  {{ selectedModalProject()?.title }}
                </h3>
              </div>

              <img [src]="selectedModalProject()?.imageUrl" [alt]="selectedModalProject()?.title" class="w-full h-64 object-cover rounded-2xl border border-cyber-border-dark" />

              <p class="text-sm text-gray-300 leading-relaxed">
                {{ selectedModalProject()?.longDescription || selectedModalProject()?.description }}
              </p>

              <!-- Metrics -->
              @if (selectedModalProject()?.metrics) {
                <div class="grid grid-cols-2 gap-3 pt-2">
                  @for (metric of selectedModalProject()?.metrics; track metric.label) {
                    <div class="p-3 rounded-xl bg-cyber-dark border border-cyber-border-dark">
                      <div class="text-lg font-bold text-neon-cyan font-mono">{{ metric.value }}</div>
                      <div class="text-[11px] text-gray-400 font-mono uppercase">{{ metric.label }}</div>
                    </div>
                  }
                </div>
              }

              <div class="flex items-center gap-4 pt-4 border-t border-cyber-border-dark">
                <a [href]="selectedModalProject()?.githubUrl" target="_blank" class="px-5 py-2.5 rounded-xl bg-cyber-dark border border-cyber-border-dark text-xs font-bold text-gray-200 flex items-center gap-2 hover:border-neon-cyan">
                  <lucide-icon [img]="GithubIcon" class="w-4 h-4"></lucide-icon>
                  Ver en GitHub
                </a>
                @if (selectedModalProject()?.demoUrl) {
                  <a [href]="selectedModalProject()?.demoUrl" target="_blank" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-gray-950 text-xs font-extrabold flex items-center gap-2 shadow-neon-cyan">
                    <lucide-icon [img]="ExternalIcon" class="w-4 h-4"></lucide-icon>
                    Ver Demo en Vivo
                  </a>
                }
              </div>

            </div>
          </div>
        }

      </div>
    </section>
  `
})
export class ProjectsComponent {
  readonly FolderIcon = FolderGit2;
  readonly SearchIcon = Search;
  readonly ExternalIcon = ExternalLink;
  readonly GithubIcon = Github;
  readonly EyeIcon = Eye;
  readonly XIcon = X;

  selectedCategory = signal<string>('Todos');
  searchQuery = signal<string>('');
  selectedModalProject = signal<Project | null>(null);

  readonly categories = ['Todos', 'Fullstack', 'Frontend', 'Backend', 'Architecture', 'AI & Cloud'];

  readonly projectsList: Project[] = [
    {
      id: 'p1',
      title: 'Enterprise Cyber Cloud Dashboard',
      category: 'Architecture',
      description: 'Panel de monitoreo de microservicios en tiempo real con Angular 20+, RxJS WebSocket stream y Three.js 3D metrics.',
      longDescription: 'Sistema de telemetría de alta escala diseñado para visualizar métricas de rendimiento en clústeres Kubernetes, uso de memoria, eventos de seguridad OWASP y flujo de datos de microservicios con latencia <10ms.',
      technologies: ['Angular 20', 'Signals', 'Three.js', 'RxJS', 'Tailwind CSS', 'Docker'],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      githubUrl: 'https://github.com',
      demoUrl: 'https://demo.example.com',
      featured: true,
      metrics: [
        { label: 'Latency', value: '< 8ms' },
        { label: 'Uptime', value: '99.99%' }
      ]
    },
    {
      id: 'p2',
      title: 'AI Automated Code Auditor',
      category: 'AI & Cloud',
      description: 'Plataforma de auditoría estática de código utilizando modelos de IA (OpenAI API / DeepSeek) integrada en GitHub Actions.',
      longDescription: 'Herramienta de análisis estático que evalúa Pull Requests en búsqueda de deuda técnica, vulnerabilidades OWASP, patrones antipatrón y sugiere optimizaciones de código en TypeScript y Python de forma autónoma.',
      technologies: ['TypeScript', 'Node.js', 'OpenAI API', 'Python', 'GitHub Actions'],
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      githubUrl: 'https://github.com',
      demoUrl: 'https://ai-auditor.example.com',
      featured: true,
      metrics: [
        { label: 'Audit Speed', value: '3.5s / PR' },
        { label: 'Accuracy', value: '98.4%' }
      ]
    },
    {
      id: 'p3',
      title: 'Ultra Fast E-Commerce Engine',
      category: 'Fullstack',
      description: 'E-commerce SSR ultrapotente con carga sub-segunda, pasarela Stripe/PayPal e inventario en tiempo real.',
      longDescription: 'Arquitectura desacoplada basada en Angular SSR, GraphQL y Node.js con soporte PWA offline, caché distribuido Redis y optimización de imágenes Lighthouse 100/100.',
      technologies: ['Angular SSR', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe API'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      githubUrl: 'https://github.com',
      demoUrl: 'https://shop.example.com',
      featured: true,
      metrics: [
        { label: 'Lighthouse Score', value: '100 / 100' },
        { label: 'Conversion Boost', value: '+42%' }
      ]
    }
  ];

  filteredProjects = computed(() => {
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.projectsList.filter(p => {
      const matchesCategory = cat === 'Todos' || p.category === cat;
      const matchesQuery = !query || 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.technologies.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  });

  openProjectModal(project: Project): void {
    this.selectedModalProject.set(project);
  }
}

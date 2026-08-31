import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Github, Star, GitFork, BookOpen, Users, Code, ExternalLink } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { GithubRepoInfo } from '../../models/portfolio.models';
import { GithubService } from '../../core/services/github.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GlassCardComponent],
  template: `
    <section id="github" class="py-20 relative bg-cyber-dark/50">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-neon-purple/30 text-xs font-mono text-neon-purple">
            <lucide-icon [img]="GithubIcon" class="w-3.5 h-3.5"></lucide-icon>
            <span>{{ ts.currentLang() === 'es' ? 'Open Source & Repositorios' : 'Open Source & Repositories' }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {{ ts.currentLang() === 'es' ? 'Actividad en' : 'Activity on' }} <span class="text-gradient-purple">GitHub</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {{ ts.currentLang() === 'es' 
              ? 'Integración con repositorios de código y métricas de desarrollo.' 
              : 'Integration with software repositories and engineering metrics.' }}
          </p>
        </div>

        <!-- GitHub Summary Stat Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          
          <app-glass-card className="space-y-1 text-center border-cyber-border-dark bg-cyber-dark/80">
            <lucide-icon [img]="BookIcon" class="w-6 h-6 text-neon-cyan mx-auto mb-2"></lucide-icon>
            <div class="text-2xl sm:text-3xl font-extrabold font-mono text-gray-100">{{ reposCount() }}</div>
            <div class="text-xs text-gray-400 font-mono uppercase tracking-wider">
              {{ ts.currentLang() === 'es' ? 'Repositorios' : 'Repositories' }}
            </div>
          </app-glass-card>

          <app-glass-card className="space-y-1 text-center border-cyber-border-dark bg-cyber-dark/80">
            <lucide-icon [img]="StarIcon" class="w-6 h-6 text-amber-400 mx-auto mb-2"></lucide-icon>
            <div class="text-2xl sm:text-3xl font-extrabold font-mono text-gray-100">{{ totalStars() }}</div>
            <div class="text-xs text-gray-400 font-mono uppercase tracking-wider">
              {{ ts.currentLang() === 'es' ? 'Estrellas' : 'Stars' }}
            </div>
          </app-glass-card>

          <app-glass-card className="space-y-1 text-center border-cyber-border-dark bg-cyber-dark/80">
            <lucide-icon [img]="UsersIcon" class="w-6 h-6 text-neon-purple mx-auto mb-2"></lucide-icon>
            <div class="text-2xl sm:text-3xl font-extrabold font-mono text-gray-100">{{ followers() }}</div>
            <div class="text-xs text-gray-400 font-mono uppercase tracking-wider">
              Followers
            </div>
          </app-glass-card>

          <app-glass-card className="space-y-1 text-center border-cyber-border-dark bg-cyber-dark/80">
            <lucide-icon [img]="CodeIcon" class="w-6 h-6 text-neon-emerald mx-auto mb-2"></lucide-icon>
            <div class="text-2xl sm:text-3xl font-extrabold font-mono text-gray-100">Python / JS</div>
            <div class="text-xs text-gray-400 font-mono uppercase tracking-wider">Core Stacks</div>
          </app-glass-card>

        </div>

        <!-- Featured GitHub Repos Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (repo of reposList(); track repo.name) {
            <app-glass-card className="space-y-4 border border-cyber-border-dark hover:border-neon-purple/50 transition-all duration-300 flex flex-col justify-between bg-cyber-dark/80">
              
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-base font-bold text-gray-100 hover:text-neon-purple transition-colors flex items-center gap-2 truncate">
                    <lucide-icon [img]="BookIcon" class="w-4 h-4 text-neon-purple shrink-0"></lucide-icon>
                    {{ repo.name }}
                  </span>
                  <a [href]="repo.url" target="_blank" class="text-gray-400 hover:text-neon-cyan shrink-0">
                    <lucide-icon [img]="ExternalIcon" class="w-4 h-4"></lucide-icon>
                  </a>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {{ repo.description }}
                </p>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-cyber-border-dark text-xs font-mono text-gray-400">
                <span class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-neon-cyan"></span>
                  {{ repo.language }}
                </span>

                <div class="flex items-center gap-3">
                  <span class="flex items-center gap-1">
                    <lucide-icon [img]="StarIcon" class="w-3.5 h-3.5 text-amber-400"></lucide-icon>
                    {{ repo.stars }}
                  </span>
                  <span class="flex items-center gap-1">
                    <lucide-icon [img]="ForkIcon" class="w-3.5 h-3.5"></lucide-icon>
                    {{ repo.forks }}
                  </span>
                </div>
              </div>

            </app-glass-card>
          }
        </div>

      </div>
    </section>
  `
})
export class GithubComponent implements OnInit {
  private githubService = inject(GithubService);
  ts = inject(TranslationService);

  readonly GithubIcon = Github;
  readonly StarIcon = Star;
  readonly ForkIcon = GitFork;
  readonly BookIcon = BookOpen;
  readonly UsersIcon = Users;
  readonly CodeIcon = Code;
  readonly ExternalIcon = ExternalLink;

  reposCount = signal<number>(18);
  totalStars = signal<number>(45);
  followers = signal<number>(24);
  
  reposList = signal<GithubRepoInfo[]>([
    {
      name: 'vertex-crm-pro',
      description: 'Sistema CRM profesional para gestión de leads, cotizaciones y chat en tiempo real.',
      stars: 14,
      forks: 4,
      language: 'JavaScript',
      url: 'https://github.com',
      updatedAt: '2025-08-20',
      topics: ['react', 'nodejs', 'crm', 'postgresql']
    },
    {
      name: 'food-core-pos-kds',
      description: 'Sistema integral de gestión de restaurantes, POS, KDS y predicción con Machine Learning.',
      stars: 12,
      forks: 3,
      language: 'Java',
      url: 'https://github.com',
      updatedAt: '2025-07-15',
      topics: ['spring-boot', 'react', 'weka-ml', 'pos']
    },
    {
      name: 'python-automation-toolkit',
      description: 'Scripts de automatización para extracción de datos, redes Cisco y utilidades GUI.',
      stars: 19,
      forks: 5,
      language: 'Python',
      url: 'https://github.com',
      updatedAt: '2025-06-10',
      topics: ['python', 'automation', 'cisco-network']
    }
  ]);

  ngOnInit(): void {
    this.githubService.getUserProfile().subscribe({
      next: (profile) => {
        if (profile.public_repos) this.reposCount.set(profile.public_repos);
        if (profile.followers) this.followers.set(profile.followers);
      },
      error: () => {}
    });
  }
}

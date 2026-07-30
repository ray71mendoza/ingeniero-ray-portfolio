import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { GithubRepoInfo } from '../../models/portfolio.models';

export interface GithubProfileResponse {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http = inject(HttpClient);
  private readonly githubUser = 'angular'; // Default username placeholder

  getUserProfile(username: string = this.githubUser): Observable<GithubProfileResponse> {
    return this.http.get<GithubProfileResponse>(`https://api.github.com/users/${username}`).pipe(
      catchError(() => of({
        public_repos: 32,
        followers: 120,
        following: 45,
        avatar_url: 'assets/images/profile.jpg'
      }))
    );
  }

  getUserRepos(username: string = this.githubUser): Observable<GithubRepoInfo[]> {
    return this.http.get<any[]>(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`).pipe(
      map(repos => repos.map(r => ({
        name: r.name,
        description: r.description || 'Repositorio open source de alta eficiencia y código limpio.',
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language || 'TypeScript',
        url: r.html_url,
        updatedAt: r.updated_at,
        topics: r.topics || []
      }))),
      catchError(() => of([
        {
          name: 'angular-20-cyber-portfolio',
          description: 'Portafolio Senior en Angular 20+, Standalone Components, Signals y diseño Cyber Luxury.',
          stars: 48,
          forks: 12,
          language: 'TypeScript',
          url: 'https://github.com',
          updatedAt: '2026-07-23',
          topics: ['angular20', 'signals', 'tailwindcss']
        },
        {
          name: 'microservice-architecture-kit',
          description: 'Starter kit de microservicios distribuidos con Node.js, Express, Docker y seguridad JWT.',
          stars: 64,
          forks: 18,
          language: 'TypeScript',
          url: 'https://github.com',
          updatedAt: '2026-06-15',
          topics: ['microservices', 'docker', 'nodejs']
        },
        {
          name: 'fastapi-clean-architecture',
          description: 'Plantilla de backend RESTful limpia en Python FastAPI aplicando DDD y SQLAlchemy.',
          stars: 30,
          forks: 7,
          language: 'Python',
          url: 'https://github.com',
          updatedAt: '2026-05-10',
          topics: ['python', 'fastapi', 'clean-architecture']
        }
      ]))
    );
  }
}

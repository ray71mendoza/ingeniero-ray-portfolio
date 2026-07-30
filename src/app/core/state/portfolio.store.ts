import { Injectable, signal, computed } from '@angular/core';
import { Project } from '../../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioStore {
  // Active Section Navigation Signal
  activeSection = signal<string>('hero');

  // Project Filtering Signals
  selectedCategory = signal<string>('Todos');
  searchQuery = signal<string>('');
  selectedProject = signal<Project | null>(null);

  // Setters
  setActiveSection(sectionId: string): void {
    this.activeSection.set(sectionId);
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  setSelectedProject(project: Project | null): void {
    this.selectedProject.set(project);
  }
}

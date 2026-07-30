import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../features/hero/hero.component';
import { AboutComponent } from '../../features/about/about.component';
import { ExperienceComponent } from '../../features/experience/experience.component';
import { ProjectsComponent } from '../../features/projects/projects.component';
import { GithubComponent } from '../../features/github/github.component';
import { TechStackComponent } from '../../features/tech-stack/tech-stack.component';
import { ServicesComponent } from '../../features/services/services.component';
import { CertificationsComponent } from '../../features/certifications/certifications.component';
import { ContactComponent } from '../../features/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    GithubComponent,
    TechStackComponent,
    ServicesComponent,
    CertificationsComponent,
    ContactComponent
  ],
  template: `
    <div class="space-y-12">
      <app-hero></app-hero>
      <app-about></app-about>
      <app-experience></app-experience>
      <app-projects></app-projects>
      <app-github></app-github>
      <app-tech-stack></app-tech-stack>
      <app-services></app-services>
      <app-certifications></app-certifications>
      <app-contact></app-contact>
    </div>
  `
})
export class HomeComponent {}

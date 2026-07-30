import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ScrollProgressComponent — a thin neon-colored progress bar at the very top
 * of the page reflecting reading progress as the user scrolls.
 */
@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="fixed top-0 left-0 z-[999] h-0.5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-blue shadow-[0_0_8px_rgba(0,242,254,0.7)] transition-all duration-100 pointer-events-none"
      [style.width]="scrollPercent() + '%'">
    </div>
  `
})
export class ScrollProgressComponent {
  scrollPercent = signal<number>(0);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    this.scrollPercent.set(Math.min(100, Math.round(percent)));
  }
}

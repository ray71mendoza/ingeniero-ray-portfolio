import { Component, HostListener, signal, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isBrowser) {
      <div 
        class="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out hidden lg:block"
        [style.transform]="'translate3d(' + cursorX() + 'px, ' + cursorY() + 'px, 0px)'">
        <!-- Main Dot -->
        <div class="w-3 h-3 bg-neon-cyan rounded-full shadow-[0_0_12px_#00F2FE] -translate-x-1/2 -translate-y-1/2 transition-all duration-150"
          [class.scale-150]="isHovered()"
          [class.bg-neon-purple]="isHovered()">
        </div>
      </div>

      <div 
        class="fixed top-0 left-0 pointer-events-none z-40 transition-all duration-300 ease-out hidden lg:block"
        [style.transform]="'translate3d(' + ringX() + 'px, ' + ringY() + 'px, 0px)'">
        <!-- Glowing Outer Ring -->
        <div class="w-10 h-10 border border-neon-cyan/50 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
          [class.scale-150]="isHovered()"
          [class.border-neon-purple]="isHovered()"
          [class.bg-neon-cyan/10]="isHovered()">
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CustomCursorComponent {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  cursorX = signal<number>(-100);
  cursorY = signal<number>(-100);
  ringX = signal<number>(-100);
  ringY = signal<number>(-100);
  isHovered = signal<boolean>(false);

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser) return;

    this.cursorX.set(event.clientX);
    this.cursorY.set(event.clientY);

    // Smooth trailing effect for ring
    setTimeout(() => {
      this.ringX.set(event.clientX);
      this.ringY.set(event.clientY);
    }, 60);

    // Check if hovering over interactive elements
    const target = event.target as HTMLElement;
    const isInteractive = !!target.closest('a, button, input, textarea, select, [data-interactive]');
    this.isHovered.set(isInteractive);
  }
}

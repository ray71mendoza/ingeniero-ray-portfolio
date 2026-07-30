import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      #cardRef
      class="relative overflow-hidden rounded-2xl glass-panel glass-panel-hover p-6 transition-all duration-300 group"
      [class]="className">
      
      <!-- Spotlight Light Effect -->
      <div 
        class="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
        [style.background]="'radial-gradient(600px circle at ' + mouseX + 'px ' + mouseY + 'px, var(--accent-glow), transparent 40%)'">
      </div>

      <!-- Subtle Cyber Grid Overlay -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40"></div>

      <!-- Content -->
      <div class="relative z-10">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class GlassCardComponent {
  @Input() className: string = '';
  @ViewChild('cardRef') cardRef!: ElementRef<HTMLDivElement>;

  mouseX = 0;
  mouseY = 0;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.cardRef) return;
    const rect = this.cardRef.nativeElement.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }
}

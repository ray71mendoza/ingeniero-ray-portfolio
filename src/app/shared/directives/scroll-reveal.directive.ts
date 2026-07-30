import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

/**
 * ScrollRevealDirective — uses IntersectionObserver to add entrance animation
 * classes when an element enters the viewport. Zero-dependency, pure CSS driven.
 *
 * Usage: <div appScrollReveal [revealClass]="'fade-up'">...</div>
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealClass: string = 'reveal-fade-up';
  @Input() revealThreshold: number = 0.15;
  @Input() revealDelay: string = '0ms';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    // Set initial hidden state
    this.el.nativeElement.style.opacity = '0';
    this.el.nativeElement.style.transform = 'translateY(30px)';
    this.el.nativeElement.style.transition = `opacity 0.7s ease ${this.revealDelay}, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${this.revealDelay}`;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.el.nativeElement.style.opacity = '1';
            this.el.nativeElement.style.transform = 'translateY(0px)';
            this.observer.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: this.revealThreshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

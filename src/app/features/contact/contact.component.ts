import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, Mail, MessageSquare, Send, MapPin, CheckCircle2, Sparkles } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, GlassCardComponent],
  template: `
    <section id="contact" class="py-20 relative bg-cyber-dark/60">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-neon-cyan/30 text-xs font-mono text-neon-cyan">
            <lucide-icon [img]="MailIcon" class="w-3.5 h-3.5"></lucide-icon>
            <span>Canal Directo</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Iniciar <span class="text-gradient-cyan">Conversación</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            ¿Tienes un proyecto ambicioso, necesitas asesoría en arquitectura Angular 20+ o deseas contratarme? Escríbeme directamente.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <!-- Left Column: Contact Cards & Info -->
          <div class="lg:col-span-5 space-y-6">
            
            <app-glass-card className="space-y-4 border border-cyber-border-dark">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan shrink-0">
                  <lucide-icon [img]="MailIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <div>
                  <span class="text-xs font-mono text-gray-400 uppercase">Correo Electrónico</span>
                  <p class="font-bold text-sm sm:text-base text-gray-100">ray.ingeniero&#64;example.com</p>
                </div>
              </div>
            </app-glass-card>

            <app-glass-card className="space-y-4 border border-cyber-border-dark">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-neon-emerald/10 border border-neon-emerald/30 flex items-center justify-center text-neon-emerald shrink-0">
                  <lucide-icon [img]="WhatsappIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <div>
                  <span class="text-xs font-mono text-gray-400 uppercase">WhatsApp Directo</span>
                  <a href="https://wa.me/573000000000" target="_blank" class="font-bold text-sm sm:text-base text-neon-emerald hover:underline block">
                    +57 300 000 0000
                  </a>
                </div>
              </div>
            </app-glass-card>

            <app-glass-card className="space-y-4 border border-cyber-border-dark">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple shrink-0">
                  <lucide-icon [img]="MapPinIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <div>
                  <span class="text-xs font-mono text-gray-400 uppercase">Ubicación & Disponibilidad</span>
                  <p class="font-bold text-sm text-gray-100">Colombia / Trabajo Remoto Global</p>
                </div>
              </div>
            </app-glass-card>

            <!-- Map View Widget -->
            <div class="rounded-2xl overflow-hidden glass-panel border border-cyber-border-dark h-48 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.7865239564!2d-74.072092!3d4.653332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a397858c42b%3A0xc3b83c5a88e99999!2sBogota!5e0!3m2!1ses!2sco!4v1680000000000!5m2!1ses!2sco" 
                width="100%" 
                height="100%" 
                style="border:0; filter: grayscale(100%) invert(90%) contrast(120%);" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>

          </div>

          <!-- Right Column: Reactive Contact Form -->
          <div class="lg:col-span-7">
            <app-glass-card className="space-y-6 border border-cyber-border-dark">
              
              <div class="space-y-1">
                <h3 class="text-xl font-bold text-gray-100 flex items-center gap-2">
                  <lucide-icon [img]="SparklesIcon" class="w-5 h-5 text-neon-cyan"></lucide-icon>
                  Enviar Mensaje
                </h3>
                <p class="text-xs text-gray-400">Respuesta garantizada en menos de 24 horas.</p>
              </div>

              @if (isSuccess()) {
                <div class="p-4 rounded-xl bg-neon-emerald/10 border border-neon-emerald/30 text-neon-emerald text-xs font-mono flex items-center gap-2 animate-in fade-in">
                  <lucide-icon [img]="CheckIcon" class="w-5 h-5 shrink-0"></lucide-icon>
                  ¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.
                </div>
              }

              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Name Field -->
                  <div class="space-y-1">
                    <label class="text-xs font-mono text-gray-300">Nombre Completo *</label>
                    <input 
                      type="text" 
                      formControlName="name"
                      placeholder="Tu nombre o empresa"
                      class="w-full px-4 py-3 rounded-xl glass-panel border border-cyber-border-dark text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-cyan" />
                    @if (contactForm.get('name')?.touched && contactForm.get('name')?.invalid) {
                      <span class="text-[10px] text-red-400 font-mono">El nombre es requerido.</span>
                    }
                  </div>

                  <!-- Email Field -->
                  <div class="space-y-1">
                    <label class="text-xs font-mono text-gray-300">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      formControlName="email"
                      placeholder="tu.correo@ejemplo.com"
                      class="w-full px-4 py-3 rounded-xl glass-panel border border-cyber-border-dark text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-cyan" />
                    @if (contactForm.get('email')?.touched && contactForm.get('email')?.invalid) {
                      <span class="text-[10px] text-red-400 font-mono">Correo válido requerido.</span>
                    }
                  </div>
                </div>

                <!-- Subject Field -->
                <div class="space-y-1">
                  <label class="text-xs font-mono text-gray-300">Asunto *</label>
                  <input 
                    type="text" 
                    formControlName="subject"
                    placeholder="Ej: Oportunidad Senior Angular / Consultoría"
                    class="w-full px-4 py-3 rounded-xl glass-panel border border-cyber-border-dark text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-cyan" />
                </div>

                <!-- Message Field -->
                <div class="space-y-1">
                  <label class="text-xs font-mono text-gray-300">Mensaje *</label>
                  <textarea 
                    rows="5" 
                    formControlName="message"
                    placeholder="Escribe los detalles de tu proyecto o propuesta..."
                    class="w-full px-4 py-3 rounded-xl glass-panel border border-cyber-border-dark text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-cyan resize-none"></textarea>
                  @if (contactForm.get('message')?.touched && contactForm.get('message')?.invalid) {
                    <span class="text-[10px] text-red-400 font-mono">El mensaje debe tener al menos 10 caracteres.</span>
                  }
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  [disabled]="contactForm.invalid || isSending()"
                  class="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-gray-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-neon-cyan hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  @if (isSending()) {
                    <span class="animate-spin w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full"></span>
                    <span>Enviando...</span>
                  } @else {
                    <lucide-icon [img]="SendIcon" class="w-4 h-4"></lucide-icon>
                    <span>Enviar Mensaje Directo</span>
                  }
                </button>

              </form>

            </app-glass-card>
          </div>

        </div>

      </div>
    </section>
  `
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  readonly MailIcon = Mail;
  readonly WhatsappIcon = MessageSquare;
  readonly SendIcon = Send;
  readonly MapPinIcon = MapPin;
  readonly CheckIcon = CheckCircle2;
  readonly SparklesIcon = Sparkles;

  isSending = signal<boolean>(false);
  isSuccess = signal<boolean>(false);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isSending.set(true);

    this.contactService.sendEmail(this.contactForm.value).subscribe({
      next: () => {
        this.isSending.set(false);
        this.isSuccess.set(true);
        this.contactForm.reset();

        setTimeout(() => this.isSuccess.set(false), 5000);
      },
      error: () => {
        this.isSending.set(false);
      }
    });
  }
}

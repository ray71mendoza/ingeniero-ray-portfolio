import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, Mail, MessageSquare, Send, MapPin, CheckCircle2, Sparkles, Linkedin, Phone, FileText, Download, ShieldCheck, ExternalLink } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { ContactService } from '../../core/services/contact.service';
import { TranslationService } from '../../core/services/translation.service';

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
            <span>{{ ts.t().contact.badge }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {{ ts.t().contact.title }} <span class="text-gradient-cyan">{{ ts.t().contact.titleAccent }}</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {{ ts.t().contact.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <!-- Left Column: Contact Cards & Info -->
          <div class="lg:col-span-5 space-y-4">
            
            <!-- Email Card -->
            <app-glass-card className="border border-cyber-border-dark hover:border-neon-cyan/50 transition-all">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan shrink-0">
                  <lucide-icon [img]="MailIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <div class="min-w-0 flex-1">
                  <span class="text-xs font-mono text-gray-400 uppercase">{{ ts.t().contact.emailLabel }}</span>
                  <a [href]="'mailto:' + ts.contactData.email" class="font-bold text-sm sm:text-base text-gray-100 hover:text-neon-cyan truncate block">
                    {{ ts.contactData.email }}
                  </a>
                </div>
              </div>
            </app-glass-card>

            <!-- LinkedIn Card -->
            <app-glass-card className="border border-cyber-border-dark hover:border-neon-blue/50 transition-all">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center text-neon-blue shrink-0">
                  <lucide-icon [img]="LinkedinIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <div class="min-w-0 flex-1">
                  <span class="text-xs font-mono text-gray-400 uppercase">LinkedIn Profile</span>
                  <a [href]="ts.contactData.linkedin" target="_blank" rel="noopener noreferrer" class="font-bold text-sm sm:text-base text-neon-blue hover:underline flex items-center gap-1">
                    <span>Ray Sebastián Mendoza Torres</span>
                    <lucide-icon [img]="ExternalIcon" class="w-3.5 h-3.5"></lucide-icon>
                  </a>
                </div>
              </div>
            </app-glass-card>

            <!-- Phone Colombia (WhatsApp) -->
            <app-glass-card className="border border-cyber-border-dark hover:border-neon-emerald/50 transition-all">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-neon-emerald/10 border border-neon-emerald/30 flex items-center justify-center text-neon-emerald shrink-0">
                  <lucide-icon [img]="WhatsappIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <div class="min-w-0 flex-1">
                  <span class="text-xs font-mono text-gray-400 uppercase">{{ ts.t().contact.phoneColLabel }}</span>
                  <a [href]="'https://wa.me/' + ts.contactData.phoneColombiaClean" target="_blank" rel="noopener noreferrer" class="font-bold text-sm sm:text-base text-neon-emerald hover:underline block">
                    {{ ts.contactData.phoneColombia }}
                  </a>
                </div>
              </div>
            </app-glass-card>

            <!-- Phone Spain (WhatsApp) -->
            <app-glass-card className="border border-cyber-border-dark hover:border-neon-purple/50 transition-all">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple shrink-0">
                  <lucide-icon [img]="PhoneIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <div class="min-w-0 flex-1">
                  <span class="text-xs font-mono text-gray-400 uppercase">{{ ts.t().contact.phoneEspLabel }}</span>
                  <a [href]="'https://wa.me/' + ts.contactData.phoneSpainClean" target="_blank" rel="noopener noreferrer" class="font-bold text-sm sm:text-base text-neon-purple hover:underline block">
                    {{ ts.contactData.phoneSpain }}
                  </a>
                </div>
              </div>
            </app-glass-card>

            <!-- Downloadable Documents Hub -->
            <div class="p-5 rounded-2xl glass-panel border border-cyber-border-dark space-y-3 bg-cyber-dark/80">
              <h4 class="text-xs font-mono uppercase text-neon-cyan tracking-wider font-bold flex items-center gap-2">
                <lucide-icon [img]="DownloadIcon" class="w-4 h-4"></lucide-icon>
                {{ ts.t().contact.downloadsTitle }}
              </h4>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <a 
                  [href]="ts.links.cvSpanish"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2.5 rounded-xl glass-panel border border-cyber-border-dark text-center hover:border-neon-cyan/60 hover:text-neon-cyan transition-all text-xs font-mono flex flex-col items-center justify-center gap-1">
                  <lucide-icon [img]="FileIcon" class="w-4 h-4 text-neon-cyan"></lucide-icon>
                  <span>CV (Español)</span>
                </a>

                <a 
                  [href]="ts.links.cvEnglish"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2.5 rounded-xl glass-panel border border-cyber-border-dark text-center hover:border-neon-purple/60 hover:text-neon-purple transition-all text-xs font-mono flex flex-col items-center justify-center gap-1">
                  <lucide-icon [img]="FileIcon" class="w-4 h-4 text-neon-purple"></lucide-icon>
                  <span>Resume (English)</span>
                </a>

                <a 
                  [href]="ts.links.certificates"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2.5 rounded-xl glass-panel border border-cyber-border-dark text-center hover:border-neon-emerald/60 hover:text-neon-emerald transition-all text-xs font-mono flex flex-col items-center justify-center gap-1">
                  <lucide-icon [img]="ShieldCheckIcon" class="w-4 h-4 text-neon-emerald"></lucide-icon>
                  <span>Certificados</span>
                </a>
              </div>
            </div>

          </div>

          <!-- Right Column: Reactive Contact Form -->
          <div class="lg:col-span-7">
            <app-glass-card className="space-y-6 border border-cyber-border-dark bg-cyber-dark/85">
              
              <div class="space-y-1">
                <h3 class="text-xl font-bold text-gray-100 flex items-center gap-2">
                  <lucide-icon [img]="SparklesIcon" class="w-5 h-5 text-neon-cyan"></lucide-icon>
                  {{ ts.t().contact.formTitle }}
                </h3>
                <p class="text-xs text-gray-400">{{ ts.t().contact.formSubtitle }}</p>
              </div>

              @if (isSuccess()) {
                <div class="p-4 rounded-xl bg-neon-emerald/10 border border-neon-emerald/30 text-neon-emerald text-xs font-mono flex items-center gap-2 animate-in fade-in">
                  <lucide-icon [img]="CheckIcon" class="w-5 h-5 shrink-0"></lucide-icon>
                  {{ ts.t().contact.successMsg }}
                </div>
              }

              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Name Field -->
                  <div class="space-y-1">
                    <label class="text-xs font-mono text-gray-300">{{ ts.t().contact.nameField }}</label>
                    <input 
                      type="text" 
                      formControlName="name"
                      [placeholder]="ts.t().contact.namePlaceholder"
                      class="w-full px-4 py-3 rounded-xl glass-panel border border-cyber-border-dark text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors" />
                    @if (contactForm.get('name')?.touched && contactForm.get('name')?.invalid) {
                      <span class="text-[10px] text-red-400 font-mono">
                        {{ ts.currentLang() === 'es' ? 'El nombre es requerido.' : 'Name is required.' }}
                      </span>
                    }
                  </div>

                  <!-- Email Field -->
                  <div class="space-y-1">
                    <label class="text-xs font-mono text-gray-300">{{ ts.t().contact.emailField }}</label>
                    <input 
                      type="email" 
                      formControlName="email"
                      [placeholder]="ts.t().contact.emailPlaceholder"
                      class="w-full px-4 py-3 rounded-xl glass-panel border border-cyber-border-dark text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors" />
                    @if (contactForm.get('email')?.touched && contactForm.get('email')?.invalid) {
                      <span class="text-[10px] text-red-400 font-mono">
                        {{ ts.currentLang() === 'es' ? 'Correo válido requerido.' : 'Valid email required.' }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Subject Field -->
                <div class="space-y-1">
                  <label class="text-xs font-mono text-gray-300">{{ ts.t().contact.subjectField }}</label>
                  <input 
                    type="text" 
                    formControlName="subject"
                    [placeholder]="ts.t().contact.subjectPlaceholder"
                    class="w-full px-4 py-3 rounded-xl glass-panel border border-cyber-border-dark text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors" />
                </div>

                <!-- Message Field -->
                <div class="space-y-1">
                  <label class="text-xs font-mono text-gray-300">{{ ts.t().contact.messageField }}</label>
                  <textarea 
                    rows="5" 
                    formControlName="message"
                    [placeholder]="ts.t().contact.messagePlaceholder"
                    class="w-full px-4 py-3 rounded-xl glass-panel border border-cyber-border-dark text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-cyan resize-none transition-colors"></textarea>
                  @if (contactForm.get('message')?.touched && contactForm.get('message')?.invalid) {
                    <span class="text-[10px] text-red-400 font-mono">
                      {{ ts.currentLang() === 'es' ? 'El mensaje debe tener al menos 10 caracteres.' : 'Message must have at least 10 characters.' }}
                    </span>
                  }
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  [disabled]="contactForm.invalid || isSending()"
                  class="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-gray-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-neon-cyan hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  @if (isSending()) {
                    <span class="animate-spin w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full"></span>
                    <span>{{ ts.t().contact.sending }}</span>
                  } @else {
                    <lucide-icon [img]="SendIcon" class="w-4 h-4"></lucide-icon>
                    <span>{{ ts.t().contact.btnSend }}</span>
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
  ts = inject(TranslationService);

  readonly MailIcon = Mail;
  readonly WhatsappIcon = MessageSquare;
  readonly SendIcon = Send;
  readonly MapPinIcon = MapPin;
  readonly CheckIcon = CheckCircle2;
  readonly SparklesIcon = Sparkles;
  readonly LinkedinIcon = Linkedin;
  readonly PhoneIcon = Phone;
  readonly FileIcon = FileText;
  readonly DownloadIcon = Download;
  readonly ShieldCheckIcon = ShieldCheck;
  readonly ExternalIcon = ExternalLink;

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

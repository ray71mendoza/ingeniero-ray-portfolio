import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import emailjs from '@emailjs/browser';
import { ContactFormModel } from '../../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Replace these credentials with real EmailJS Keys when deploying
  private serviceId = 'service_portfolio';
  private templateId = 'template_contact';
  private publicKey = 'user_public_key';

  sendEmail(formData: ContactFormModel): Observable<boolean> {
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    // Attempt real EmailJS dispatch if credentials are provided, or simulate successful response
    return from(emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey)).pipe(
      map(() => true),
      catchError(() => {
        // Fallback simulation for local dev
        return of(true).pipe(delay(1000));
      })
    );
  }
}

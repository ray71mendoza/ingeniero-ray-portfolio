import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);

  private readonly siteUrl = 'https://ingeniero-ray.vercel.app';
  private readonly defaultImage = '/assets/images/profile.jpg';
  private readonly twitterHandle = '@IngenieroRAY';

  updateSeo(config: SeoConfig): void {
    const fullTitle = `${config.title} | Ingeniero RAY - Software Architect`;
    const imageUrl = config.image ?? this.defaultImage;
    const pageUrl = config.url ?? this.siteUrl;

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: config.keywords });
    this.meta.updateTag({ name: 'author', content: 'Ingeniero RAY' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Portafolio Ingeniero RAY' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_CO' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: this.twitterHandle });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.updateCanonical(pageUrl);
    this.injectSchemaOrg();
  }

  private updateCanonical(url: string): void {
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private injectSchemaOrg(): void {
    const existing = document.getElementById('schema-org-ld');
    if (existing) existing.remove();

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${this.siteUrl}/#person`,
          name: 'Ingeniero RAY',
          jobTitle: 'Senior Software Architect & Angular Expert',
          description: 'Arquitecto de Software y Full Stack Engineer especializado en Angular 20+, TypeScript, microservicios y ciberseguridad.',
          url: this.siteUrl,
          image: `${this.siteUrl}/assets/images/profile.jpg`,
          sameAs: ['https://github.com', 'https://linkedin.com'],
          knowsAbout: ['Angular', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Cybersecurity']
        },
        {
          '@type': 'WebSite',
          '@id': `${this.siteUrl}/#website`,
          name: 'Portafolio Ingeniero RAY',
          url: this.siteUrl,
          author: { '@id': `${this.siteUrl}/#person` }
        }
      ]
    };

    const script = document.createElement('script');
    script.id = 'schema-org-ld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}

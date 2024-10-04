export enum ContactType {
  github = 'github',
  linkedin = 'linkedin',
  twitter = 'twitter',
  youtube = 'youtube',
  email = 'email',
  buymeacoffee = 'buymeacoffee',
}

export interface Contact {
  twitter: string;
  site: string;
  calendly?: string;
  links: Record<ContactType, string>;
}

export const contact: Contact = {
  twitter: '@imjimit07',
  site: 'imjimit07.vercel.app/',
  calendly: 'https://calendly.com',
  links: {
    github: 'https://github.com/imjimit07',
    linkedin: 'https://www.linkedin.com/in/jimit-patel-7ab025331/',
    twitter: 'https://twitter.com/imjimit07',
    youtube: 'https://www.youtube.com/@imjimit07',
    email: 'mailto:imjimit07@gmail.com',
    buymeacoffee: 'https://www.buymeacoffee.com',
  },
};

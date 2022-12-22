const siteMetadata = {
  title: 'Jimit Patel',
  author: 'Jimit Patel',
  headerTitle: 'Jimit Patel',
  description:
    'A student who values learning and growing with people, teams, and technologies.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://imjimit07.vercel.app/',
  siteRepo: 'https://github.com/imjimit07/imjimit07-vercel',
  siteLogo: '/static/images/logo.png',
  image: '/static/avatar.jpg',
  socialBanner: '/static/banner.png',
  email: 'imjimit07@gmail.com',
  github: 'https://github.com/imjimit07',
  twitter: 'https://twitter.com/imjimit07',
  facebook: 'https://facebook.com',
  youtube: 'https://www.youtube.com/@imjimit07',
  linkedin: 'https://www.linkedin.com',
  locale: 'en-US',
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports plausible, simpleAnalytics, umami or googleAnalytics
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, // e.g. UA-000000-2 or G-XXXXXXX
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
};

module.exports = siteMetadata;

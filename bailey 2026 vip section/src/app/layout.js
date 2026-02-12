import '../styles/globals.css';

export const metadata = {
  title: 'Free AI Challenge — Bailey Vann',
  description: 'Join the FREE 5-Day Challenge Secrets Masterclass and learn the ONE funnel every business needs.',
  openGraph: {
    title: 'Free 5-Day Challenge Secrets Masterclass',
    description: 'Discover the challenge funnel that works for every business — even if you suck at marketing.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Caveat:wght@400;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

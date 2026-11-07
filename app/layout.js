import './globals.css';
import Nav from './components/Nav';
import CvModal from './components/CvModal';
import OpenBot from './components/OpenBot';
import RevealInit from './components/RevealInit';
import { PROFILE, WHATSAPP } from './data';

export const metadata = {
  title: 'Faith Wekesa | Software Engineer',
  description: 'The portfolio of Faith Wekesa, a software engineer in Nairobi who builds calm and useful web products.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-intro="playing" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400..700&family=Google+Sans+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <style>{'.opening{display:none!important}html{overflow:auto!important}'}</style>
        </noscript>
      </head>
      <body>
        <Nav cv={PROFILE.cv} />
        <CvModal cv={PROFILE.cv} />
        {children}
        <OpenBot whatsapp={WHATSAPP} name={PROFILE.name} role={PROFILE.role} />
        <footer className="foot">
          <small>© {new Date().getFullYear()} {PROFILE.name} · {PROFILE.base}</small>
        </footer>
        <RevealInit />
      </body>
    </html>
  );
}

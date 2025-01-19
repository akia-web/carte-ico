import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { GameProvider } from './provider/game.provider';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import LayoutWrapper from '@/app/component/layout-wrapper/layout-wrapper';
import { UserProvider } from '@/app/provider/user.provider';


const APP_NAME: string = 'ICO';
const APP_DEFAULT_TITLE: string = 'Ico';
const APP_TITLE_TEMPLATE: string = '%s - ICO App';
const APP_DESCRIPTION: string = 'Jeux de cartes Marins contre Pirates';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};
export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`app-container`}
    >
    <PrimeReactProvider>
      <UserProvider>
        <GameProvider>
          <LayoutWrapper>

            <div>
              {children}
            </div>
          </LayoutWrapper>
        </GameProvider>
      </UserProvider>

    </PrimeReactProvider>


    </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { GameProvider } from './provider/gameProvider';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import LayoutWrapper from './component/layoutWrapper/LayoutWrapper';
import { UserProvider } from '@/app/provider/userProvider';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ico',
  description: 'Jeux de cartes Marins contre Pirates',
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

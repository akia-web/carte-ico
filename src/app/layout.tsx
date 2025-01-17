import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GameProvider } from "./provider/game";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import LayoutWrapper from "./component/layoutWrapper/LayoutWrapper";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ico",
  description: "Jeux de cartes Marins contre Pirates",
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
        <GameProvider>
          <LayoutWrapper>

              <div>
              {children}
            </div>
        </LayoutWrapper>
        </GameProvider>
        </PrimeReactProvider>
     
        
      </body>
    </html>
  );
}

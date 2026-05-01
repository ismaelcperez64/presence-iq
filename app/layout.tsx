import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PresenceIQ — Digital Presence Audit',
  description: 'Find out how the internet sees you — and what to do about it.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}

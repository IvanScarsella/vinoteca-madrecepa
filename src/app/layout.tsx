import type { Metadata } from 'next';
import { Quattrocento_Sans } from 'next/font/google';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './globals.css';
import WhatsApp from './components/Whatsapp';
import icon from './icon.png'

const inter = Quattrocento_Sans({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vinoteca Madrecepa',
  description: 'Explora nuestra vinoteca y descubre una selección excepcional de vinos de calidad. En MAD te ofrecemos una experiencia única de degustación de los clásicos hasta los más exclusivos. Dejate guiar por nuestros expertos en vinos y encuentra la bebida perfecta para cada ocasión.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Vinoteca MAD</title>
        <link rel='shortcut icon' href={icon.src} />
      </head>
      <body className={inter.className}>
        <Nav />
        <div className="bg-[#1d1d1d]">{children}</div>
        <WhatsApp />
        <Footer />
      </body>
    </html >
  );
}

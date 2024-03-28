import type { Metadata } from 'next';
import { Quattrocento_Sans } from 'next/font/google';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './globals.css';
import WhatsApp from './components/Whatsapp';
import icon from './icon.png'
import { GlobalContextProvider } from '../../context/store';

const inter = Quattrocento_Sans({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vinoteca Madrecepa',
  description: 'Explorá nuestra vinoteca y descubrí una selección excepcional de vinos de calidad. En MAD te ofrecemos una experiencia única de degustación de los clásicos hasta los más exclusivos. Dejate guiar por nuestros expertos en vinos y encontrá la bebida perfecta para cada ocasión.',
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
        <GlobalContextProvider>
          <Nav />
          <div className="bg-[#1d1d1d] mt-20">{children}</div>
          <WhatsApp />
          <Footer />
        </GlobalContextProvider>
      </body>
    </html >
  );
}

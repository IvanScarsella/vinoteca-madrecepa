import Carousel from '@/app/components/Carousel'

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="main-text">
        Los mejores vinos de la ciudad los encontrás en
      </h1>
      <p className="text-8xl text-center text-red-600">MAD</p>
      <Carousel />
    </main>
  );
}

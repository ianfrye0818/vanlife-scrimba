import Layout from '../../layout';
import CallToActionBox from './CallToActionBox';
import heroImg from '../../assets/about-hero.png';

export default function About() {
  return (
    <Layout>
      <main>
        <div>
          <img
            className='w-full'
            src={heroImg}
            alt='Hero Img'
          />
        </div>
        <div className='flex flex-col justify-between gap-12 p-4 md:px-24 mt-12'>
          <h1 className='text-3xl md:text-6xl font-bold'>
            Don't squeeze in a sedan when you could relax in a van.
          </h1>
          <section>
            <p className='text-lg mb-3'>
              Our mission is to enliven your road trip with the perfect travel van rental. Our vans
              are recertified before each trip to ensure your travel plans can go off without a
              hitch. (Hitch costs extra 😉)
            </p>
            <p className='text-lg'>
              Our team is full of vanlife enthusiasts who know firsthand the magic of touring the
              world on 4 wheels.
            </p>
          </section>
          <section>
            <CallToActionBox />
          </section>
        </div>
      </main>
    </Layout>
  );
}

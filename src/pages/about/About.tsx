import Layout from '../../layout';
import CallToActionBox from './CallToActionBox';
import heroImg from '../../assets/about-hero.png';

export default function About() {
  return (
    <Layout>
      <main className='about-page'>
        <div className='hero'>
          <img
            src={heroImg}
            alt=''
          />
        </div>
        <div className='about-page__container'>
          <h1>Don't squeeze in a sedan when you could relax in a van.</h1>
          <section>
            <p>
              Our mission is to enliven your road trip with the perfect travel van rental. Our vans
              are recertified before each trip to ensure your travel plans can go off without a
              hitch. (Hitch costs extra 😉)
            </p>
            <p>
              Our team is full of vanlife enthusiasts who know firsthand the magic of touring the
              world on 4 wheels.
            </p>
          </section>
          <section>
            <CallToActionBox />
          </section>
          <section className='about-call-to-action'></section>
        </div>
      </main>
    </Layout>
  );
}

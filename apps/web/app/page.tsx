import { Navbar } from 'ui';
import Register from 'ui/Register';

export default function Page() {
  return (
    <>
      <Navbar />
      <section className='section-center'>
        <Register />
      </section>
    </>
  );
}

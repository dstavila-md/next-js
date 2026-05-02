import reliabilityImg from 'public/reliability.jpg';
import Hero from '@/components/hero';

export default function ReliabilityPage() {
  return (
    <Hero
      iamgeData={reliabilityImg}
      imageAlt='welding'
      title='Super high reliability infrastructure'
    />
  );
}

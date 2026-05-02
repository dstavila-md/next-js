import performanceImg from 'public/performance.jpg';
import Hero from '@/components/hero';

export default function PerformancePAge() {
  return (
    <Hero
      iamgeData={performanceImg}
      imageAlt='welding'
      title='We serve high performance applications'
    />
  );
}

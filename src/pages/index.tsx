import { Fragment, useEffect } from 'react';
import MapSection from '@/components/home/MapSection';
import DetailSection from '@/components/home/DetailSection';
import { Store } from '@/types/store';
import useStores from '@/hooks/useStores';
import Header from '@/components/home/Header';
import { relative } from 'path/posix';

interface Props {
  stores: Store[];
}

export default function Home({ stores }: Props) {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <Header />
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
}

export async function getStaticProps() {
  // todo: next api로 가져오기
  const stores = (await import('../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}

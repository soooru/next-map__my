import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Store } from '@/types/store';
import DetailHeader from '@/components/home/DetailHeader';
import DetailContent from '@/components/home/DetailContent';
import styles from '@/styles/detail.module.scss';
import { useRouter } from 'next/router';
import useCurrentStore from '@/hooks/useCurrentStore';

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  const router = useRouter();
  const { setCurrentStore } = useCurrentStore();

  const goToMap = () => {
    setCurrentStore(store);
    router.push(`
      /?zoom=15&lat=${store.coordinates[0]}&lng=${store.coordinates[1]}
    `);
  };

  return (
    <div className={(styles.detailSection, styles.expanded, styles.selected)}>
      <DetailHeader
        currentStore={store}
        expanded={true}
        onClickArrow={goToMap}
      />
      <DetailContent currentStore={store} expanded={true} />
    </div>
  );
};
export default StoreDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../public/stores.json')).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params는 getStaticPaths의 params를 통해 받을 수 있다.
  const stores = (await import('../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);
  //prop으로 해당 params의 정보를 넘겨 줄 수 있음.
  return { props: { store } };
};

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Store } from '@/types/store';

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  return <div>name: {store.name}</div>;
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

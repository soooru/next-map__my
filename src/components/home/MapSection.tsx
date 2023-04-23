import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Map from './Map';
import Markers from './Markers';
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import useCurrentStore from '@/hooks/useCurrentStore';
import type { NaverMap } from '@/types/map';
import type { Coordinates } from '@/types/store';

const MapSection = () => {
  const router = useRouter();
  /**
   * router.asPath === '/?zoom={}&lat={}&lng={}'
   */

  const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []); // eslint-disable-line react-hooks/exhaustive-deps
  const initialZoom = useMemo(
    () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
    [query]
  );
  const initialCenter = useMemo<Coordinates>(
    () =>
      query.get('lat') && query.get('lng')
        ? [Number(query.get('lat')), Number(query.get('lng'))]
        : INITIAL_CENTER,
    [query]
  );

  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, 'click', clearCurrentStore);
  };

  return (
    <>
      <Map
        onLoad={onLoadMap}
        initialZoom={initialZoom}
        initialCenter={initialCenter}
      />
      <Markers />
    </>
  );
};
export default MapSection;

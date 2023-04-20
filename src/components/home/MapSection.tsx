import Map from './Map';

const MapSection = () => {
  return (
    <Map
      onReady={() => {
        console.log('load!');
      }}
    />
  );
};
export default MapSection;

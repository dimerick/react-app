import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Icon, SVGOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { map } from 'leaflet';
import Layers from './Layers';


class Map extends React.Component {



render(){


  return(
        
            
  <MapContainer id="map" center={[6.27470065545955, -75.5915164150646]} zoom={10} scrollWheelZoom={false}>
        
  
  <Layers/>
  
</MapContainer>
       
    );
}
}

export default Map;
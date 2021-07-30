import React from 'react';
import { useMapEvents, MapContainer, TileLayer, Marker, Popup, Icon, SVGOverlay, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Point, LatLng, DomUtil } from 'leaflet';


const Layers = () => {

  let g = React.createRef();
  let svg = React.createRef();
  let bounds_map = null;
  let bounds = null;
  let lastTopLeftlatLng = null;
  let initTopLeftlatLng = null;
  let initZoom = null;
  let shift = null;
  let lastZoom = null;
  let size = null;


  // Call useMapEvents:
  const map = useMapEvents({
    // Use leaflet map event as the key and a call back with the 
    // map method as the value:

    zoomend: () => {
      // Get the zoom level once zoom ended:
      console.log(map.getZoom());
      // updateSvg();


    },
    moveend: () => {
      // Get bounds once move has ended:
      console.log(map.getBounds());
      updateSvg();
    },

  });

  map.whenReady(() => {

    shift = new Point(0, 0);
    initZoom = map.getZoom();
    lastZoom = map.getZoom();
    console.log('Mapa listo');
    bounds_map = map.getBounds();
    size = map.getSize();

    lastTopLeftlatLng = new LatLng(bounds_map.getNorth(), bounds_map.getWest());

    initTopLeftlatLng = new LatLng(bounds_map.getNorth(), bounds_map.getWest());

    bounds = [
      [bounds_map.getNorthEast().lat, bounds_map.getNorthEast().lng],
      [bounds_map.getSouthWest().lat, bounds_map.getSouthWest().lng]
    ];
  });




  const updateSvg = () => {
    bounds_map = map.getBounds();

    bounds = [
      [bounds_map.getNorthEast().lat, bounds_map.getNorthEast().lng],
      [bounds_map.getSouthWest().lat, bounds_map.getSouthWest().lng]
    ];

    let topLeftLatLng = new LatLng(bounds_map.getNorth(), bounds_map.getWest());
    let topLeftLayerPoint = map.latLngToLayerPoint(topLeftLatLng);
    let lastLeftLayerPoint = map.latLngToLayerPoint(lastTopLeftlatLng);
    let initTopLeftlatLngLayerPoint = map.latLngToLayerPoint(initTopLeftlatLng);

    let delta = lastLeftLayerPoint.subtract(topLeftLayerPoint);
    let delta2 = initTopLeftlatLngLayerPoint.subtract(topLeftLayerPoint);

    let zoom = map.getZoom();
    let scaleDelta = map.getZoomScale(zoom, lastZoom);
    let scaleDelta2 = map.getZoomScale(zoom, initZoom);

    let shift2 = shift.multiplyBy(scaleDelta).add(delta2);

    let size = map.getSize();

    svg.current.getElement().style = "";

    svg.current.getElement().setAttribute('width', size.x);
    svg.current.getElement().setAttribute('height', size.y);

    DomUtil.setPosition(svg.current.getElement(), topLeftLayerPoint);

    svg.current.getElement().setAttribute('viewBox', `0 0 ${size.x} ${size.y}`);

    g.current.setAttribute("transform", "translate(" + shift2.x + "," + shift2.y + ") scale(" + scaleDelta2 + ")");

    

    lastTopLeftlatLng = topLeftLatLng;

    lastZoom = zoom;
  }






  //console.log(map.getBounds());

  const myIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
  });



  const points = [
    [
      [6.27470065545955, -75.5915164150646],
      [5.9472958, -75.7184121],

    ],

    [
      [6.233, -75.15],
      [6.317, -76.133],

    ]
  ]

  const getPointControl = (points) => {
    let m = ((points[1][1] - points[0][1]) / (points[1][0] - points[0][0]));
    let pmx = ((points[0][0] + points[1][0]) / 2);
    let pmy = ((points[0][1] + points[1][1]) / 2);

    let angulo = ((30 * Math.PI) / 180);



    let pointControl = [];
    let p1 = points[0];
    let p2 = points[1];

    if (p2[0] < p1[1]) {
      let paux = p1;
      p1 = p2;
      p2 = paux;

    }

    console.log('p1: ', p1);
    console.log('p2: ', p2);
    console.log('angulo: ', angulo);

    let a = Math.sqrt(Math.pow((p1[0] - pmx), 2) + Math.pow((p1[1] - pmy), 2))
    if (m < 0) {
      console.log('pendiente negativa');
      angulo = ((Math.acos((p1[0] - pmx) / a)) - Math.PI);

    }
    else {
      console.log('pendiente: ', m);
      angulo = ((Math.acos((p1[0] - pmx) / a)) + angulo);
    }
    angulo = ((angulo * 180) / Math.PI);
    console.log('angulo grados: ', angulo);
    pointControl[0] = pmx - (a * Math.cos(angulo));
    pointControl[1] = pmy + (a * Math.sin(angulo));

    console.log('pmx: ', pmx);
    console.log('pmy: ', pmy);
    console.log('angulo: ', angulo);
    console.log('a: ', a);
    console.log('pointControl: ', pointControl);

    return pointControl;

  }

  class Punto {
    constructor(lat, lng, y, x, path) {
      this.lat = lat;
      this.lng = lng;
      this.y = y;
      this.x = x;
    }

    setPath(path) {
      this.path = path;
    }


    getPath() {
      return this.path;
    }

    getLat() {
      return this.lat;
    }

    getLng() {
      return this.lng;
    }

    getY() {
      return this.y;
    }

    getX() {
      return this.x;
    }


  }

  const paths = []

  points.map((p, i) => {
    console.log(p);
    let control = getPointControl(p);
    let p1 = map.latLngToLayerPoint([p[0][0], p[0][1]]);
    let pc2 = map.latLngToLayerPoint([control[0], control[1]]);
    let p2 = map.latLngToLayerPoint([p[1][0], p[1][1]]);

    let path = "M " + p1.x + " " + p1.y + " C " + p1.x + " " + p1.y + ", " + pc2.x + " " + pc2.y + ", " + p2.x + " " + p2.y;
    console.log(path);
    paths.push(path);
  })


  paths.map((p, i) =>
  console.log(p)

)

  return (
    <div>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]} icon={myIcon} draggable={true}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds} ref={svg}>
        <g ref={g}>
          {paths.map((p, i) =>
            <path d={p} stroke="blue" strokeWidth="3" fill="none" key={`marker-${i}`} />

          )}
        </g>
      </SVGOverlay>




    </div>
  )
}


export default Layers;
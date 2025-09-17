import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// OpenLayers
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private map: Map | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const helsingborgCoords = fromLonLat([12.6945, 56.0465]); // OpenLayers uses [lon, lat]

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: helsingborgCoords,
        zoom: 13
      })
    });

    // Placeholder markers
    const markers = [
      { coords: [12.71, 56.05], name: "School A" },
      { coords: [12.72, 56.045], name: "Hospital" },
      { coords: [12.69, 56.04], name: "Library" }
    ];

    const features = markers.map(marker => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(marker.coords)),
      });
      feature.set('name', marker.name); // Store name for popup
      return feature;
    });

    const vectorSource = new VectorSource({
      features: features,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1], // Anchor at the bottom center of the icon
          src: 'https://openlayers.org/en/latest/examples/data/icon.png', // Placeholder icon
        }),
      }),
    });

    this.map.addLayer(vectorLayer);

    // Add a click event to show popup (simple example)
    this.map.on('click', (event) => {
      this.map?.forEachFeatureAtPixel(event.pixel, (feature) => {
        const name = feature.get('name');
        if (name) {
          // In a real app, you'd use an overlay for a proper popup
          console.log('Clicked on:', name);
          alert('Clicked on: ' + name);
        }
      });
    });
  }
}

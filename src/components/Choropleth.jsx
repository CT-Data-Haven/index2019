import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { getBounds, makeGeoJson, makeTooltip } from '../utils/utils.js';
import Legend from './Legend';

import '../styles/Chart.css';

export default class Choropleth extends React.Component {
  getStyle = (feature) => {
    const name = feature.properties.name;
    const fillColor = this.props.data[name] && this.props.data[name].value != undefined ? this.props.colorscale(this.props.data[name].value) : '#ccc';
    return {
      fillColor: fillColor,
      color: '#333',
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.75
    };
  };

  handleFeature = (feature, layer) => {
    const name = feature.properties.name;
    layer
      .on('mouseover', this.featureHilite)
      .on('mouseout', this.featureUnhilite);
    layer.bindTooltip(() => (
      makeTooltip(name, this.props.data[name] ? this.props.data[name].value : null, this.props.meta.format, this.props.min)),
      { direction: 'top', offset: [0, -20], className: 'custom-tip' }
    );
  };

  featureHilite = ({ target }) => {
    target.setStyle({
      fillOpacity: 0.95,
      weight: 1
    });

  };
  featureUnhilite = ({ target }) => {
    target.setStyle({
      fillOpacity: 0.75,
      weight: 0.5
    });
  };

  render() {
    const bbox = getBounds(this.props.shape);
    const geo = makeGeoJson(this.props.shape);

    return (
      <div className='Chart Choropleth'>
        <Map
          bounds={ bbox }
          zoomSnap={ 0.5 }
          zoomDelta={ 0.5 }
          scrollWheelZoom={ false }
        >
          <TileLayer
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.{ ext }"
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            subdomains="abcd"
            minZoom={ 8 }
            maxZoom={ 16 }
            ext="png"
            opacity={ 0.4 }
          />
          <GeoJSON
            key={ (feature) => feature.properties.name }
            data={ geo }
            style={ this.getStyle }
            interactive={ true }
            onEachFeature={ this.handleFeature }
            onClick={ this.props.onClick }
          />
        </Map>

        <Legend
          scale={ this.props.colorscale }
          format={ this.props.meta.format }
          type='threshold'
          style={ {
            right: 0,
            bottom: 0
          } }
        />
      </div>
    )
  }
}

import React from 'react';
import { connect } from 'react-redux'
import { YMaps, Map, Placemark, Polyline } from "react-yandex-maps";

import { updateMarkersList, saveMapParams } from 'modules/App/actions'

class YandexMap extends React.Component {

  handleDragMarkers = (event, id) => {
    event.stopPropagation();
    const newCords = event.originalEvent.target.geometry._coordinates;

    let listMarkers = [...this.props.listMarkers];
    listMarkers.some((marker, index) => {
      if (marker.id === id) {
        listMarkers.splice(index, 1, {
          ...marker,
          coordinates: newCords,
        });

        this.props.updateMarkersList(listMarkers);
        return true;
      }
      return false;
    });
    return 0;
  }

  getPolyline = listMarkers => {
    const polyline = listMarkers.map(marker => {
      return marker.coordinates;
    });

    return polyline;
  }

  onBoundsChange = () => {
    if(this.mapRef) this.props.saveMapParams(this.mapRef.getCenter())
  };

  render() {
    const { listMarkers, mapParams } = this.props;

    return (
      <YMaps>
        <Map
          state={mapParams}
          width="400px"
          height="400px"
          instanceRef={mapParams => this.mapRef = mapParams}
          onBoundsChange={this.onBoundsChange}
        >
          {
            listMarkers.map(marker => (
              <Placemark
                key={marker.id}
                geometry={{ coordinates: marker.coordinates }}
                properties={{
                  hintContent: marker.name,
                  balloonContent: marker.description,
                }}
                options={{
                  draggable: true,
                }}
                //onDragEnd={this.handleDragEnd}
                onGeometryChange={(event) => this.handleDragMarkers(event, marker.id)}
              />
            ))
          }
          <Polyline
            geometry={{
              coordinates: this.getPolyline(listMarkers),
            }}
            options={{
              strokeColor: '#000000',
              strokeWidth: 4,
            }}
          />
        </Map>
      </YMaps>
    );
  }
}

export default connect(state => ({
  listMarkers: state.markersList,
  mapParams: state.mapParams
}), ({
  updateMarkersList,
  saveMapParams
}))(YandexMap);
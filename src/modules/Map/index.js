import React from 'react';
import { connect } from 'react-redux'
import { YMaps, Map, Placemark, Polyline } from "react-yandex-maps";

import { updateMarkersList } from 'modules/App/actions'

class YandexMap extends React.Component {

  handleDragMarkers = (event, id) => {
    event.stopPropagation();
    const newCords = event.originalEvent.target.geometry._coordinates;

    let listMarkers = [...this.props.listMarkers];
    listMarkers.some((marker, index) => {
      if (marker.id === id) {
        listMarkers.splice(index, 1, {
          id: id,
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

  render() {
    const { listMarkers, mapParams } = this.props;

    return (
      <YMaps>
        <Map
          state={mapParams}
          width="400px"
          height="400px"
        >
          {
            listMarkers.map(marker => (
              <Placemark
                key={marker.id}
                geometry={{ coordinates: marker.coordinates }}
                properties={{
                  hintContent: `#${marker.id}`,
                  balloonContent: `Beautiful marker #${marker.id}`,
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
}))(YandexMap);
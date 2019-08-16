import React from 'react';
import { connect } from 'react-redux'

import { addMarker } from 'modules/App/actions'

class MarkerInput extends React.Component {
  state = {
    markerName: '',
  }

  handleChange = e => this.setState({ markerName: e.target.value });

  getDescription = cords => {
    return fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=96165b0d-80ce-4e4e-91ee-ce7311f79e7e&format=json&geocode=${cords.join(',')}&sco=latlong`)
    .then(res => res.json())
    .then(res => {
      const geoObject = res.response.GeoObjectCollection.featureMember[0].GeoObject
      return `${geoObject.description} - ${geoObject.name}`
    })
  }

  handleSumbit = e => {
    e.preventDefault();
    
    if (this.props.markersList.some(marker => 
      marker.name === this.state.markerName
    ) || !this.state.markerName)
      return alert('Name is busy or invalid. Try again.');

    this.getDescription(this.props.cords)
      .then(description => {

        this.props.addMarker({
          cords: this.props.cords,
          name: this.state.markerName,
          description
        })
    
        this.setState({ markerName: '' })
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSumbit}>
        <input
          value={this.state.markerName}
          onChange={this.handleChange}
          className="w-100"
          type="text" 
          placeholder="New point of routes" 
          style={{ border: '2px solid #000', padding: '5px 10px' }} />
      </form>
    );
  }
}

export default connect(state => ({
  cords: state.mapParams.center,
  markersList: state.markersList
}), ({
  addMarker,
}))(MarkerInput);
import React from 'react';
import { connect } from 'react-redux'

import { addMarker } from 'modules/App/actions'

class MarkerInput extends React.Component {
  state = {
    cords: '',
  }

  handleChange = e => this.setState({ cords: e.target.value });

  handleSumbit = e => {
    e.preventDefault();
    
    let cordsArr
    try {
      cordsArr = this.getCords(this.state.cords);
    } catch (err) {
      return alert(err.message);
    }

    this.props.addMarker(cordsArr)

    this.setState({ cords: '' });
  }

  getCords(cords) {
    const arrCords = cords.split(' ');

    if (this.isInvalidCords(arrCords))
      throw new Error('Coordinates is invalid. Try again.');

    arrCords[0] = +arrCords[0];
    arrCords[1] = +arrCords[1];

    return arrCords;
  }

  isInvalidCords = arrCords => (
    arrCords.length !== 2 ||
    isNaN(arrCords[0]) ||
    isNaN(arrCords[1]) ||
    arrCords[0] === '' ||
    arrCords[1] === ''
  )

  render() {
    return (
      <form onSubmit={this.handleSumbit}>
        <input
          value={this.state.cords}
          onChange={this.handleChange}
          className="w-100"
          type="text" 
          placeholder="New point of routes" 
          style={{ border: '2px solid #000', padding: '5px 10px' }} />
      </form>
    );
  }
}

export default connect(null, ({
  addMarker,
}))(MarkerInput);
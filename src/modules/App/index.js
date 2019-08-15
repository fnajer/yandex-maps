import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import MarkerInput from '../MarkerInput';
import ListMarkers from '../ListMarkers';
import Map from '../Map';

class App extends React.Component {
  render() {
    return (
      <Container as="main">
        <Row as="section" className="justify-content-center">
          <Col xs={5} className="ml-auto mr-auto mb-3">
            <MarkerInput />
            <ListMarkers />
          </Col>
          <Col xs={7} className="d-flex justify-content-center">
            <Map />
          </Col>
        </Row>
      </Container>
    );
  }
}


export default App;

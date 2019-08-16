import React from 'react';
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd';
import { Button, ListGroup } from 'react-bootstrap'

import { removeMarker } from 'modules/App/actions'

class ItemList extends React.Component {

  getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging ? 'lightgreen' : 'grey',
  
    ...draggableStyle,
  })

  render() {
    const { marker, index } = this.props;
    
    return (
      <Draggable draggableId={marker.id} index={index}>
        {
          (provided, snapshot) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-center"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={
                this.getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )
              }
            >
              {marker.name}
              <Button 
                variant="primary" 
                className="badge badge-primary badge-pill"
                onClick={() => this.props.removeMarker(marker.id)}
              >
                X
              </Button>
            </ListGroup.Item>
          )
        }
      </Draggable>
    );
  }
}

export default connect(null, ({
  removeMarker,
}))(ItemList);

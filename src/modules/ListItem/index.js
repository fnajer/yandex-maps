import React from 'react';
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd';

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
      <Draggable draggableId={`${marker.id}`} index={index}>
        {
          (provided, snapshot) => (
            <li
              className="d-flex list-group-item list-group-item-dark justify-content-between align-items-center"
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
              Point of routes {marker.id}

              <button
                className="badge badge-primary badge-pill"
                onClick={() => this.props.removeMarker(marker.id)}
              >X</button>
            </li>
          )
        }
      </Draggable>
    );
  }
}

export default connect(null, ({
  removeMarker,
}))(ItemList);

import { createReducer } from 'redux-act'
import nanoid from 'nanoid'

import { 
  addMarker,
  updateMarkersList,
  removeMarker,
  saveMapParams
} from 'modules/App/actions'

const initialState = {
  markersList: [
    {
      id: '0',
      name: 'Point of routes 0',
      coordinates: [55.76, 37.64],
      description: 'Moscow - static marker'
    },
    {
      id: '1',
      name: 'Point of routes 1',
      coordinates: [55.86, 37.84],
      description: 'Moscow - static marker'
    },
    {
      id: '2',
      name: 'Point of routes 2',
      coordinates: [55.76, 37.74],
      description: 'Moscow - static marker'
    }
  ],
  mapParams: {
    center: [55.76, 37.64],
    zoom: 9,
  },
}

export default createReducer(
  {
    [updateMarkersList]: (state, payload) => ({
      ...state,
      markersList: payload,
    }),
    [saveMapParams]: (state, payload) => ({
      ...state,
      mapParams: { ...state.mapParams, center: payload },
    }),
    [addMarker]: (state, payload) => {
      const newMarker = {
        id: nanoid(),
        name: payload.name,
        description: payload.description,
        coordinates: payload.cords,
      };

      const markersList = [...state.markersList]
      markersList.push(newMarker);

      return {
        ...state,
        markersList,
      }
    },
    [removeMarker]: (state, payload) => {
      const index = state.markersList.findIndex(marker => (
        marker.id === payload
      ))
     
      const markersList = [...state.markersList]
      markersList.splice(index, 1);

      return {
        ...state,
        markersList,
      }
    },
  },
  initialState
)
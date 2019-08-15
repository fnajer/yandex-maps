import { createReducer } from 'redux-act'

import { 
  addMarker,
  updateMarkersList,
  removeMarker,
  saveMapParams
} from 'modules/App/actions'

const initialState = {
  markersList: [
    {
      id: 0,
      coordinates: [55.76, 37.64],
    },
    {
      id: 1,
      coordinates: [55.86, 37.84],
    },
    {
      id: 2,
      coordinates: [55.76, 37.74],
    }
  ],
  mapParams: {
    center: [55.76, 37.64],
    zoom: 9,
  },
  maxId: 2
}

function getMarkerId(length, maxId) {
  if (length > 0) {
    maxId += 1;
  } else {
    maxId = 0;
  }
  return maxId;
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
        id: getMarkerId(state.markersList.length, state.maxId),
        coordinates: payload,
      };

      const markersList = [...state.markersList]
      markersList.push(newMarker);

      const center = payload;
      const mapParams = { ...state.mapParams, center };
      
      return {
        ...state,
        markersList,
        mapParams,
        maxId: newMarker.id
      }
    },
    [removeMarker]: (state, payload) => {
      const index = state.markersList.findIndex(marker => (
        marker.id === payload
      ))
      // const maxId = payload === state.maxId ? state.maxId - 1 : state.maxId
      
      const markersList = [...state.markersList]
      markersList.splice(index, 1);
      const maxId = markersList.reduce((acc, marker) => marker.id > acc ? marker.id : acc, 0)
      return {
        ...state,
        markersList,
        maxId
      }
    },
  },
  initialState
)
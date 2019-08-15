import { createAction } from 'redux-act'

export const addMarker = createAction('Add marker to markers list')
export const updateMarkersList = createAction('Update markers list')
export const removeMarker = createAction('Remove marker from markers list')

export const saveMapParams = createAction('Save map parameters')
import { combineReducers } from 'redux'

const run = (state = initializeState(), action) => {
  switch(action.type) {

    case "START_ACTIVITY":
      return startActivity(state, action)
    case "END_ACTIVITY":
      return endActivity(state, action)
    default: 
      return state

  }

}


function startActivity(state, action) {
  const { id, description, startTime } = action
  const { activities } = state
  const newState = Object.assign({}, state, {
    activities: activities.concat([{ id, description, startTime, endTime: null }])
  })
  setSessionStorage(newState)
  return newState
}

function endActivity(state, action) {
  const { id, endTime } = action
  const { activities } = state
  const activityIndex = activities.findIndex((a) => a.id === id)
  const newActivity = Object.assign({}, activities[activityIndex], { endTime })

  const newActivities = activities.slice()
  newActivities[activityIndex] = newActivity

  const newState = Object.assign({}, state, { activities: newActivities })
  setSessionStorage(newState)
  return newState
}

function initializeState () {
  const state = {
    activities: []
  }
  setSessionStorage(state)
  return state
}

function setSessionStorage (state) {
  sessionStorage.setItem('state', state)
}

export default run

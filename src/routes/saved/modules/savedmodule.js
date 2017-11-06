// ------------------------------------
// Constants
// ------------------------------------



// ------------------------------------
// Actions
// ------------------------------------



/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// ------------------------------------
// Async Actions
// ------------------------------------

// HERE

// ------------------------------------
// Export Actions
// ------------------------------------

export const actions = {
  // Action List
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

}

// ------------------------------------
// SET_INITIAL_STATE_HERE
// ------------------------------------

const initialState = {

}

// ------------------------------------
// Reducer
// ------------------------------------

export default function SavedReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

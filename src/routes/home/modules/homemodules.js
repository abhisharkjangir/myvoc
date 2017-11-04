// ------------------------------------
// Constants
// ------------------------------------
export const SET_WORD_LIMIT = "SET_WORD_LIMIT"
export const SET_LIMIT_STATUS = "SET_LIMIT_STATUS"
export const SAVE_RANDOM_WORDS = "SET_RANDOM_WORDS"
// ------------------------------------
// Actions
// ------------------------------------

export function setQuestionLimit (limit) {
  return {
    type : SET_WORD_LIMIT,
    payload : limit
  }
}

export function setLimitStatus () {
  return {
    type : SET_LIMIT_STATUS
  }
}

export function fetchAndSaveRandomWords (words) {
  return {
    type : SAVE_RANDOM_WORDS,
    payload : words
  }
}

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
  setQuestionLimit
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_WORD_LIMIT] : (s,a) => Object.assign({}, s, { questionLimit: s.questionLimit == a.payload?undefined: a.payload}),
  [SET_LIMIT_STATUS] : (s) => Object.assign({}, s, { isLimitSet: true}),
  [SAVE_RANDOM_WORDS] : (s,a) => Object.assign({}, s, { randomWords : a.payload})
}

// ------------------------------------
// SET_INITIAL_STATE_HERE
// ------------------------------------

const initialState = {
  questionLimit : undefined,
  isLimitSet : false
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function HomeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/quiz',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Quiz = require('./containers/quizcontainer').default
      const reducer = require('./modules/quizmodule').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'quiz', reducer })

      /*  Return getComponent   */
      cb(null, Quiz)

    /* Webpack named bundle   */
  }, 'quiz')
  }
})

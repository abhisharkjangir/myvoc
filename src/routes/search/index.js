import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/search',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Search = require('./containers/searchcontainer').default
      const reducer = require('./modules/searchmodule').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'search', reducer })

      /*  Return getComponent   */
      cb(null, Search)

    /* Webpack named bundle   */
  }, 'search')
  }
})

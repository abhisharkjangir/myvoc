const logger = require('../lib/logger')

logger.info('Your server is starting...')
require('../../server/main').listen(3000, () => {
  logger.success('Server is running at http://localhost:3000')
})

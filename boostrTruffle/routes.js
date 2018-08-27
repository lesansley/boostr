const routes = require('next-routes')();

routes
	.add('/boostrs/new', '/boostrs/new')
	.add('/boostrs/:address', '/boostrs/show')
	.add('/boostrs/:address/requests', '/boostrs/requests/show')
	.add('/boostrs/:address/requests/new', '/boostrs/requests/new');

module.exports = routes;

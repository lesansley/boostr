require('./env');
const next = require('next');
const { createServer } = require('http');

const routes = require('./routes');
const config = require('./config/config');

const app = next({
	dev: config.env !== 'production'
});
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
	createServer(handler).listen(config.port, err => {
		if (err) throw err;
		console.log(`Ready on localhost:${config.port}`);
	});
});

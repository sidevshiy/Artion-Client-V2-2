const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

const app = new Vue({
	template: '<h1>{{ rand }}</h1>',
	data: {
		rand: Math.random()
	}
});

server.get('*', (req, res) => {
	renderer.renderToString(app, (err, html) => {
		if(err) {
			console.log(err);
		}
		res.end(html);
	});
});

server.listen(3080); 
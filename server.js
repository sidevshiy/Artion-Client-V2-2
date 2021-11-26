const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer();
const serverBundle = require('./dist/js/server-bundle.js');

// console.log(serverBundle);

// const app = new Vue({
// 	template: '<h1>{{ rand }}</h1>',
// 	data: {
// 		rand: Math.random()
// 	}
// });

server.get('*', (req, res) => {
	renderer.renderToString(serverBundle, (err, html) => {
		if(err) {
			console.log(err);
		}
		res.end(html);
	});
});

server.listen(3080);
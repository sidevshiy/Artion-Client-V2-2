import createApp from '@/app.js';

export default context => new Promise(resolve => {
	createApp(context).then(app => {
		context.rendered = () => {
			//context.title = app.$store.getters['meta/title'];
		}

		resolve(app);
	})
});
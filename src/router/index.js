import Vue from 'vue';
import Router from 'vue-router';
import Loading from '@/components/Loading';
import Start from '@/components/Start';

Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		component: Loading,
	}, {
		path: '/Start',
		component: Start,
	}],
});

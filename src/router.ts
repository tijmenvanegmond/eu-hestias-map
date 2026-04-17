import { createRouter, createWebHashHistory } from 'vue-router';
import MapView from './views/MapView.vue';
import DocumentView from './views/DocumentView.vue';

const routes = [
  { path: '/', component: MapView },
  { path: '/charter', component: DocumentView, props: { source: 'charter' } },
  { path: '/manifesto', component: DocumentView, props: { source: 'manifesto' } },
  { path: '/commentary', component: DocumentView, props: { source: 'commentary' } },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});

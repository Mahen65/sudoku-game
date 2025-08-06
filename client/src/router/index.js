import { createRouter, createWebHistory } from 'vue-router';
import SudokuGame from '../views/Game.vue';

const routes = [
  {
    path: '/',
    name: 'SudokuGame',
    component: SudokuGame,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

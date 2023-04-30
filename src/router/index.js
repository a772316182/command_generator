import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewExperiment from "@/views/NewExperiment.vue";
import ExecuteExperiment from "@/views/ExecuteExperiment.vue";
import ExperimentHistory from "@/views/ExperimentHistory.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/NewExperiment',
        name: 'NewExperiment',
        component: NewExperiment
    },
    {
        path: '/ExecuteExperiment',
        name: 'ExecuteExperiment',
        component: ExecuteExperiment
    },
    {
        path: '/ExperimentHistory',
        name: 'ExperimentHistory',
        component: ExperimentHistory
    },
]

const router = new VueRouter({
    routes
})

export default router


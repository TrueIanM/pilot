import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import ReportView from "../views/ReportView.vue";
import StartView from "../views/StartPage.vue";
import Login from "../views/Login.vue";
import Register from "../views/RegisterView.vue";
import SelectExam from "../views/SelectExam.vue";
import About from "../views/about.vue";
import ContactUs from "../views/ContactUs.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: StartView
    },
    {
      path: "/select",
      name: "select",
      component: SelectExam
    },
    {
      path: "/exam",
      name: "exam",
      component: HomeView
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },

    {
      path: "/report",
      name: "report",
      component: ReportView
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/contactus",
      name: "contactus",
      component: ContactUs
    }
  ]
});

export default router;

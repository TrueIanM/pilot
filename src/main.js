// Main entry point for Vue application: sets up Vue, Pinia, Router, PrimeVue, FontAwesome, and Axios

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PrimeVue from "primevue/config";
import "./assets/base.css";

// FontAwesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faCircleCheck,
  faComments,
  faClipboard,
  faEye,
  faEyeSlash,
  faFileImage,
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleRight,
  faAngleLeft,
  faAnglesLeft,
  faAnglesRight,
  faTriangleExclamation,
  faPaperclip,
  faThumbTack,
  faPlay,
  faNewspaper,
  faUserAlt,
  faUserAltSlash,
  faThumbsDown,
  faThumbsUp,
  faNavicon,
  faCheck,
  faTableCells,
  faExclamationCircle,
  faArrowRight,
  faBarsStaggered,
  faPlus,
  faPenToSquare,
  faDiagramProject,
  faLightbulb,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";

// Axios import
import axios from "axios";

// PrimeVue component imports
import "primevue/resources/themes/aura-light-green/theme.css";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Message from "primevue/message";

// Create Vue app
const app = createApp(App);

// Add FontAwesome icons to library
library.add(
  faPlay,
  faUser,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
  faAnglesLeft,
  faAnglesRight,
  faCircleCheck,
  faTriangleExclamation,
  faPaperclip,
  faThumbTack,
  faNewspaper,
  faComments,
  faClipboard,
  faUserAlt,
  faUserAltSlash,
  faThumbsUp,
  faThumbsDown,
  faNavicon,
  faCheck,
  faTableCells,
  faExclamationCircle,
  faArrowRight,
  faBarsStaggered,
  faEye,
  faEyeSlash,
  faFileImage,
  faPlus,
  faPenToSquare,
  faCircleQuestion,
  faDiagramProject,
  faLightbulb,
  faRotate
);

// Register plugins
app.use(createPinia());
app.use(router);
app.use(PrimeVue);

// Register global components
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("FloatLabel", FloatLabel);
app.component("InputText", InputText);
app.component("Message", Message);

// Axios default configuration
axios.defaults.baseURL = "https://aviationexamkenya.com/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Mount Vue app
app.mount("#app");

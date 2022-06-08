import { createApp } from "vue";
import App from "./App.vue";
import VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import AbsurdImage from "./components/AbsurdImage.vue";

const app = createApp(App);
app.use(VueVirtualScroller);
app.component("absurd-image", AbsurdImage);
app.mount("#app");

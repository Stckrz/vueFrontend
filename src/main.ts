import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ShopItemTable from './components/shopItems/ShopItemTable.vue';
import NewShopItem from "./components/shopItems/newShopItem.vue";
import ShopItemParReport from "./components/shopItems/shopItemParReport.vue";


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/inventory", component: ShopItemTable },
		{ path: "/newItem", component: NewShopItem },
		{ path: "/parReport", component: ShopItemParReport },
	]
});
const app = createApp(App);
app.use(router);
app.mount('#app');

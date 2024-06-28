import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ShopItemTable from './components/shopItems/ShopItemTable.vue';
import NewShopItem from "./components/shopItems/newShopItem.vue";
import ShopItemParReport from "./components/shopItems/shopItemParReport.vue";
import purchaseReportsIndex from "./components/purchaseReports/purchaseReportsIndex.vue";
import purchaseReport from "./components/purchaseReports/purchaseReport.vue";


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/inventory", component: ShopItemTable },
		{ path: "/newItem", component: NewShopItem },
		{ path: "/parReport", component: ShopItemParReport },
		{ path: "/purchaseReports", component: purchaseReportsIndex },
		{ path: "/purchaseReports/:id", name: "purchaseReport", component: purchaseReport },
	]
});
const app = createApp(App);
app.use(router);
app.mount('#app');

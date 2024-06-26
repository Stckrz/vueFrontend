<script lang="ts">
import { ref, defineComponent } from "vue";
import ShopItemTable from "./components/shopItems/ShopItemTable.vue"
import NewShopItem from "./components/shopItems/newShopItem.vue"


import Count from './components/Count.vue'

export default defineComponent({
	name: "App",
	components: {
		Count,
		ShopItemTable,
		NewShopItem
	},
	setup() {
		const type = ref("ShopItemTable")
		const setType = (newType: string) => type.value = newType
		return { type, setType }
	}
});

</script>

<template>
	<nav class="navbar">
		<RouterLink class="navItem" to="/inventory">Inventory</RouterLink>
		<RouterLink class="navItem" to="/newItem">New Item</RouterLink>
		<RouterLink class="navItem" to="/parReport">Par Report</RouterLink>
	</nav>
	<div class="appContainer">
		<!-- <div> -->
			<RouterView></RouterView>
		<!-- </div> -->
	</div>
</template>

<style scoped>
.navbar {
	width: 100vw;
	height: 6%;
	display: flex;
	align-items: center;
	background-color: #737994;
	user-select: none;
}

.navItem {
	padding-left: 5px;
	padding-right: 5px;
	display: flex;
	height: 90%;
	align-items: center;
	color: white;
	border-right: 1px solid black;
	cursor: pointer;
}

.appContainer {
	display: flex;
	align-self: center;
	flex-grow: 1;
	justify-content: center;
	align-items: flex-start;
	width: 90%;
	padding: 2rem;
}

.contentsContainer {
	width: 100%;
	display: flex;
	justify-content: center;

}</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ShopItem, ItemCount } from "../../models/shopItemModel";
import { fetchSaleItems, fetchSaleItemsCount, fetchSaleItemBySearchString } from "../../library/fetch/storeItemFetch";
import Pagination from "./../Pagination.vue";
import ShopItemTableItem from './shopItemTableItem.vue';
import TableRender from '../tableRender.vue';

export default defineComponent({
	name: "ShopItemTable",
	components: {
		Pagination,
		ShopItemTableItem,
		TableRender
	},
	props: {
		tableType: {
			type: String,
			default: "inventory",
		},
	},
	setup(props) {
		const tableType = props.tableType;
		const shopItems = ref<ShopItem[]>([]);
		const totalShopItemsCount = ref();
		const totalPages = ref();
		const currentPage = ref();
		const searchField = '';
		const setPage = (page: number) => {
			currentPage.value = page;
			fetchSaleItems(page).then((data: ShopItem[]) => { shopItems.value = data })
		}
		const saleItemSearch = (searchString: string) => {
			fetchSaleItemBySearchString(searchString).then((data) => shopItems.value = data);

		}

		onMounted(() => {
			fetchSaleItems(1).then((data) => {
				shopItems.value = data

			})
			fetchSaleItemsCount().then((count: ItemCount) => {
				totalShopItemsCount.value = count.totalItems;
				totalPages.value = count.numberOfPages;
			})

		})
		return { shopItems, currentPage, setPage, totalShopItemsCount, totalPages, tableType, saleItemSearch, searchField }
	}
})
</script>

<template>
	<div class="tablePageContainer">
		<div class="searchBox">
			<input v-model="searchField">
			</input>
			<button @click="saleItemSearch(searchField)">
				Search
			</button>
		</div>
		<div class="itemCount">{{ totalShopItemsCount }}</div>
		<TableRender :objectArray="shopItems" linkKey="shopItemId" linkUrl="/shopItem" />
		<div v-if="totalShopItemsCount">
			<Pagination :setPage="setPage" :numberOfPages="totalPages" />
		</div>
	</div>
</template>

<style scoped>
.tablePageContainer {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: flex-end;
}

.searchBox {
	display: flex;
	justify-content: center;
	align-items: center;
}

.searchBox button {
	padding: 2px 5px 2px 5px;
	border-radius: 5px;
}

.searchBox input {
	border-radius: 5px;
}
</style>

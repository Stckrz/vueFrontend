<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";
import { ShopItem, ItemCount } from "../../models/shopItemModel";
import { fetchSaleItems, fetchSaleItemsCount, fetchBelowPar } from "../../library/fetch/storeItemFetch";
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
		dataCallback: {
			type: Function as PropType<(itemIdArray: ShopItem[]) => void>,
			required: false,
		},
	},
	setup(props) {
		const tableType = props.tableType;
		const shopItems = ref<ShopItem[]>([]);
		const totalShopItemsCount = ref();
		const totalPages = ref();
		const currentPage = ref();
		const setPage = (page: number) => {
			currentPage.value = page;
			fetchSaleItems(page).then((data: ShopItem[]) => { shopItems.value = data })
		}

		onMounted(() => {
			switch (props.tableType) {
				case "inventory": {
					fetchSaleItems(1).then((data) => shopItems.value = data)
					fetchSaleItemsCount().then((count: ItemCount) => {
						totalShopItemsCount.value = count.totalItems;
						totalPages.value = count.numberOfPages;
					})
					break;
				}
				case "parReport": {
					fetchBelowPar().then((data) => {
						shopItems.value = data;
						props.dataCallback(data);
					});
					break;
				}
			}
		})
		return { shopItems, currentPage, setPage, totalShopItemsCount, totalPages, tableType }
	},
})
</script>

<template>
	<div class="tablePageContainer">
		<div class="itemCount">{{ totalShopItemsCount }}</div>
		<TableRender :objectArray="shopItems"/>
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
</style>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";
import { ShopItem, ItemCount } from "../../models/shopItemModel";
import { fetchSaleItems, fetchSaleItemsCount, fetchBelowPar } from "../../library/fetch/storeItemFetch";
import Pagination from "./../Pagination.vue";

export default defineComponent({
	name: "ShopItemTable",
	components: {
		Pagination
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
	<table>
		<tr>
			<th>id</th>
			<th>name</th>
			<th>price</th>
			<th>quantity</th>
			<th>par amount</th>
		</tr>
		<tr v-for="item in shopItems" :key="item.shopItemId">
			<td>{{ item.shopItemId }}</td>
			<td>{{ item.shopItemName }}</td>
			<td>{{ item.price }}</td>
			<td>{{ item.quantity }}</td>
			<td>{{ item.parAmount }}</td>
		</tr>
	</table>
	<div v-if="totalShopItemsCount">
		<Pagination :setPage="setPage" :numberOfPages="totalPages" />
	</div>
</template>

<style></style>

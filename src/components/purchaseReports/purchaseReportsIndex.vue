<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { fetchBulkPurchase, fetchBulkPurchaseById } from '../../library/fetch/bulkPurchaseFetch';
import { fetchPurchaseReportCount } from '../../library/fetch/storeItemFetch';
import { BulkPurchase } from '../../models/bulkPurchaseModel';
import { ItemCount } from '../../models/shopItemModel';
import Pagination from '../Pagination.vue';
export default defineComponent({
	name: "purchaseReportsIndex",
	components: {
		Pagination
	},
	setup() {
		const bulkPurchases = ref();
		const totalBulkPurchaseCount = ref()

		const totalPages = ref();
		const currentPage = ref();
		const setPage = (page: number) => {
			currentPage.value = page;
			fetchBulkPurchase(page).then((data: BulkPurchase[]) => { bulkPurchases.value = data })
		}

		onMounted(() => {
			fetchBulkPurchase(1).then((data) => {
				bulkPurchases.value = data;
			})
			fetchPurchaseReportCount().then((count: ItemCount) => {
				totalBulkPurchaseCount.value = count.totalItems;
				totalPages.value = count.numberOfPages;
			})
		})
		return { bulkPurchases, totalBulkPurchaseCount, setPage, currentPage, totalPages }
	}
})
</script>

<template>
	<div class="tablePageContainer">
		<table>
			<tr>
				<th>Purchase Id</th>
				<th>Date</th>
				<th>total Purchase Price</th>
			</tr>
			<tr v-for="item in bulkPurchases" :key="item.bulkPurchaseId">
				<td>
					<RouterLink class="navItem" :to="'/purchaseReports/' + item.bulkPurchaseId">{{ item.bulkPurchaseId }}
					</RouterLink>
				</td>
				<td>{{ item.purchaseDate }}</td>
				<td>{{ item.totalPurchaseAmount }}</td>
			</tr>
		</table>
		<div v-if="totalBulkPurchaseCount">
			<Pagination :setPage="setPage" :numberOfPages="totalPages" />
		</div>
	</div>
</template>

<!-- 		onMounted(() => { -->
<!-- 			fetchSaleItems(1).then((data) => shopItems.value = data) -->
<!-- 			fetchSaleItemsCount().then((count: ItemCount) => { -->
<!-- 				totalShopItemsCount.value = count.totalItems; -->
<!-- 				totalPages.value = count.numberOfPages; -->
<!-- 			}) -->
<!-- 		}) -->
<!-- 		return { shopItems, currentPage, setPage, totalShopItemsCount, totalPages, tableType } -->
<!-- 	} -->
<!-- }) -->
<!-- </script> -->
<!---->
<!-- <template> -->
<!-- 	<div class="tablePageContainer"> -->
<!-- 		<div class="itemCount">{{ totalShopItemsCount }}</div> -->
<!-- 		<TableRender :objectArray="shopItems" /> -->
<!-- 		<div v-if="totalShopItemsCount"> -->
<!-- 			<Pagination :setPage="setPage" :numberOfPages="totalPages" /> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- </template> -->

<style></style>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { fetchBulkPurchase } from '../../library/fetch/bulkPurchaseFetch';
import { fetchPurchaseReportCount } from '../../library/fetch/storeItemFetch';
import { BulkPurchase } from '../../models/bulkPurchaseModel';
import { ItemCount } from '../../models/shopItemModel';
import Pagination from '../Pagination.vue';
import TableRender from '../tableRender.vue';

export default defineComponent({
	name: "purchaseReportsIndex",
	components: {
		Pagination,
		TableRender
	},
	setup() {
		const bulkPurchases = ref();
		const totalBulkPurchaseCount = ref();

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
		<TableRender :objectArray="bulkPurchases" linkKey="bulkPurchaseId" linkUrl="/purchaseReports" />
		<div v-if="totalBulkPurchaseCount">
			<Pagination :setPage="setPage" :numberOfPages="totalPages" />
		</div>
	</div>
</template>

<style></style>

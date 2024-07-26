<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { fetchBulkPurchaseById, fetchPurchasedItemsByPurchaseId } from '../../library/fetch/bulkPurchaseFetch';
import { useRoute } from 'vue-router';
import { BulkPurchase, PurchasedItem } from '../../models/bulkPurchaseModel';
import TableRender from '../tableRender.vue';
export default defineComponent({
	name: 'purchaseReport',
	components: {
		TableRender
	},
	setup() {
		const route = useRoute();
		const bulkPurchaseId = route.params.id as string;
		const bulkPurchaseData = ref<BulkPurchase | null>(null)
		const bulkPurchaseItems = ref<PurchasedItem[]>([])

		onMounted(() => {
			fetchBulkPurchaseById(parseInt(bulkPurchaseId)).then((data) => {
				bulkPurchaseData.value = data[0]
				console.log("bulkPurchaseData", bulkPurchaseData.value)
			})
			fetchPurchasedItemsByPurchaseId(parseInt(bulkPurchaseId)).then((data) => {
				bulkPurchaseItems.value = data
			})
			watch(bulkPurchaseData, (newValue) => {
				console.log('Bulk Purchase Data Updated:', newValue);
			});
		})
		return { bulkPurchaseItems, bulkPurchaseData }
	},
})
</script>

<template>
	<div class="tableContainer">
		<div class="bulkPurchaseData" v-if="bulkPurchaseData">
			<div>Bulk Purchase Id: {{ bulkPurchaseData.bulkPurchaseId }}</div>
			<div>Purchase Date: {{ bulkPurchaseData.purchaseDate }}</div>
			<div>Total Purchase Amount: {{ bulkPurchaseData.totalPurchaseAmount }}</div>
		</div>
		<!-- <div class="bulkPurchaseItemsTable" v-if="bulkPurchaseItems.length > 0"> -->
		<div class="bulkPurchaseItemsTable">
			<TableRender :objectArray="bulkPurchaseItems" />
		</div>
	</div>
</template>

<style scoped>
.tableContainer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.bulkPurchaseData {
	display: flex;
	margin: 10px 0px 10px 0px;
	flex-direction: column;
	width: 100%;
	color: white;
	padding: 5px;
	border-radius: 0.5em;
	background-color: #737994;
}
</style>

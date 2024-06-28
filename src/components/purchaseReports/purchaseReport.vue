<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { fetchBulkPurchase, fetchPurchasedItemsByPurchaseId } from '../../library/fetch/bulkPurchaseFetch';
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
		const bulkPurchaseId = route.params.id
		const bulkPurchaseData = ref<BulkPurchase | null>(null)
		const bulkPurchaseItems = ref<PurchasedItem[]>([])

		onMounted(() => {
			fetchBulkPurchase(bulkPurchaseId).then((data) => {
				bulkPurchaseData.value = data
			})
			fetchPurchasedItemsByPurchaseId(bulkPurchaseId).then((data) => {
				bulkPurchaseItems.value = data
			})
		})
		return { bulkPurchaseItems, bulkPurchaseData }
	},
})
</script>

<template>
	<div class="tableContainer">
		<div>{{ $route.params.id }}</div>
		<div v-if="bulkPurchaseItems.length > 0">
			<TableRender :objectArray="bulkPurchaseItems" />
		</div>
	</div>
</template>

<style>

</style>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { fetchBulkPurchase } from '../../library/fetch/bulkPurchaseFetch';
import { BulkPurchase } from '../../models/bulkPurchaseModel';
export default defineComponent({
	name: "purchaseReportsIndex",
	setup() {
		const bulkPurchases = ref();
		onMounted(() => {
			fetchBulkPurchase().then((data) => {
				bulkPurchases.value = data;
			})
		})
		return {bulkPurchases}
	}
})
</script>

<template>
	<table>
		<tr>
			<th>Purchase Id</th>
			<th>Date</th>
			<th>total Purchase Price</th>
		</tr>
		<tr v-for="item in bulkPurchases" :key="item.bulkPurchaseId">
			<td><RouterLink class="navItem" :to="'/purchaseReports/' + item.bulkPurchaseId">{{item.bulkPurchaseId}}</RouterLink></td>
			<td>{{ item.purchaseDate }}</td>
			<td>{{ item.totalPurchaseAmount }}</td>
		</tr>
	</table>
</template>

<style></style>

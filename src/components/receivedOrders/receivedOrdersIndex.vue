<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Pagination from '../Pagination.vue';
import { fetchReceivedOrders } from '../../library/fetch/orderedItemsFetch';
import { ReceivedOrder } from '../../models/receivedOrder';

export default defineComponent({
	name: "receivedOrdersIndex",
	components: {
		Pagination
	},
	setup() {

		const receivedOrders = ref();
		// const totalReceivedOrdersCount = ref()

		const totalPages = ref();
		const currentPage = ref();
		const setPage = (page: number) => {
			currentPage.value = page;
			fetchReceivedOrders(page).then((data: ReceivedOrder[]) => { receivedOrders.value = data })
		}

		onMounted(() => {
			fetchReceivedOrders(1).then((data) => {
				receivedOrders.value = data;
			})
			/*			fetchPurchaseReportCount().then((count: ItemCount) => {
							totalBulkPurchaseCount.value = count.totalItems;
							totalPages.value = count.numberOfPages;
						})*/
		})
		return {
			receivedOrders,
			//totalBulkPurchaseCount, 
			setPage,
			currentPage,
			totalPages
		}
	}

})	
</script>

<template>
	<div class="tablePageContainer">
		<table>
			<tr>
				<th>Purchase Id</th>
				<th>Order Date</th>
				<th>Total Purchase Price</th>
				<th>Fulfilled Date</th>
			</tr>
			<tr v-for="item in receivedOrders" :key="item.receivedOrderId">
				<td>
					<RouterLink class="navItem" :to="'/orderReports/' + item.receivedOrderId">
						{{ item.receivedOrderId }}
					</RouterLink>
				</td>
				<td>{{ item.orderDate }}</td>
				<td>{{ item.totalOrderAmount }}</td>
				<td>{{ item.fulfilledDate }}</td>
			</tr>
		</table>
	</div>
</template>

<style></style>

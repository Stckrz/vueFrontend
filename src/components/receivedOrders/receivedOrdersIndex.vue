<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Pagination from '../Pagination.vue';
import { fetchReceivedOrders, fetchUnfulfilledReceivedOrders } from '../../library/fetch/orderedItemsFetch';
import { ReceivedOrder } from '../../models/receivedOrder';
import TableRender from '../tableRender.vue'

export default defineComponent({
	name: "receivedOrdersIndex",
	components: {
		Pagination,
		TableRender
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
		const setSearchType = (searchType: string = "all") => {
			switch (searchType) {
				case "all":
					fetchReceivedOrders(1).then((data) => {
						receivedOrders.value = data;
					})
					break;
				case "unfulfilled":
					fetchUnfulfilledReceivedOrders().then((data) => {
						receivedOrders.value = data;
					})
					break;
			}
		};

		onMounted(() => {
			fetchReceivedOrders(1).then((data) => {
				receivedOrders.value = data;
			})
			/*			fetchReceivedOrderCount().then((count: ItemCount) => {
							totalReceivedOrderCount.value = count.totalItems;
							totalPages.value = count.numberOfPages;
						})*/
		})
		return {
			receivedOrders,
			//totalReceivedOrderCount, 
			setPage,
			currentPage,
			totalPages,
			setSearchType
		}
	}
})	
</script>

<template>
	<div class="tablePageContainer">
		<div class="buttonBox">
			<button @click="setSearchType('all')">
				all
			</button>
			<button @click="setSearchType('unfulfilled')">
				unfulfilled
			</button>
		</div>
		<TableRender :objectArray="receivedOrders" linkKey="receivedOrderId" linkUrl="/orderReports" />
	</div>
</template>

<style scoped>
.buttonBox {
	display: flex;
	gap: 5px;
	align-self: flex-end;
}

.tablePageContainer {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>

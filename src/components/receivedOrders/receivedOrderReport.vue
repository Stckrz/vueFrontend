<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { OrderedItem, ReceivedOrder } from '../../models/receivedOrder';
import { fetchReceivedOrderById } from '../../library/fetch/orderedItemsFetch';
import { fetchOrderedItemsByPurchaseId } from '../../library/fetch/orderedItemsFetch';
import TableRender from '../tableRender.vue';

export default defineComponent({
	name: "receivedOrderReport",
	components: {
		TableRender
	},

	setup() {

		const route = useRoute();
		const receivedOrderId = route.params.id;
		const receivedOrderData = ref<ReceivedOrder | null>(null)
		//const receivedOrderData = ref();
		const receivedOrderItems = ref<OrderedItem[]>([])

		onMounted(() => {
			fetchReceivedOrderById(receivedOrderId).then((data) => {
				receivedOrderData.value = data[0]
				console.log("receivedOrderData", receivedOrderData.value)
			})

			fetchOrderedItemsByPurchaseId(receivedOrderId).then((data) => {
				receivedOrderItems.value = data
			})
			watch(receivedOrderData, (newValue) => {
				console.log('Received Order Data Updated:', newValue);
			});
		})
		return { receivedOrderData, receivedOrderItems }

	}

})	
</script>

<template>
	<div class="tableContainer">
	<div class="receivedOrderData" v-if="receivedOrderData">
		<div>Order Id: {{ receivedOrderData.receivedOrderId }}</div>
		<div>Order Total: {{ receivedOrderData.totalOrderAmount }}</div>
		<div>Order Date: {{ receivedOrderData.orderDate }}</div>
		<div>Fulfilled Date: {{ receivedOrderData.fulfilledDate }}</div>
	</div>
	<div class="bulkPurchaseItemsTable" v-if="receivedOrderItems.length > 0">
		<TableRender :objectArray="receivedOrderItems" />
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

.receivedOrderData {
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

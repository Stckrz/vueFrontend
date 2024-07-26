<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { OrderedItem, ReceivedOrder } from '../../models/receivedOrder';
import { fetchReceivedOrderById } from '../../library/fetch/orderedItemsFetch';
import { fetchOrderedItemsByPurchaseId } from '../../library/fetch/orderedItemsFetch';
import FulfillOrderModal from '../receivedOrders/fulfillOrderModal.vue'
import TableRender from '../tableRender.vue';

export default defineComponent({
	name: "receivedOrderReport",
	components: {
		TableRender,
		FulfillOrderModal
	},

	setup() {

		const route = useRoute();
		const receivedOrderId = route.params.id as string;
		const receivedOrderData = ref<ReceivedOrder | null>(null)
		//const receivedOrderData = ref();
		const receivedOrderItems = ref<OrderedItem[]>([])

		const orderModalOpen = ref<boolean>(false)
		const setOrderModalOpen = (value: boolean) => {
			orderModalOpen.value = value;
		}
		onMounted(() => {
			fetchReceivedOrderById(parseInt(receivedOrderId)).then((data) => {
				receivedOrderData.value = data[0]
			})

			fetchOrderedItemsByPurchaseId(parseInt(receivedOrderId)).then((data) => {
				receivedOrderItems.value = data
			})
		})
		return { receivedOrderData, receivedOrderItems, orderModalOpen, setOrderModalOpen }

	}

})	
</script>

<template>
	<div v-if="orderModalOpen && receivedOrderData">
		<FulfillOrderModal :setOrderModalOpen="setOrderModalOpen" :orderModalOpen="orderModalOpen"
			:receivedOrderItems="receivedOrderItems" :receivedOrderData="receivedOrderData" />
	</div>

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
		<div class="flex-right" v-if="!receivedOrderData?.fulfilledDate">
			<button @click="orderModalOpen = true">Fulfill order</button>
		</div>
	</div>
</template>

<style scoped>
.tableContainer {
	display: flex;
	gap: 5px;
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

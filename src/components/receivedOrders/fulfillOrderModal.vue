<script lang="ts">
import { defineComponent, PropType, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { OrderedItem, ReceivedOrder } from "../../models/receivedOrder";
import { ShopItem } from "../../models/shopItemModel";
import TableRender from '../tableRender.vue';

import { fetchUpdateShopItem, fetchSaleItemById } from "../../library/fetch/storeItemFetch";
import { fetchUpdateReceivedOrderFulfilledDate } from "../../library/fetch/orderedItemsFetch";
export default defineComponent({
	name: "FulfillOrderModal",
	components: {
		TableRender
	},
	props: {
		orderModalOpen: {
			type: Boolean,
			required: true,
		},
		setOrderModalOpen: {
			type: Function as PropType<(value: boolean) => void>,
			required: true,
		},
		receivedOrderItems: {
			type: Array as PropType<OrderedItem[]>,
			required: true,
		},
		receivedOrderData: {
			type: Object as PropType<ReceivedOrder>,
			required: true,
		}

	},
	setup(props) {
		const router = useRouter();
		const handleModalClose = () => {
			props.setOrderModalOpen(false)
		}
		//		let salePossible = true

		const salePossible = ref(true);
		const setSalePossible = (sale: boolean) => {
			salePossible.value = sale;
		}
		const insufficientItems = ref<string[]>([]);
		const addToInsufficientItems = (itemName: string) => {
			insufficientItems.value.push(itemName);
		}

		const handleProcessOrder = async () => {
			let response = await fetchUpdateReceivedOrderFulfilledDate(props.receivedOrderData)
			if (response?.status === 200) {
				for (let i = 0; i < props.receivedOrderItems.length; i++) {
					await fetchSaleItemById(props.receivedOrderItems[i].shopItemId).then((data) => {
						const newQuantity = (data[0].quantity - props.receivedOrderItems[i].orderedQuantity)
						const updatedShopItemObject = { ...data[0], quantity: newQuantity };
						fetchUpdateShopItem(updatedShopItemObject)
					})
				}
			}
			router.push('/inventory');
		}
		onMounted(() => {
			for (let i = 0; i < props.receivedOrderItems.length; i++) {
			console.log(props.receivedOrderItems[i])
				if (props.receivedOrderItems[i].quantity < props.receivedOrderItems[i].orderedQuantity) {
					setSalePossible(false)
					addToInsufficientItems(props.receivedOrderItems[i].shopItemName)
				}
			}
		})

		return { handleModalClose, handleProcessOrder, salePossible, setSalePossible, insufficientItems, addToInsufficientItems }
	}
})
</script>

<template>
	<div>
		<div class="modalFade">
			<div class="modalContainer">
				<div class="closeButtonBox">
					<button @click="handleModalClose" class="closeButton">X</button>
				</div>
				<div class="orderInfoBox">
					<div>id: {{ receivedOrderData.receivedOrderId }}</div>
					<div>Order Date: {{ receivedOrderData.orderDate }}</div>
				</div>
				<div class="orderContentWindow">

					<table>
						<TableRender :objectArray="receivedOrderItems" />
					</table>
					<div v-if="!salePossible">
						<div v-for="item in insufficientItems">
							<div>insufficient quantity: </div>
							<div>{{item}}</div>
						</div>
					</div>
				</div>
				<div class="orderInfo">
					<div>Total: {{ receivedOrderData.totalOrderAmount }}</div>
					<div v-if="salePossible">
						<button @click="handleProcessOrder">Process</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.modalFade {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(1, 1, 1, 0.4);
}

.modalContainer {
	position: absolute;
	height: 80%;
	width: 70%;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	background-color: white;
	border: 2px solid black;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 10px;
}

.closeButtonBox {
	display: flex;
	justify-content: flex-end;
	height: 10%;
	width: 100%;
}

.closeButton {
	height: 100%;
	aspect-ratio: 1/1;
}

.orderInfoBox {
	display: flex;
	gap: 10px;
}

.orderContentWindow {
	height: 70%;
	border: 1px solid black;
	overflow-y: auto;
}

.orderInfo {
	height: 10%;
	border: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 10px;
	padding-right: 5px;
	padding-right: 5px;
}
</style>

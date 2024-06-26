<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { ShopItem, OrderItem } from '../../models/shopItemModel';
import ShopItemTableItem from './shopItemTableItem.vue';
import { fetchUpdateShopItem } from '../../library/fetch/storeItemFetch';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: "shopItemOrder",
	components: {
		ShopItemTableItem
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
		orderItems: {
			type: Array<ShopItem>,
			required: true,
			default: () => []
		}
	},
	setup(props) {
		const router = useRouter();
		const handleModalClose = () => {
			props.setOrderModalOpen(false)
		}

		const totalPrice = ref(0);
		const setTotalPrice = (price: number) => {
			totalPrice.value = price;
		}

		const orderCart = ref<OrderItem[]>([])
		const setOrderCart = (newArray: OrderItem[]) => {
			orderCart.value = newArray;
		}

		const calculateAndSetTotal = () => {
			setTotalPrice(
				orderCart.value.reduce((acc, obj) => {
					acc += obj.orderAmount * obj.buyPrice
					return acc
				}, 0)
			)

		}
		const orderSubmitHandler = () => {
			for (let i = 0; i < orderCart.value.length; i++) {
				const newQuantity = (parseInt(orderCart.value[i].quantity) + parseInt(orderCart.value[i].orderAmount))
				const updateObject: ShopItem = {
					shopItemId: orderCart.value[i].shopItemId,
					shopItemName: orderCart.value[i].shopItemName,
					price: orderCart.value[i].price,
					buyPrice: orderCart.value[i].buyPrice,
					quantity: newQuantity,
					parAmount: orderCart.value[i].parAmount
				}
				fetchUpdateShopItem(updateObject)
				router.push('/inventory')	
			}
		}
		onMounted(() => {
			props.orderItems.map((item) => {
				setOrderCart([...orderCart.value, { ...item, orderAmount: (item.parAmount - item.quantity) }])
			}),
				calculateAndSetTotal()
		})
		return { handleModalClose, totalPrice, setTotalPrice, orderCart, setOrderCart, calculateAndSetTotal, orderSubmitHandler }
	}
})
</script>

<template>
	<div class="modalFade">
		<div class="modalContainer">
			<div class="closeButtonBox">
				<button @click="handleModalClose" class="closeButton">X</button>
			</div>
			<div class="orderContentWindow">

				<table>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Buy price</th>
						<th>Inventory</th>
						<th>Par Amount</th>
						<th>Order Amount</th>
					</tr>
					<tr v-for="item in orderItems" :key="item.shopItemId">
						<ShopItemTableItem :tableItem="item" :orderCart="orderCart" :setOrderCart="setOrderCart"
							:calculateAndSetTotal="calculateAndSetTotal" />
					</tr>
				</table>
			</div>
			<div class="orderInfo">
				<div>Total: {{ totalPrice }}</div>
				<div>
					<button @click="orderSubmitHandler">Order</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
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
.closeButton{
	height: 50%;
	aspect-ratio: 1/1;	
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

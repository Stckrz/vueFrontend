<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue';
import { ShopItem, OrderItem } from '../../models/shopItemModel';
export default defineComponent({
	name: "ShopItemTableItem",
	props: {
		tableItem: {
			type: Object as PropType<ShopItem>,
			required: true
		},
		orderCart: {
			type: Object as PropType<OrderItem[]>,
			required: true,
		},
		setOrderCart: {
			type: Function as PropType<(orderCart: OrderItem[]) => void>,
			required: true,
		},
		calculateAndSetTotal: {
			type: Function,
			required: true,
		}
	},
	setup(props) {
		const quantityPlaceholder = ref(0)
		const handleQuantityChange = (event: Event) => {
			const { value: quantity } = (event.target as HTMLInputElement);

			const objectIndex = props.orderCart.find((obj: OrderItem) => obj.shopItemId === props.tableItem.shopItemId)
			if (objectIndex) {
				props.setOrderCart(props.orderCart.map((cartItem) => {
					if (cartItem === objectIndex) {
						return { ...cartItem, orderAmount: parseInt(quantity) }
					} else {
						return cartItem
					}
				}))
				props.calculateAndSetTotal();
			}
		}
		onMounted(() => {
			quantityPlaceholder.value = props.tableItem.parAmount - props.tableItem.quantity;
		})
		return { handleQuantityChange, quantityPlaceholder }
	}
})

</script>

<template>
	<td>{{ tableItem.shopItemId }}</td>
	<td>{{ tableItem.shopItemName }}</td>
	<td>{{ tableItem.buyPrice }}</td>
	<td>{{ tableItem.quantity }}</td>
	<td>{{ tableItem.parAmount }}</td>
	<td><input type="number" @change="handleQuantityChange($event)" class="amountInput"
			:placeholder="quantityPlaceholder.toString()" /></td>
</template>

<style scoped>
.amountInput {
	width: 90%;
}
</style>

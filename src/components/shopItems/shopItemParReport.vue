<script lang="ts">
import { defineComponent, ref } from 'vue';
import ShopItemTable from './ShopItemTable.vue';
import { ShopItem } from '../../models/shopItemModel';
import ShopItemOrder from './shopItemOrder.vue';

export default defineComponent({
	name: "shopItemParReport",
	components: {
		ShopItemTable,
		ShopItemOrder
	},
	setup() {
		const shopItems = ref<ShopItem[]>([]);
		const setShopItems = (itemArray: ShopItem[]) => {
			shopItems.value = itemArray;
		}


		const orderModalOpen = ref<boolean>(false)
		const setOrderModalOpen = (value: boolean) => {
			orderModalOpen.value = value;
		}

		return { setShopItems, shopItems, orderModalOpen, setOrderModalOpen }
	},
})
</script>

<template>
	<div>
		<div v-if="orderModalOpen">
			<ShopItemOrder :setOrderModalOpen="setOrderModalOpen" :orderModalOpen="orderModalOpen"
				:orderItems="shopItems" />
		</div>
		<div class="flex-right">
			<button @click="orderModalOpen = true">Generate order</button>
		</div>
		<div>
			<div>Items Under Par</div>
			<ShopItemTable :tableType="'parReport'" :dataCallback="setShopItems" />
		</div>
	</div>
</template>

<style>
.flex-right {
	display: flex;
	justify-content: flex-end;
}
</style>

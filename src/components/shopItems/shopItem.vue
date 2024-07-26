<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchSaleItemById, fetchUpdateShopItem } from '../../library/fetch/storeItemFetch';
import { ShopItem } from '../../models/shopItemModel';
export default defineComponent({
	name: "shopItem",
	setup() {
		const route = useRoute();
		const shopItemId = route.params.id as string;
		const saleItem = ref<ShopItem>()
		const editMode = ref(false)

		const updateField = (updateKey: string, newValue: string | number) => {
			const saleItemCopy = saleItem.value
			console.log(saleItemCopy)
			if (saleItem.value) {
				if (updateKey in saleItem.value) {
					(saleItem.value[updateKey as keyof ShopItem] as unknown) = newValue
				}
			}
		}

		const updateShopItem = async (shopItem: ShopItem) => {
			const response = await fetchUpdateShopItem(shopItem);
			console.log(response)
		}

		onMounted(() => {
			fetchSaleItemById(parseInt(shopItemId)).then((data) => {
				saleItem.value = data[0]
			})
		})
		return { saleItem, editMode, updateField, updateShopItem }
	}
})
</script>

<template>
	<div v-if="saleItem">
		<div class="itemData" v-if="saleItem && !editMode">
			<table>
				<tr v-for="item, key in saleItem">
					<td>{{ key }}</td>
					<td>{{ item }}</td>
				</tr>
			</table>
		</div>

		<div class="itemData" v-if="saleItem && editMode">
			<table>
				<tr v-for="item, key in saleItem">
					<td>{{ key }}</td>
					<td v-if="key !== 'shopItemId'">
						<input @change="updateField(key, ($event.target as HTMLInputElement).value)"
							:placeholder="item.toString()"></input>
					</td>
					<td v-if="key === 'shopItemId'">{{ item }}</td>
				</tr>
			</table>
		</div>

		<button @click="editMode = !editMode">
			<template v-if="!editMode">
				edit
			</template>
			<template v-if="editMode">
				cancel
			</template>
		</button>
		<button v-if="editMode" @click="updateShopItem(saleItem)">confirm</button>
	</div>
</template>

<style scoped>
table,
tr,
td,
th {
	border: none;
}

.itemData {
	display: flex;
	gap: 5px;
	margin: 10px 0px 10px 0px;
	flex-direction: column;
	width: 100%;
	color: white;
	padding: 5px;
	border-radius: 0.5em;
	background-color: #737994;
}
</style>

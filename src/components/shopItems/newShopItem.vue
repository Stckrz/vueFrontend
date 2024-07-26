<script lang="ts">
import { ref, defineComponent } from 'vue';
import { fetchNewShopItem } from '../../library/fetch/storeItemFetch';
import { useRouter } from 'vue-router';
import { ShopItem } from '../../models/shopItemModel';

export default defineComponent({
	name: "NewShopItem",
	setup() {
		const router = useRouter();
		const shopItemName = ref("");
		const shopItemCategory = ref("");
		const price = ref();
		const buyPrice = ref();
		const quantity = ref();
		const parAmount = ref();

		const newItemHandler = (event: MouseEvent) => {
			if (event) {
				event.preventDefault();
			}

			const shopItemObject: ShopItem = {
				shopItemId: 0,
				shopItemName: shopItemName.value,
				shopItemCategory: shopItemCategory.value,
				price: price.value,
				buyPrice: buyPrice.value,
				quantity: quantity.value,
				parAmount: parAmount.value
			}
			fetchNewShopItem(shopItemObject).then(
				(response) => {
					response !== undefined && router.push('/inventory');
				}
			)
		};
		return {
			shopItemName,
			shopItemCategory,
			price,
			buyPrice,
			quantity,
			parAmount,
			newItemHandler
		};
	}
})
</script>

<template>
	<form class="newUserForm">
		<div class="inputContainer">
			<label for="shopItemName">Item Name: </label>
			<input v-model="shopItemName" type="text" id="shopItemName" name="shopItemName">
			</input>
		</div>

		<div class="inputContainer">
			<label for="shopItemCategory">Item Category: </label>
			<input v-model="shopItemCategory" type="text" id="shopItemCategory" name="shopItemCategory">
			</input>
		</div>

		<div class="inputContainer">
			<label for="price">Price: </label>
			<input v-model="price" type="text" id="price" name="price">
			</input>
		</div>

		<div class="inputContainer">
			<label for="buyPrice">Buy Price: </label>
			<input v-model="buyPrice" type="text" id="buyPrice" name="buyPrice">
			</input>
		</div>

		<div class="inputContainer">
			<label for="quantity">Quantity: </label>
			<input v-model="quantity" type="text" id="quantity" name="quantity">
			</input>
		</div>

		<div class="inputContainer">
			<label for="parAmount">Par Amount: </label>
			<input v-model="parAmount" type="text" id="parAmount" name="parAmount">
			</input>
		</div>

		<div class="inputContainer">
			<button @click="(event) => newItemHandler(event)">
				submit
			</button>
		</div>
	</form>
</template>

<style scoped>
.newUserForm {
	display: flex;
	width: 30%;
	flex-direction: column;
	gap: 10px;
}

.inputContainer {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-end;
}

.inputContainer input {
	width: 100%;
}
</style>

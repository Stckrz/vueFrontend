<script lang="ts">
import { ref, defineComponent } from 'vue';
import { fetchNewShopItem } from '../../library/fetch/storeItemFetch';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: "NewShopItem",
	setup() {
		const router = useRouter();
		const shopItemName = ref("");
		const price = ref();
		const buyPrice = ref();
		const quantity = ref();
		const parAmount = ref();

		const newItemHandler = (event: MouseEvent) => {
			if (event) {
				event.preventDefault()
			}
			fetchNewShopItem(shopItemName.value, price.value, buyPrice.value, quantity.value, parAmount.value).then(
				(response) => {
					response !== undefined && router.push('/inventory')
				}
			)
		};
		return {
			shopItemName,
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

<style>
.newUserForm {
	display: flex;
	width: 50%;
	flex-direction: column;
	gap: 10px;
}

.inputContainer {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
	name: 'Counter',
	setup() {
		const count = ref(0);
		const inc = () => count.value++;
		const reset = () => count.value = 0;

		return { count, inc, reset };
	},
});
</script>

<template>
	<div>
		<h1>Counter!</h1>
		<div>{{ count }}</div>
		<button @click="inc">click me!</button>
		<button @click="reset">reset</button>
	</div>
</template>

<style></style>

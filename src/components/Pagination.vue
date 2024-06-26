<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
	name: "Pagination",
	props: {
		setPage: {
			type: Function as PropType<(page: number) => void>,
			required: true,
		},
		numberOfPages: {
			type: Number,
			required: true,
		}
	},
	setup(props) {
		const handleClick = (pageNumber: number) => {
			props.setPage(pageNumber);
		}
		const pageAmount = ref(0);

		return {
			handleClick,
			pageAmount
		}
	}
});
</script>

<template>
	<div>{{ numberOfPages }}</div>
	<button v-for="i in numberOfPages" @click="handleClick(i)">{{ i }}</button>
</template>

<style></style>

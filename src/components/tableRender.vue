<script lang="ts">
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
	name: "TableRender",
	props: {
		objectArray: {
			type: Array,
			required: true,
			default: () => []
		}
	},
	setup(props) {
		onMounted(() => {
			console.log(props.objectArray)
		})
	}
})
</script>

<template>
	<table v-if="objectArray?.length > 0">
		<tr>
			<th v-for="(key, value) in objectArray[0]" :key="key">{{ value }}</th>
		</tr>
		<tr v-for="objectArrayItem in objectArray">
			<td v-for="item in objectArrayItem">
				{{ item }}
			</td>
		</tr>

	</table>
</template>

<style></style>

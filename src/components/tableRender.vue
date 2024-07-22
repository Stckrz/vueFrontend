<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
export default defineComponent({
	name: "TableRender",
	props: {
		objectArray: {
			type: Array,
			required: true,
			default: () => []
		},
		linkKey: {
			type: String,
			required: false
		},
		linkUrl: {
			type: String,
			required: false
		}
	},
	setup() {
		const route = useRouter();
		return { route }
	}
})
</script>

<template>
	<table v-if="objectArray?.length > 0">
		<tr>
			<th v-for="(key, value) in objectArray[0]" :key="key">{{ value }}</th>
		</tr>
		<tr v-for="objectArrayItem in objectArray">
			<td v-for="item, key in objectArrayItem">
				<template v-if="key === linkKey">
					<RouterLink :to="`${linkUrl}/${item}`">{{item}}</RouterLink>
				</template>
				<template v-else>
					{{ item }}
					</template>
			</td>
		</tr>
	</table>
</template>

<style></style>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: FulfillOrderModal,
	props: {
		orderModalOpen: {
			type: Boolean,
			required: true,
		},

		setOrderModalOpen: {
			type: Function as PropType<(value: boolean) => void>,
			required: true,
		},

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

		onMounted(() => {
		})
		return { handeleModalClose, totalPrice, setTotalPrice }
	}
})

</script>

<template>
	<div>
		<div class="modalFade">
			<div class="modalContainer">
				<div class="closeButtonBox">
					<button @click="handleModalClose" class="closeButton">X</button>
				</div>
				<div class="orderContentWindow">
				</div>
				<div class="orderInfo">
					<div>Total: total here</div>
					<div>
						<button>Order</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
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

.closeButton {
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

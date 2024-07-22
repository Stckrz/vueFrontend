<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: "HomePage",
})
</script>

<template>
	<div class="homePageContainer">
		<h2>Vue/PHP Inventory Management System</h2>
		<div class="listContainer">
			<h4>
				Backend:
				<ul>
					<li>PHP</li>
					<li>MySql</li>
					<li>Apache</li>

				</ul>
			</h4>
			<h4>
				Frontend:
				<ul>
					<li>Typescript</li>
					<li>VueJS(vuex and vue router)</li>
				</ul>
			</h4>
		</div>
		<h5>What it is:
			<p>
				This is an inventory management system that can handle incoming orders, determine what items in inventory
				are
				below par, create order forms to refill inventory, and fulfill incoming orders, while keeping record of all
				of
				the incoming purchases and orders. Editing items is supported, as well as creating new items.
			</p>
		</h5>
		<h5>What it doesn't have yet:
			<ul>
				<li>Responsiveness - I have not decided which type of 'responsive' table layout I want to use yet..</li>
				<li>This system has no user/authentication system</li>
				<li>Backend does not have a system to handle multiple request at the same time. Not properly scalable yet.
				</li>
			</ul>
		</h5>
		<h5>Link to sister site:
			<p>
				Here is where you can find the webpage to submit orders to this system:
			</p>
		</h5>
	</div>
</template>

<style scoped>
.homePageContainer {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	padding: 5px;
}

.listContainer {
	display: flex;
	justify-content: space-evenly;
	width: 100%;
}

h4, h5{
	padding: 0;
	margin: 0;
}
</style>

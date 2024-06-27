import { BulkPurchase, PurchasedItem } from "../../models/bulkPurchaseModel";
export async function fetchBulkPurchase() {
	try {
		const response = await fetch('http://localhost:8080/bulkPurchase/bulkPurchase.php')
		const data = await response.json();
		if (response.status === 200) {
			return (data)
		} else {
			console.log("error retrieving bulkPurchases")
		}
	}
	catch (error) {
		console.log({ "error": error });
	}
}

export async function fetchPostBulkPurchase(totalPurchaseAmount: number) {
	const currentDate = new Date();
	const bulkPurchaseObject = {
		totalPurchaseAmount: totalPurchaseAmount,
		//clever trick from stack overflow to convert the date to YYYY-MM-DD format
		purchaseDate: currentDate.toISOString().split('T')[0]
	}
	const formdata = new FormData();

	for (const key in bulkPurchaseObject) {
		formdata.append(key, bulkPurchaseObject[key as keyof BulkPurchase].toString());
	}

	try {
		const response = await fetch('http://localhost:8080/bulkPurchase/bulkPurchase.php', {
			method: "POST",
			body: formdata
		})
		const data = await response.json()
		if (response.status === 200) {
			return (data)
		} else {
			console.log("error posting bulkPurchase")
		}
	}
	catch (error) {
		console.log({ "error": error });
	}
}

export async function fetchPostPurchasedItem(shopItemId: number, bulkPurchaseId: number, shopItemQuantity: number) {
	const purchasedItemObject = {
		shopItemId: shopItemId,
		bulkPurchaseId: bulkPurchaseId,
		shopItemQuantity: shopItemQuantity
	}
	console.log(purchasedItemObject)
	const formdata = new FormData();
	for (const key in purchasedItemObject) {
		formdata.append(key, purchasedItemObject[key as keyof PurchasedItem].toString());
	}

	try {
		const response = await fetch('http://localhost:8080/purchasedItems/index.php', {
			method: "POST",
			body: formdata
		})
		const data = await response.json()
		if (response.status === 200) {
			console.log(data)
			return (data)
		} else {
			console.log("error posting purchasedItem")
		}
	}
	catch (error) {
		console.log({ "error": error });
	}
}

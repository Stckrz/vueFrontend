import { PurchasedItem } from "../../models/bulkPurchaseModel";

export async function fetchBulkPurchase(page: number,) {
	try {
		const response = await fetch(`https://slimyan.us/bulkPurchase/?page=${page}`)
		const data = await response.json();
		if (response.status === 200) {
			return data
		} else {
			return ({ "message": "internal database error" })
		}
	} catch (error) {
		console.log({ "error": error })
	}
}

export async function fetchBulkPurchaseById(id: number = 0) {
	if (id === 0) {
		try {
			const response = await fetch(`https://slimyan.us/bulkPurchase/`)
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
	} else{
		try {
			const response = await fetch(`https://slimyan.us/bulkPurchase/?bulkPurchaseId=${id}`)
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
		if (bulkPurchaseObject.hasOwnProperty(key)) {
			formdata.append(key, (bulkPurchaseObject as Record<string, any>)[key].toString());
		}
	}

	try {
		const response = await fetch('https://slimyan.us/bulkPurchase/', {
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
	const formdata = new FormData();
	for (const key in purchasedItemObject) {
		formdata.append(key, purchasedItemObject[key as keyof PurchasedItem].toString());
	}

	try {
		const response = await fetch('https://slimyan.us/purchasedItems/', {
			method: "POST",
			body: formdata
		})
		const data = await response.json()
		if (response.status === 200) {
			return (data)
		} else {
			console.log("error posting purchasedItem")
		}
	}
	catch (error) {
		console.log({ "error": error });
	}
}

export async function fetchPurchasedItemsByPurchaseId(id: number){
	try{
		const response = await fetch(`https://slimyan.us/purchasedItems/?bulkPurchaseId=${id}`)
		const data = await response.json();
		if (response.status === 200){
			return (data);
		} else{
			console.log("error retrieving purchasedItems")
		}
	}
	catch (error) {
		console.log({"error": error})
	}
	
}

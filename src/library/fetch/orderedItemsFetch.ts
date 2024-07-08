import { ReceivedOrder, OrderedItem } from "../../models/receivedOrder";

export async function fetchReceivedOrders(page: number,) {
	try {
		const response = await fetch(`http://localhost:8080/receivedOrders/index.php/?page=${page}`)
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

export async function fetchReceivedOrderById(id: number = 0) {
	if (id === 0) {
		try {
			const response = await fetch(`http://localhost:8080/receivedOrders/index.php?receivedOrderId=${id}`)
			const data = await response.json();
			if (response.status === 200) {
				return (data)
			} else {
				console.log("error retrieving receivedOrderss")
			}
		}
		catch (error) {
			console.log({ "error": error });
		}
	} else{
		try {
			const response = await fetch(`http://localhost:8080/receivedOrders/index.php?receivedOrderId=${id}`)
			const data = await response.json();
			if (response.status === 200) {
				return (data)
			} else {
				console.log("error retrieving receivedOrders")
			}
		}
		catch (error) {
			console.log({ "error": error });
		}
	}
}

export async function fetchPostBulkPurchase(totalPurchaseAmount: number) {
	const currentDate = new Date();
	const receivedOrdersObject = {
		totalPurchaseAmount: totalPurchaseAmount,
		//clever trick from stack overflow to convert the date to YYYY-MM-DD format
		purchaseDate: currentDate.toISOString().split('T')[0]
	}
	const formdata = new FormData();

	for (const key in receivedOrdersObject) {
		formdata.append(key, receivedOrdersObject[key as keyof ReceivedOrder].toString());
	}

	try {
		const response = await fetch('http://localhost:8080/receivedOrders/index.php', {
			method: "POST",
			body: formdata
		})
		const data = await response.json()
		if (response.status === 200) {
			return (data)
		} else {
			console.log("error posting receivedOrders")
		}
	}
	catch (error) {
		console.log({ "error": error });
	}
}

export async function fetchPostOrderedItem(shopItemId: number, receivedOrderId: number, shopItemQuantity: number) {
	const orderedItemObject = {
		shopItemId: shopItemId,
		receivedOrderId: receivedOrderId,
		shopItemQuantity: shopItemQuantity
	}
	const formdata = new FormData();
	for (const key in orderedItemObject) {
		formdata.append(key, orderedItemObject[key as keyof OrderedItem].toString());
	}

	try {
		const response = await fetch('http://localhost:8080/orderedItems/index.php', {
			method: "POST",
			body: formdata
		})
		const data = await response.json()
		if (response.status === 200) {
			return (data)
		} else {
			console.log("error posting orderedItem")
		}
	}
	catch (error) {
		console.log({ "error": error });
	}
}

export async function fetchOrderedItemsByPurchaseId(id: number){
	try{
		const response = await fetch(`http://localhost:8080/orderedItems/index.php?receivedOrdersId=${id}`)
		const data = await response.json();
		if (response.status === 200){
			return (data);
		} else{
			console.log("error retrieving orderedItems")
		}
	}
	catch (error) {
		console.log({"error": error})
	}
	
}

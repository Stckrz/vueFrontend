import { ReceivedOrder } from "../../models/receivedOrder";

export async function fetchReceivedOrders(page: number,) {
	try {
		const response = await fetch(`https://slimyan.us/receivedOrders/?page=${page}`)
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

export async function fetchUnfulfilledReceivedOrders() {
	try {
		const response = await fetch(`https://slimyan.us/receivedOrders/?unfulfilled`)
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
			const response = await fetch(`https://slimyan.us/receivedOrders/?receivedOrderId=${id}`)
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
	} else {
		try {
			const response = await fetch(`https://slimyan.us/receivedOrders/?receivedOrderId=${id}`)
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

export async function fetchPostReceivedOrder(totalPurchaseAmount: number) {
	const currentDate = new Date();
	const receivedOrdersObject = {
		totalPurchaseAmount: totalPurchaseAmount,
		//clever trick from stack overflow to convert the date to YYYY-MM-DD format
		purchaseDate: currentDate.toISOString().split('T')[0]
	}
	const formdata = new FormData();

	for (const key in receivedOrdersObject) {
		if (receivedOrdersObject.hasOwnProperty(key)) {
			formdata.append(key, (receivedOrdersObject as Record<string, any>)[key].toString());
		}
	}
	// for (const key in receivedOrdersObject) {
	// 	formdata.append(key, receivedOrdersObject[key as keyof ReceivedOrder].toString());
	// }


	try {
		const response = await fetch('https://slimyan.us/receivedOrders/', {
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
		if (orderedItemObject.hasOwnProperty(key)) {
			formdata.append(key, (orderedItemObject as Record<string, any>)[key].toString());
		}
	}

	try {
		const response = await fetch('https://slimyan.us/orderedItems/', {
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

export async function fetchOrderedItemsByPurchaseId(id: number) {
	try {
		const response = await fetch(`https://slimyan.us/orderedItems/?receivedOrderId=${id}`)
		const data = await response.json();
		if (response.status === 200) {
			return (data);
		} else {
			console.log("error retrieving orderedItems")
		}
	}
	catch (error) {
		console.log({ "error": error })
	}

}

export async function fetchUpdateReceivedOrderFulfilledDate(receivedOrder: ReceivedOrder) {
	const currentDate = new Date();
	const orderId = receivedOrder.receivedOrderId;
	const updateItemObject = {
		totalOrderAmount: receivedOrder.totalOrderAmount,
		orderDate: receivedOrder.orderDate,
		fulfilledDate: currentDate.toISOString().split('T')[0]
	}
	try {
		const response = await fetch(`https://slimyan.us/receivedOrders/?receivedOrderId=${orderId}`, {
			method: "PUT",
			body: JSON.stringify(updateItemObject)
		});
		console.log(updateItemObject)
		if (response.status === 200) {
			return (response);
		} else {
			console.log({ "message": "update failed" });
		}
	}
	catch (error) {
		console.log({ "message": `Update failed: ${error}` });
	}
}
export async function fetchUpdateReceivedOrder(receivedOrder: ReceivedOrder) {
	const orderId = receivedOrder.receivedOrderId;
	const updateItemObject = {
		totalOrderAmount: receivedOrder.totalOrderAmount,
		orderDate: receivedOrder.orderDate,
		fulfilledDate: receivedOrder.fulfilledDate,
	}
	try {
		const response = await fetch(`https://slimyan.us/orderedItems/?receivedOrderId=${orderId}`, {
			method: "PUT",
			body: JSON.stringify(updateItemObject)
		});
		if (response.status === 200) {
			return (response);
		} else {
			console.log({ "message": "update failed" });
		}
	}
	catch (error) {
		console.log({ "message": `Update failed: ${error}` });
	}
}

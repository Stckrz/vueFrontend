import { ShopItem } from "../../models/shopItemModel";

export async function fetchSaleItems(page: number,) {
	try {
		// const response = await fetch(`http://slimyan.us/shopItems.php/?page=${page}`)
		const response = await fetch(`https://slimyan.us/shopItems/?page=${page}`)
		const data = await response.json();
		if (response.status === 200) {
			console.log(data)
			return data
			
		} else {
			return ({ "message": "internal database error" })
		}
	} catch (error) {
		console.log({ "error": error })
	}
}

export async function fetchSaleItemBySearchString(searchString: string) {
	try {
		const response = await fetch(`https://slimyan.us/shopItems/?itemNameString=${searchString}`)
		// const response = await fetch(`http://slimyan.us/shopItems.php/?itemNameString=${searchString}`)
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

export async function fetchSaleItemById(shopItemId: number) {
	try {
		const response = await fetch(`https://slimyan.us/shopItems/?shopItemId=${shopItemId}`)
		// const response = await fetch(`http://slimyan.us/shopItems.php/?shopItemId=${shopItemId}`)
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

export async function fetchBelowPar() {
	try {
		const response = await fetch(`https://slimyan.us/shopItems/?parReport`)
		// const response = await fetch(`http://slimyan.us/shopItems.php/?parReport`)
		const data = await response.json();
		if (response.status === 200) {
			console.log(data)
			return data
		} else {
			return ({ "message": "internal database error" })
		}
	} catch (error) {
		console.log({ "error": error })
	}
}

export async function fetchSaleItemsCount() {
	try {
		const response = await fetch(`https://slimyan.us/countItems/?countType=shopItems`)
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

export async function fetchSaleItemCategories(){
	try{
		const response = await fetch('https://slimyan.us/shopItems/?categoryList');
		const data = await response.json();
		if(response.status === 200){
			return data
		} else {
			return ({"message": "internal database error"})
		}
	}
	catch (error){
		console.log({"error": error})
	}
}

export async function fetchPurchaseReportCount() {
	try {
		const response = await fetch(`https://slimyan.us/countItems/?countType=purchaseReports`)
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

export async function fetchUpdateShopItem(shopItem: ShopItem) {
	const itemId = shopItem.shopItemId;
	const updateItemObject = {
		shopItemName: shopItem.shopItemName,
		shopItemCategory: shopItem.shopItemCategory,
		price: shopItem.price,
		buyPrice: shopItem.buyPrice,
		quantity: shopItem.quantity,
		parAmount: shopItem.parAmount
	}
	try {
		const response = await fetch(`https://slimyan.us/shopItems/?shopItemId=${itemId}`, {
			method: "PUT",
			body: JSON.stringify(updateItemObject)

		});
		const data = await response.json();
		if (response.status === 200) {
			return (response);
		} else {
			console.log("response", data.message);
			return { "message": "update failed" };
		}
	}
	catch (error) {
		console.log({ "message": `Update failed: ${error}` });
	}
}

// export async function fetchNewShopItem(shopItemName: string, shopItemCategory: string, price: number, buyPrice: number, quantity: number, parAmount: number) {
export async function fetchNewShopItem(shopItem: ShopItem) {
	const shopItemObject: ShopItem = {
		shopItemId: 0,
		shopItemName: shopItem.shopItemName,
		shopItemCategory: shopItem.shopItemCategory,
		price: shopItem.price,
		buyPrice: shopItem.buyPrice,
		quantity: shopItem.quantity,
		parAmount: shopItem.parAmount
	}
	const formdata = new FormData();
	for (const key in shopItemObject) {
		formdata.append(key, shopItemObject[key as keyof ShopItem].toString());
	}
	try {
		// const response = await fetch('https://slimyan.us80/shopItems.php', {
		const response = await fetch('https://slimyan.us/shopItems/', {
			method: "POST",
			body: formdata
		});
		return response;
	} catch (error) {
		console.log({ "message": `api request failed: ${error}` })
	}
}

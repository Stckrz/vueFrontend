import { ShopItem } from "../../models/shopItemModel";

export async function fetchSaleItems(page: number,) {
	try {
		const response = await fetch(`http://localhost:8080/shopItems.php/?page=${page}`)
		const data = await response.json();
		if (response.status === 200) {
			return data
		} else {
			return ({ "message": "internal database error" })
		}
	} catch (error) {
		return ({ "error": error })
	}
}

export async function fetchBelowPar() {
	try {
		const response = await fetch(`http://localhost:8080/shopItems.php/?parReport`)
		const data = await response.json();
		if (response.status === 200) {
			return data
		} else {
			return ({ "message": "internal database error" })
		}
	} catch (error) {
		return ({ "error": error })
	}
}

export async function fetchSaleItemsCount() {
	try {
		const response = await fetch(`http://localhost:8080/countItems.php`)
		const data = await response.json();
		if (response.status === 200) {
			return data
		} else {
			return ({ "message": "internal database error" })
		}
	} catch (error) {
		return ({ "error": error })
	}
}

export async function fetchUpdateShopItem(shopItem: ShopItem){
	const itemId = shopItem.shopItemId;
	const updateItemObject = {
		shopItemName: shopItem.shopItemName,
		price: shopItem.price,
		buyPrice: shopItem.price,
		quantity: shopItem.quantity,
		parAmount: shopItem.parAmount
	}
	try{
		const response = await fetch(`http://localhost:8080/shopItems.php/?shopItemId=${itemId}`, {
			method: "PUT",
			body: JSON.stringify(updateItemObject)
			
		});
		if (response.status === 200){
			return (response);
		}else{
			return({"message": "update failed"})
		}

	}
	catch (error){ 
		return ({"message": `Update failed: ${error}`});
	}
}

export async function fetchNewShopItem(shopItemName: string, price: number, buyPrice: number, quantity: number, parAmount: number) {
	const shopItemObject: ShopItem = {
		shopItemId: 0,
		shopItemName: shopItemName,
		price: price,
		buyPrice: buyPrice,
		quantity: quantity,
		parAmount: parAmount
	}
	const formdata = new FormData();
	for (const key in shopItemObject) {
		formdata.append(key, shopItemObject[key as keyof ShopItem].toString());
	}
	try {
		const response = await fetch('http://localhost:8080/shopItems.php', {
			method: "POST",
			body: formdata
		});
		if (response.status === 200) {
			return (response)
		}
		if (!response.ok) {
			return ({ "message": "database error" })
		}
	} catch (error) {
		return ({ "message": `api request failed: ${error}` })
	}
};

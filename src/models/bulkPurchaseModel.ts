export interface BulkPurchase{
	bulkPurchaseId: number,
	totalPurchaseAmount: number,
	purchaseDate: string
}

export interface PurchasedItem{
	shopItemId: number,
	bulkPurchaseId: number,
	shopItemQuantity: number,
}

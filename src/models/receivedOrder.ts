export interface ReceivedOrder{
	receivedOrderId: number,
	totalOrderAmount: number,
	orderDate: string,
	fulfilledDate: string
}

export interface OrderedItem{
	shopItemId: number,
	shopItemName: string,
	receivedOrderId: number,
	orderedQuantity: number,
	quantity: number
}

export interface ReceivedOrder{
	receivedOrderId: number,
	totalOrderAmount: number,
	orderDate: string,
	fulfilledDate: string
}

export interface OrderedItem{
	shopItemId: number,
	receivedOrderId: number,
	shopItemQuantity: number,
}

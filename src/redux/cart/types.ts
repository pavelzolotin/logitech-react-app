export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string[];
    activeColor: number;
    count: number;
};

export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}
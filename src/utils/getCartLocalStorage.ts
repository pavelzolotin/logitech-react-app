import {totalPriceCalc} from './totalPriceCalc';
import {CartItem} from '../redux/cart/types';

export const cartStorage = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = totalPriceCalc(items);

    return {
        items: items as CartItem[],
        totalPrice
    }
};
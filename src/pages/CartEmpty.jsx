import {Link} from 'react-router-dom';

import cartEmpty from '../assets/img/empty-cart.png';

const CartEmpty = () => {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая 😕</h2>
            <p>
                Вероятней всего, вы ещё ничего не заказывали.
                <br />
                Для того, чтобы сделать заказ, перейди на главную страницу.
            </p>
            <img
                src={cartEmpty}
                alt="empty-cart"
            />
            <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
    );
};

export default CartEmpty;
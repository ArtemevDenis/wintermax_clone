import ItemInCart from "./ItemInCart";

const CartList = ({cart, deleteItem}) => {
    if (cart.length !== 0)
        return (
            <ol>
                {cart.map((product) => {
                    return <li><ItemInCart key={product.ID} product={product} deleteItem={deleteItem}/></li>
                })}
            </ol>
        )
    return <p>Корзина пустая</p>
}

export default CartList
import ItemInCart from "./ItemInCart";

const CartList = ({cart, deleteItem}) => {
    if (cart.length !== 0)
        return (
            <ol>
                {cart.map((productID) => {
                    return <li><ItemInCart key={productID} productID={productID} deleteItem={deleteItem}/></li>
                })}
            </ol>
        )
    return <p>Корзина пустая</p>
}

export default CartList
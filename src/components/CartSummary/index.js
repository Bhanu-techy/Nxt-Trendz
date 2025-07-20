import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const priceList = cartList.map(each => each.price * each.quantity)
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const sum = priceList.reduce(reducer)
      const {length} = cartList
      return (
        <div>
          <h1>
            Order Total is <span>{sum}</span>
          </h1>
          <p>{length} items in cart</p>
          <button type="button" className="Checkout">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary

import {Component} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  state = {showSucessView: false, paymentSelected: false}

  onClickCompleteOrderBtn = () => {
    const {paymentSelected} = this.state
    if (paymentSelected) {
      this.setState({showSucessView: true})
    }
  }

  onClickSelectPayment = () => {
    this.setState(prevState => ({paymentSelected: !prevState.paymentSelected}))
  }

  render() {
    const {showSucessView} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          const priceList = cartList.map(each => each.price * each.quantity)
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue
          const sum = priceList.reduce(reducer)

          const {length} = cartList
          return (
            <div>
              <h1>
                Order Total is <span>{sum}</span>
              </h1>
              <p>{length} items in cart</p>
              <Popup
                modal
                trigger={
                  <button type="button" className="trigger-button">
                    Checkout
                  </button>
                }
              >
                {close =>
                  showSucessView ? (
                    <div className="order-completed-view">
                      <p>Your order has been placed successfully</p>
                    </div>
                  ) : (
                    <div className="popup-container">
                      <p>Order Total is {sum}</p>
                      <p>{length} items in cart</p>
                      <ul>
                        <li>
                          <input id="card" type="checkbox" />
                          <label htmlFor="card">Card</label>
                        </li>
                        <li>
                          <input type="checkbox" id="netbanking" disabled />
                          <label htmlFor="netbanking">Net Banking</label>
                        </li>
                        <li>
                          <input id="upi" type="checkbox" />
                          <label htmlFor="upi">UPI</label>
                        </li>
                        <li>
                          <input id="wallet" type="checkbox" />
                          <label htmlFor="wallet">Wallet</label>
                        </li>
                        <li>
                          <input
                            id="cod"
                            type="checkbox"
                            onClick={this.onClickSelectPayment}
                          />
                          <label htmlFor="cod">Cash On Delivery</label>
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={this.onClickCompleteOrderBtn}
                      >
                        Comfirm Order
                      </button>
                    </div>
                  )
                }
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary

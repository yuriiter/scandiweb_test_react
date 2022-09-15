import { Component } from 'react'
import {connect} from "react-redux";

import Navigation from '../components/Navigation.jsx'
import CartItem from "../components/CartItem";
import {complexKey, totalPrice} from "../utils";


class Cart extends Component {
  checkOut = () => {
    this.props.dispatch({type: "CHECK_OUT"})
  }


  render () {
    return (
        <div>
          <Navigation />
          <section className="cart">
            <div className="container">
              <h2 className={"cart__title"}>cart</h2>
              <div className="cart__items row">
                <div className="cart__items-wrapper px-20 splitter">
                  {
                    this.props.cart?.map(product => <CartItem key={complexKey(product)} product={product} />)
                  }
                </div>
              </div>

              <div className="cart__price-checkout d-flex">
                <div className="cart__price-checkout--left">
                  <p>Tax 21%:</p>
                  <p>Quantity:</p>
                  <p>Total:</p>
                </div>

                <div className="cart__price-checkout--right">
                  <p>
                    {
                        this.props.currentCurrency?.symbol +
                        (!this.props.cart ||
                        this.props.cart?.length === 0 ? (0).toFixed(2) :
                            (totalPrice(this.props.cart, this.props.currentCurrency?.symbol) * 0.21)
                                .toFixed(2))
                    }
                  </p>
                  <p>{this.props.cartQuantity}</p>
                  <p>
                    {
                        this.props.currentCurrency?.symbol +
                        (!this.props.cart ||
                        this.props.cart.length === 0 ? (0).toFixed(2) :
                            totalPrice(this.props.cart, this.props?.currentCurrency.symbol)
                                .toFixed(2))
                    }
                  </p>
                </div>
              </div>

              <button
                  disabled={!this.props.cart || this.props.cart.length === 0 ? true : null}
                  className="primary__button cart__primary__button"
                  onClick={!this.props.cart || this.props.cart.length === 0 ? null : this.checkOut}
              >

                <span>ORDER</span>
              </button>

            </div>

            <div className={"category__overlay" + (this.props.isCartOpen ? "" : " d-none")}></div>
          </section>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartQuantity: state.cartQuantity,
    currentCurrency: state.currentCurrency,
    isCartOpen: state.isCartOpen,
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Cart)

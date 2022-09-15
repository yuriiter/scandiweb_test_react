import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

import {totalPrice, complexKey} from "../utils";
import NavigationCartItem from './NavigationCartItem'
import cartIcon from '../assets/img/cart.svg'

class NavigationCart extends Component {

  clickableRef = React.createRef(null)
  checkIfClickedOutside = e => {
    if(this.props.isCartOpen && this.clickableRef.current && !this.clickableRef.current.contains(e.target)) {
      this.props.dispatch({type: "TOGGLE_CART"})
    }
  }

  toggleCart = () => {
    this.props.dispatch({type: "TOGGLE_CART"})
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.checkIfClickedOutside)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.checkIfClickedOutside)
  }

  checkOut = () => {
    this.toggleCart()
    this.props.dispatch({type: "CHECK_OUT"})
  }


  render () {
    return (
      <div className="navigation__cart" ref={this.clickableRef}>
        <img src={cartIcon} alt="Open cart" onClick={this.toggleCart} />
        <div
            onClick={this.toggleCart}
            className={"navigation__cart--count" + (this.props.cartQuantity === 0 ? " d-none" : "")}
        >
          <span>{this.props.cartQuantity}</span>
        </div>
        {this.props.isCartOpen ? (
          <div className="cart__wrapper">
            <div className="cart__wrapper-heading">
              <h4>My Bag, <span>{this.props.cartQuantity} {this.props.cartQuantity === 1 ? "item" : "items"}</span></h4>
              
            </div>
            <ul className="cart__wrapper-items d-flex">
              {this.props.cart?.map(product => <NavigationCartItem key={complexKey(product)} product={product} />)}
            </ul>

            <div className="cart__wrapper-total d-flex justify-content-between">
              <span>Total</span>
              <span>
                {
                  this.props.currentCurrency.symbol +
                    (!this.props.cart ||
                    this.props.cart.length === 0 ? (0).toFixed(2) :
                        totalPrice(this.props.cart, this.props.currentCurrency.symbol)
                            .toFixed(2))
                }
              </span>
            </div>

            <div className="cart__wrapper-buttons d-flex justify-content-between">
              <Link to={"/cart"} onClick={this.toggleCart} className="secondary__button">
                <span>View bag</span>
              </Link>
              <button
                  disabled={!this.props.cart || this.props.cart.length === 0 ? true : null}
                  className="primary__button"
                  onClick={!this.props.cart || this.props.cart.length === 0 ? null : this.checkOut}
              >
                <span>CHECK OUT</span>
              </button>
            </div>

          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentCurrency: state.currentCurrency,
    cartQuantity: state.cartQuantity,
    cart: state.cart,
    isCartOpen: state.isCartOpen
  }
}

export default connect(mapStateToProps)(NavigationCart)

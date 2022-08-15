import React, { Component } from 'react'
import {connect} from 'react-redux'

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


  render () {
    return (
      <div className="navigation__cart" ref={this.clickableRef}>
        <img src={cartIcon} alt="Open cart" onClick={this.toggleCart} />
        <div onClick={this.toggleCart} className={"navigation__cart--count" + (this.props.cart.length === 0 ? " d-none" : "")}><span>{this.props.cart.length}</span></div>
        {this.props.isCartOpen ? (
          <div className="cart__wrapper">
            <div className="cart__wrapper-heading">
              <h4>My Bag, <span>{this.props.cart.length} {this.props.cart.length === 1 ? "item" : "items"}</span></h4>
              
            </div>
            <ul className="cart__wrapper-items d-flex">
              <NavigationCartItem />
              <NavigationCartItem />
              <NavigationCartItem />
            </ul>

            <div className="cart__wrapper-total d-flex justify-content-between">
              <span>Total</span>
              <span>$200.00</span>
            </div>

            <div className="cart__wrapper-buttons d-flex justify-content-between">
              <button className="secondary__button">
                <span>View bag</span>
              </button>
              <button className="primary__button">
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
    cart: state.cart,
    isCartOpen: state.isCartOpen
  }
}

export default connect(mapStateToProps)(NavigationCart)

import { Component } from 'react'
import Navigation from '../components/Navigation.jsx'
import {connect} from "react-redux";
import CartItem from "../components/CartItem";

class Cart extends Component {
  render () {
    return (
        <div>
          <Navigation />
          <section className="cart">
            <div className="container">
              <h2 className={"cart__title"}>cart</h2>
              <div className="cart__items row splitter">
                <CartItem />
                <CartItem />
              </div>

              <div className="cart__price-checkout d-flex">
                <div className="cart__price-checkout--left">
                  <p>Tax 21%:</p>
                  <p>Quantity:</p>
                  <p>Total:</p>
                </div>

                <div className="cart__price-checkout--right">
                  <p>$42.00</p>
                  <p>3</p>
                  <p>$200.00</p>
                </div>
              </div>

              <button className="info__button">
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
    isCartOpen: state.isCartOpen
  }
}

export default connect(mapStateToProps)(Cart)

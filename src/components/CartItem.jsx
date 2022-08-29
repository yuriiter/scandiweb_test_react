import { Component } from 'react'
import plusIcon from "../assets/img/plus.svg";
import minusIcon from "../assets/img/minus.svg";
import cartImage from "../assets/img/cart_navigation_placeholder.jpg";
import {connect} from "react-redux";

class CartItem extends Component {
  render () {
    return (
        <div className="cart__item-wrapper">
          <div className="cart__item d-flex justify-content-between">
            <div className="cart__item-detail__info">
              <h2 className="cart__item-detail__info-title">{this.state.product?.brand}</h2>
              <h3 className="cart__item-detail__info-subtitle">{this.state.product?.name}</h3>

              <div className="info__price">
                <span className={"info__price-value"}>
                      {
                          this.props.currentCurrency?.symbol
                          + "" + this.state.product?.prices?.find(price => {
                            return price.currency.symbol === this.props.currentCurrency.symbol
                          })?.amount
                      }
                </span>
              </div>

              <div className="info__size">
                <span>Size:</span>
                <div className="info__size-items">
                  <div className={"info__size-items--active"}><span>xs</span></div>
                  <div><span>s</span></div>
                  <div><span>m</span></div>
                  <div><span>l</span></div>
                </div>
              </div>

              <div className="info__color">
                <span>Color:</span>
                <div className="info__color-items">
                  <div className={"info__color-items--active"} style={{backgroundColor: "#614145"}}></div>
                  <div style={{backgroundColor: "#614145"}}></div>
                  <div style={{backgroundColor: "#614145"}}></div>
                  <div style={{backgroundColor: "#614145"}}></div>
                </div>
              </div>

            </div>

            <div className="cart__item-gallery d-flex">
              <div className="cart__counter d-flex flex-direction-column justify-content-between">
                <button><img src={plusIcon} alt="Increment counter" /></button>
                <span className="cart__count">3</span>
                <button><img src={minusIcon} alt="Decrement counter" /></button>
              </div>
              <div className="cart__image">
                <img src={cartImage} alt="" />
              </div>
            </div>
          </div>
        </div>

    )
  }
}


const mapStateToProps = state => {
  return {
    currentCurrency: state.currentCurrency
  }
}

export default connect(mapStateToProps)(CartItem)

import { Component } from 'react'

import cartImage from '../assets/img/cart_navigation_placeholder.jpg'
import plusIcon from '../assets/img/plus.svg'
import minusIcon from '../assets/img/minus.svg'


class NavigationCartItem extends Component {
  render () {
    return (
      <li className="d-flex">
        <div className="cart__info">
          <h4>Name</h4>
          <span>$50.00</span>
          <div className="cart__size">
            <span>Size:</span>
            <div className="cart__size--items d-flex">
              <div className="cart__size--items--active">xs</div>
              <div>s</div>
              <div>l</div>
              <div>xl</div>
            </div>
          </div>
          <div className="cart__color">
            <span>Color:</span>
            <div className="cart__color--items d-flex">
              <div className="cart__color--items--active" style={{backgroundColor: "#D3D2D5"}}></div>
              <div className="" style={{backgroundColor: "#2B2B2B"}}></div>
              <div className="" style={{backgroundColor: "#0F6450"}}></div>
              <div className="" style={{backgroundColor: "#"}}></div>
            </div>
          </div>
        </div>
        <div className="cart__counter d-flex">
          <button><img src={plusIcon} alt="Increment counter" /></button>
          <span className="cart__count">3</span>
          <button><img src={minusIcon} alt="Decrement counter" /></button>
        </div>
        <div className="cart__image">
          <img src={cartImage} alt="" />
        </div>
      </li>
    )
  }
}

export default NavigationCartItem

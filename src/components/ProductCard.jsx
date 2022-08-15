import { Component } from 'react'

import productCardImage from '../assets/img/product_card_img.jpg'
import whiteCart from '../assets/img/cart_white.svg'

class ProductCard extends Component {

  render () {
    return (
      <a className={"category__product-card" + (this.props.available ? "" : " category__product-card--unavailable")} href="#">
        <div className="category__product-card__image-wrapper">
          <img src={productCardImage} alt="" style={this.props.available ? {} : {opacity: 0.7}} />
          {this.props.available ? null : (
            <span className="category__product-card__reason-caption">
              OUT OF STOCK
            </span>
          )}
        </div>
        <div>
          <h3>Appolo Running Short</h3>
          <p>$50.00</p>
        </div>
        {this.props.available ? (
          <div className="category__product-card__add">
            <img src={whiteCart} alt="Add product to card" />
          </div>
        ) : null}
      </a>
    )
  }
}

export default ProductCard

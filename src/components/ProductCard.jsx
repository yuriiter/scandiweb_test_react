import { Component } from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import whiteCart from '../assets/img/cart_white.svg'

class ProductCard extends Component {

    addToCart = e => {
        e.preventDefault()
        this.props.dispatch({type: "ADD_ITEM", payload: this.props.card})
    }

    render () {
        return (
            <Link
                className={
                "category__product-card" +
                (this.props.card?.inStock ? "" : " category__product-card--unavailable")
            }
                to={ "/product/" + this.props.card?.id }
            >
                <div className="category__product-card__image-wrapper">
                    <img src={this.props.card?.gallery[0]} alt="" style={this.props.card?.inStock ? {} : {opacity: 0.7}} />
                    {this.props.card?.inStock ? null : (
                        <span className="category__product-card__reason-caption">
              OUT OF STOCK
            </span>
                    )}
                </div>
                <div>
                    <h3>{ this.props.card?.brand + " " + this.props.card?.name }</h3>
                    <p>{ this.props.currentCurrency.symbol
                        + this.props.card?.prices.find(price => {
                            return price.currency.symbol === this.props.currentCurrency.symbol
                        })?.amount?.toFixed(2)}</p>
                </div>
                {this.props.card?.inStock ? (
                    <div className="category__product-card__add" onClick={this.addToCart} >
                        <img src={whiteCart} alt="Add product to card" />
                    </div>
                ) : null}
            </Link>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentCurrency: state.currentCurrency,
        cart: state.cart
    }
}

export default connect(mapStateToProps)( ProductCard )

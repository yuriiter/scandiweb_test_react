import { Component } from 'react'
import {connect} from "react-redux";

import plusIcon from '../assets/img/plus.svg'
import minusIcon from '../assets/img/minus.svg'

import {luminance} from '../utils'
import {Link} from "react-router-dom";


class NavigationCartItem extends Component {
    incrementQuantity = () => {
        this.props.dispatch({type: "ADD_ITEM", payload: this.props.product})
    }

    decrementQuantity = () => {
        this.props.dispatch({type: "REMOVE_ITEM", payload: this.props.product})
    }


    render () {
        console.log(this.props.product)
        return (
            <li className="d-flex">
                <div className="cart__info">
                    <Link to={"/product/" + this.props.product?.id}>
                        <h4>{this.props.product?.brand}</h4>
                        <h4>{this.props.product?.name}</h4>
                    </Link>
                    <span>
            {
                this.props.currentCurrency?.symbol
                + "" + this.props.product?.prices?.find(price => {
                    return price?.currency.symbol === this.props.currentCurrency?.symbol
                }).amount.toFixed(2)
            }
          </span>

                    {this.props.product?.attributes?.map(attributeSet => (
                            <div key={attributeSet.id} className={`cart__${attributeSet.type}`}>
                                <span>{ attributeSet.name }</span>
                                <div className={ `cart__${attributeSet.type}--items d-flex` }>
                                    {
                                        attributeSet.items?.map(( item, idx ) => {
                                            const style = {}
                                            if(attributeSet.type === "swatch") {
                                                style.backgroundColor = item.value
                                                if(luminance(item.value) > 0.95) {
                                                    style.borderColor = "#1D1F22"
                                                }
                                            }

                                            return (
                                                <div
                                                    className={attributeSet.pickId === item.id ?
                                                        `cart__${attributeSet.type}--items--active` : null}
                                                    style={style}
                                                    key={idx}
                                                >
                                                    { attributeSet.type !== "swatch" ? <span>{item.value}</span> : null }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    )
                    }

                </div>
                <div className="cart__counter d-flex">
                    <button onClick={this.incrementQuantity}><img src={plusIcon} alt="Increment counter" /></button>
                    <span className="cart__count">{this.props.product?.pickedQuantity}</span>
                    <button onClick={this.decrementQuantity}><img src={minusIcon} alt="Decrement counter" /></button>
                </div>
                <Link to={"/product/" + this.props.product?.id}>
                    <div className="cart__image">
                        <img src={this.props.product?.gallery[0]} alt="" />
                    </div>
                </Link>
            </li>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentCurrency: state.currentCurrency
    }
}

export default connect(mapStateToProps)(NavigationCartItem)
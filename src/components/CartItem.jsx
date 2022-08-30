import { Component } from 'react'
import {connect} from "react-redux";

import {luminance} from "../utils";
import plusIcon from "../assets/img/plus.svg";
import minusIcon from "../assets/img/minus.svg";
import arrow from "../assets/img/slider-arrow-left.svg"

class CartItem extends Component {
  state = {
    pickedPicture: 0
  }

  pickPicture = idx => {
    if(this.props.product) {
      let pickedPicture
      if(this.state.pickedPicture === 0 && idx === -1) {
        pickedPicture = this.props.product.gallery.length - 1
      }
      else {
        pickedPicture = (this.state.pickedPicture + idx) % this.props.product?.gallery.length
      }
      this.setState({
        ...this.state,
        pickedPicture: pickedPicture
      })
    }
  }

  pickAttribute(attributeSetId, itemId) {
    this.props.dispatch(
        {
          type: "PICK_ATTRIBUTE",
          payload: {
            product: this.props.product,
            attributeSetId: attributeSetId,
            itemId: itemId
          }
        })
  }

  incrementQuantity = () => {
    this.props.dispatch({type: "ADD_ITEM", payload: {id: this.props.product?.id}})
  }

  decrementQuantity = () => {
    this.props.dispatch({type: "REMOVE_ITEM", payload: {id: this.props.product?.id}})
  }

  render () {
    return (
        <div className="cart__item-wrapper">
          <div className="cart__item d-flex justify-content-between">
            <div className="cart__item-detail__info">
              <h2 className="cart__item-detail__info-title">{this.props.product?.brand}</h2>
              <h3 className="cart__item-detail__info-subtitle">{this.props.product?.name}</h3>

              <div className="info__price">
                <span className={"info__price-value"}>
                      {
                          this.props.currentCurrency?.symbol
                          + "" + this.props.product?.prices?.find(price => {
                            return price.currency.symbol === this.props.currentCurrency.symbol
                          })?.amount
                      }
                </span>
              </div>

              <div className="info__attributes">

                {
                  this.props.product?.attributes?.map(attributeSet => (
                          <div key={attributeSet.id} className={`info__${attributeSet.type}`}>
                            <span>{ attributeSet.name }</span>
                            <div className={ `info__${attributeSet.type}-items` }>
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
                                              `info__${attributeSet.type}-items--active` : null}
                                          style={style}
                                          onClick={() => this.pickAttribute(attributeSet.id, item.id)}
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

            </div>

            <div className="cart__item-gallery d-flex">
              <div style={{marginRight: "16px"}} className="cart__counter d-flex flex-direction-column justify-content-between">
                <button onClick={this.incrementQuantity}><img src={plusIcon} alt="Increment counter" /></button>
                <span className="cart__count">{this.props.product?.pickedQuantity}</span>
                <button onClick={this.decrementQuantity}><img src={minusIcon} alt="Decrement counter" /></button>
              </div>
              <div className="cart__image">
                <img
                    src={this.props.product?.gallery[this.state.pickedPicture]}
                />
                <div className="cart__image-controllers d-flex">
                  <button onClick={() => this.pickPicture(-1)}><img src={arrow} alt="" /></button>
                  <button onClick={() => this.pickPicture( 1)}><img src={arrow} alt="" /></button>
                </div>
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

import { Component } from 'react'
import {connect} from "react-redux";

import { client as apolloClient } from "../App"
import Navigation from '../components/Navigation.jsx'
import {complexKey, luminance} from '../utils'
import {GET_PRODUCT_DETAIL} from "../GraphQL/Queries";

class ProductDetail extends Component {
    state = {
        pickedPicture: 0
    }

    componentDidMount() {
        apolloClient.query({query: GET_PRODUCT_DETAIL(this.props.match?.params.id)})
            .then(response => {
                const productDetail = { ...response.data.product }
                productDetail.attributes = productDetail.attributes.map(attributeSet => {
                    const changedAttributeSet = { ...attributeSet }
                    changedAttributeSet.pickId = attributeSet.items[0].id
                    return changedAttributeSet
                })
                this.setState({...this.state, product: productDetail})
            })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match?.params.id !== this.props.match?.params.id) {
            apolloClient.query({query: GET_PRODUCT_DETAIL(this.props.match?.params.id)})
                .then(response => {
                    const productDetail = { ...response.data.product }
                    productDetail.attributes = productDetail.attributes.map(attributeSet => {
                        const changedAttributeSet = { ...attributeSet }
                        changedAttributeSet.pickId = attributeSet.items[0].id
                        return changedAttributeSet
                    })
                    this.setState({...this.state, product: productDetail})
                })
        }

    }

    pickPicture = idx => this.setState({...this.state, pickedPicture: idx})


    pickAttributeLocal(attributeSetId, itemId) {
        const attributes = [ ...this.state.product?.attributes ]
        attributes.find(attributeSet => attributeSet.id === attributeSetId).pickId = itemId
        this.setState({...this.state, attributes: { ...attributes }})
    }

    pickAttribute(attributeSetId, itemId) {
        this.pickAttributeLocal(attributeSetId, itemId)
    }


    addToCart = () => this.props.dispatch({type: "ADD_ITEM", payload: { ...this.state.product }})

    render () {
        // console.log(this.props.cart.map(p => complexKey(p)))
        return (
            <div>
                <Navigation />
                <section className="product-detail">
                    <div className="container" style={{paddingBottom: "178px"}}>
                        <div className="row">

                            <div className="product-detail__gallery d-flex px-20">
                                <div className="gallery__photos d-flex">
                                    {
                                        this.state.product?.gallery?.map(( pic, idx ) => (
                                            <img
                                                className={idx === this.state.pickedPicture ? "gallery__photos--active" : null}
                                                src={pic}
                                                alt={this.state.product?.name}
                                                key={idx}
                                                onClick={() => this.pickPicture(idx)}
                                            />
                                        ))
                                    }
                                </div>
                                <img className="gallery__main"
                                     src={this.state.product?.gallery && this.state.product?.gallery[this.state.pickedPicture]}
                                     alt="Main picture of the product"
                                />
                            </div>

                            <div className="product-detail__info px-20">
                                <h2 className="product-detail__info-title">{this.state.product?.brand}</h2>
                                <h3 className="product-detail__info-subtitle">{this.state.product?.name}</h3>
                                <div className="info__attributes">

                                    {
                                        this.state.product?.attributes?.map(attributeSet => (
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


                                <div className="info__price">
                                    <span>Price:</span>
                                    <span className={"info__price-value"}>
                      {
                          this.props.currentCurrency?.symbol
                          + "" + this.state.product?.prices.find(price => {
                              return price.currency.symbol === this.props.currentCurrency.symbol
                          }).amount.toFixed(2)
                      }
                    </span>
                                </div>

                                <button
                                    className="primary__button"
                                    disabled={!this.state.product?.inStock}
                                    onClick={this.state.product?.inStock ? this.addToCart : null}
                                >
                                    <span>{ this.state.product?.inStock ? "ADD TO CART" : "OUT OF STOCK" }</span>
                                </button>

                                <p className="info__description" dangerouslySetInnerHTML={{__html: this.state.product?.description }}>
                                </p>
                            </div>

                            <div className="product-detail__spacer"></div>
                        </div>
                    </div>
                    <div className={"category__overlay" + (this.props.isCartOpen ? "" : " d-none")}></div>
                </section>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isCartOpen: state.isCartOpen,
        currentCurrency: state.currentCurrency
    }
}

export default connect(mapStateToProps)(ProductDetail)
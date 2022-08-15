import { Component } from 'react'
import Navigation from '../components/Navigation.jsx'
import {connect} from "react-redux";

class Cart extends Component {
  render () {
    return (
        <div>
          <Navigation />
          <section className="product-detail">
            <div className="container">
              <div className="row">

                <div className="product-detail__gallery d-flex px-20">
                  <div style={{paddingRight: "20px"}} className="gallery__photos d-flex">
                    <img src={null} alt="" />
                    <img src={null} alt="" />
                    <img src={null} alt="" />
                  </div>
                  <img className="gallery__main" src={null} alt="" />
                </div>

                <div className="product-detail__info px-20">
                  <h2 className="product-detail__info-title">Apollo</h2>
                  <h3 className="product-detail__info-subtitle">Running Short</h3>
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

                  <div className="info__price">
                    <span>Price:</span>
                    <span className={"info__price-value"}>$50.00</span>
                  </div>

                  <button className="info__button">
                    <span>ADD TO CART</span>
                  </button>

                  <p className="info__description">
                    Find stunning women's cocktail dresses and party dresses.
                    Stand out in lace and metallic cocktail
                    dresses and party dresses from all your favorite brands.
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
    isCartOpen: state.isCartOpen
  }
}

export default connect(mapStateToProps)(Cart)

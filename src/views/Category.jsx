import { Component } from 'react'
import { connect } from 'react-redux'

import Navigation from '../components/Navigation.jsx'
import ProductCard from '../components/ProductCard.jsx'

class Category extends Component {
  
  render () {
    return (
      <div>
        <Navigation />
        <section className="category">
          <div className="container">
            <div className="row">
              <h1 className="category__headline px-20">Category name</h1>
            </div>
            <div className="row category__cards px-20">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
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

export default connect(mapStateToProps)(Category)

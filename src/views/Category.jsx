import { Component } from 'react'
import { connect } from 'react-redux'

// import { GET_PRODUCTS_QUERY } from "../GraphQL/Queries"
import { client as apolloClient} from "../App";
import Navigation from '../components/Navigation.jsx'
import ProductCard from '../components/ProductCard.jsx'
import {GET_PRODUCTS_QUERY} from "../GraphQL/Queries";


class Category extends Component {


  state = {
    pageExists: false,
    productCards: []
  }


  componentDidUpdate(prevProps) {
    if(prevProps.categories !== this.props.categories) {
      const pageExists = this.pageExists(this.props.match?.params.category_name)
      if(pageExists) {
        apolloClient.query({
          query: GET_PRODUCTS_QUERY(this.renderName(this.props.match?.params.category_name))
        })
            .then(response => {
              const productCards = response.data.category?.products?.map(product => {
                const modifiedProduct = {...product}
                modifiedProduct.attributes = modifiedProduct.attributes.map(attributeSet => {
                  const changedAttributeSet = { ...attributeSet }
                  changedAttributeSet.pickId = attributeSet.items[0].id
                  return changedAttributeSet
                })
                return modifiedProduct
              })

              this.setState({
                ...this.state,
                productCards: productCards
              })
            })
      }
      this.setState({...this.state, pageExists: pageExists})
    }

    if(prevProps.match?.params.category_name !== this.props.match?.params.category_name) {
      const pageExists = this.pageExists(this.props.match?.params.category_name)
      if(pageExists) {
        apolloClient.query({
          query: GET_PRODUCTS_QUERY(this.renderName(this.props.match?.params.category_name))
        })
            .then(response => {
              const productCards = response.data.category?.products?.map(product => {
                const modifiedProduct = {...product}
                modifiedProduct.attributes = modifiedProduct.attributes.map(attributeSet => {
                  const changedAttributeSet = { ...attributeSet }
                  changedAttributeSet.pickId = attributeSet.items[0].id
                  return changedAttributeSet
                })
                return modifiedProduct
              })

              this.setState({
                ...this.state,
                productCards: productCards
              })

            })
      }
      this.setState({...this.state, pageExists: pageExists})
    }
  }


  pageExists(categoryName) {
    let exists = false
    if(!categoryName && this.props.categories) {
      exists = true
    }

    // if path param exists, categories are fetched and contain the path param
    else if(
        categoryName &&
        this.props.categories &&
        this.props.categories?.find(category => category === categoryName)) {

      exists = true
    }
    return exists
  }

  renderName(categoryName) {
    let renderedName;

    // if there is no path param and the categories are fetched:
    if(!categoryName && this.props.categories) {
      renderedName = this.props.categories[0]
    }

    // if path param exists, categories are fetched and contain the path param
    else if(
        categoryName &&
        this.props.categories &&
        this.props.categories?.find(category => category === categoryName)) {

      renderedName = categoryName
    }

    return renderedName
  }



  render () {
    return (
      <div>
        <Navigation />
        <section className="category">
          <div className="container">
            <div className="row">
              <h1 className="category__headline px-20">
                {
                  this.pageExists(this.props.match?.params.category_name) ?
                    this.renderName(this.props.match?.params.category_name) :
                    "Page doesn't exist"
                }
              </h1>
            </div>
            <div className="category__cards px-20">
              {
                this.state.productCards.map(card => (
                    <ProductCard card={card} key={card.id} />
                ))
              }
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
    categories: state.categories,
    isCartOpen: state.isCartOpen
  }
}

export default connect(mapStateToProps)(Category)

import { Component } from 'react'
import {connect} from "react-redux";

import { client as apolloClient } from "../App";
import { GET_CATEGORIES} from "../GraphQL/Queries";
import Logo from '../assets/img/logo.svg'
import CurrencyPicker from './CurrencyPicker.jsx'
import NavigationCart from './NavigationCart.jsx'
import {Link} from "react-router-dom";

class Navigation extends Component {
  componentDidMount() {
   apolloClient.query({query: GET_CATEGORIES})
        .then(response => {
          this.props.dispatch({type: "CATEGORIES",
            payload: response.data.categories.map(category => category.name)})
        })
  }

  render () {
    return (
      <div className="navigation">
        <div className="container">
          <div className="row">
            <nav className="px-20 navigation__links">
              <ul className="d-flex">
                {this.props.categories?.map((category, idx) => {
                  let href = "/"
                  if(idx !== 0) {
                    href += category
                  }
                  return <li key={idx}><Link to={href}>{category}</Link></li>
                })}
              </ul>
            </nav>

            <div className="px-20 navigation__logo">
              <Link to="/">
                <img src={Logo} alt="" />
              </Link>
            </div>

            <div className="px-20 d-flex navigation__buttons">
              <CurrencyPicker />
              <NavigationCart />
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps)(Navigation)

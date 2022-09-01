import { Component, createRef } from 'react'
import {connect} from "react-redux";

import { client as apolloClient } from "../App";
import { GET_CATEGORIES} from "../GraphQL/Queries";
import Logo from '../assets/img/logo.svg'
import CurrencyPicker from './CurrencyPicker.jsx'
import NavigationCart from './NavigationCart.jsx'
import {Link} from "react-router-dom";

class Navigation extends Component {
  mobileNavToggleRef = createRef(null)
  mobileNavListRef = createRef(null)
  state = {
    mobileNavOpen: false
  }

  checkIfClickedOutside = e => {
    if(this.state.mobileNavOpen &&
        this.mobileNavToggleRef.current &&
        !this.mobileNavToggleRef.current.contains(e.target) &&
        e.target !== this.mobileNavListRef.current &&
        !this.mobileNavListRef.current.contains(e.target)
    ) {

      this.setState({mobileNavOpen: false})
    }
  }

  componentDidMount() {
    apolloClient.query({query: GET_CATEGORIES})
       .then(response => {
         this.props.dispatch({type: "CATEGORIES",
           payload: response.data.categories.map(category => category.name)})
       })

    document.addEventListener("mousedown", this.checkIfClickedOutside)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.checkIfClickedOutside)
  }

  toggleMobileNav = () => this.setState({mobileNavOpen: !this.state.mobileNavOpen})

  render () {
    return (
      <div className="navigation">
        <div className="container">
          <div className="row">
            <nav className="px-20 navigation__links">
              <div
                  className={ "burger-mobile" + (this.state.mobileNavOpen ? " burger-mobile--active" : "")}
                  onClick={this.toggleMobileNav}
                  ref={this.mobileNavToggleRef}
              >
                <div className="burger-mobile--items">
                  <div className="burger-mobile--item"></div>
                  <div className="burger-mobile--item"></div>
                  <div className="burger-mobile--item"></div>
                </div>
              </div>
              <ul ref={this.mobileNavListRef}>
                {this.props.categories?.map((category, idx) => {
                  let href = "/"
                  if(idx !== 0) {
                    href += category
                  }
                  return <li key={idx} onClick={() => this.setState({mobileNavOpen: false})}><Link to={href}>{category}</Link></li>
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

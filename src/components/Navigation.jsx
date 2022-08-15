import { Component } from 'react'
import Logo from '../assets/img/logo.svg'
import CurrencyPicker from './CurrencyPicker.jsx'
import NavigationCart from './NavigationCart.jsx'

class Navigation extends Component {
  render () {
    return (
      <div className="navigation">
        <div className="container">
          <div className="row">
            <nav className="px-20 navigation__links">
              <ul className="d-flex">
                <li><a href="# ">women</a></li>
                <li><a href="# ">men</a></li>
                <li><a href="# ">kids</a></li>
              </ul>
            </nav>

            <div className="px-20 navigation__logo">
              <a href="# ">
                <img src={Logo} alt="" />
              </a>
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

export default Navigation

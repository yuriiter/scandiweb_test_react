import React, { Component } from 'react'

import pickerArrowIcon from '../assets/img/picker_arrow.svg'
import {GET_CURRENCIES} from "../GraphQL/Queries";
import { client as apolloClient } from "../App"
import {connect} from "react-redux";

class CurrencyPicker extends Component {
  clickableRef = React.createRef(null)

  state = {
    currencies: [],
    openModal: false
  }

  toggleModal = () => {
    const openModalNew = !this.state.openModal
    this.setState({openModal: openModalNew})
  }

  checkIfClickedOutside = e => {
    if(this.state.openModal &&
        this.clickableRef.current &&
        !this.clickableRef.current.contains(e.target)) {

      this.setState({openModal: false})
    }
  }

  chooseCurrency = idx => {
    const newCurrency = this.state.currencies[idx]
    this.props.dispatch({type: "SET_CURRENT_CURRENCY",
      payload: newCurrency
    })
  }


  componentDidMount() {
    document.addEventListener("mousedown", this.checkIfClickedOutside)
    apolloClient.query({query: GET_CURRENCIES})
        .then(response => {
          this.props.dispatch({type: "SET_CURRENT_CURRENCY",
            payload: response.data.currencies[0]
          })
          this.setState({...this.state, currencies: response.data.currencies})
        })
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.checkIfClickedOutside)
  }


  render () {
    return (
      <div className="navigation__choose-currency" onClick={this.toggleModal} ref={this.clickableRef} >
        <span className="currency-sign">{this.props.currentCurrency?.symbol}</span>
        <img className="choose-currency__arrow" src={pickerArrowIcon} alt="Choose currency" style={this.state.openModal ? {transform: "rotateX(180deg)"} : {}} />
        <ul className={"choose-currency__picker " + (this.state.openModal ? "d-flex" : "d-none")}>
          {this.state.currencies.map((currency, idx) => (
            <li key={idx} onClick={() => this.chooseCurrency(idx)} >
              <span>{currency.symbol + " " + currency.label}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentCurrency: state.currentCurrency
  }
}

export default connect(mapStateToProps)( CurrencyPicker )

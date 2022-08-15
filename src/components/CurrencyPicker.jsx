import React, { Component } from 'react'

import pickerArrowIcon from '../assets/img/picker_arrow.svg'

class CurrencyPicker extends Component {
  clickableRef = React.createRef(null)

  currencies = [
    {sign: "$", name: "USD"},
    {sign: "€", name: "EUR"},
    {sign: "¥", name: "JPY"}
  ]

  state = {
    currentCurrency: this.currencies[0],
    openModal: false
  }

  toggleModal = () => {
    const openModalNew = !this.state.openModal
    this.setState({openModal: openModalNew})
  }

  checkIfClickedOutside = e => {
    if(this.state.openModal && this.clickableRef.current && !this.clickableRef.current.contains(e.target)) {
      this.setState({openModal: false})
    }
  }

  chooseCurrency = idx => {
    const newCurrency = this.currencies[idx]
    this.setState({currentCurrency: newCurrency})
  }


  componentDidMount() {
    document.addEventListener("mousedown", this.checkIfClickedOutside)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.checkIfClickedOutside)
  }


  render () {
    return (
      <div className="navigation__choose-currency" onClick={this.toggleModal} ref={this.clickableRef} >
        <span className="currency-sign">{this.state.currentCurrency.sign}</span>
        <img className="choose-currency__arrow" src={pickerArrowIcon} alt="Choose currency" style={this.state.openModal ? {transform: "rotateX(180deg)"} : {}} />
        <ul className={"choose-currency__picker " + (this.state.openModal ? "d-flex" : "d-none")}>
          {this.currencies.map((currency, idx) => (
            <li key={idx} onClick={() => this.chooseCurrency(idx)} >
              <span>{currency.sign + " " + currency.name}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CurrencyPicker

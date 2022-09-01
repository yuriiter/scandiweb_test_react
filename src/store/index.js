import {createStore} from 'redux'
import {complexKey} from "../utils";


const reducerFn = (state = {
  cart: [],
  cartQuantity: 0,
  isCartOpen: false
}, action) => {

  if(action.type === "ADD_ITEM") {
    const oldState = {...state}
    const key = complexKey(action.payload)
    const currentProductInCart = oldState.cart.find(product => complexKey(product) === key)

    if(!currentProductInCart) {
      const card = JSON.parse(JSON.stringify(action.payload))
      card.pickedQuantity = 1
      oldState.cart.push(card)
    }
    else {
      currentProductInCart.pickedQuantity += 1
    }
    oldState.cartQuantity += 1
    oldState.cart = oldState.cart.map(product => {return {...product}})
    return oldState;
  }


  if(action.type === "REMOVE_ITEM") {
    console.log("sdfjsadlfj")
    const oldState = {...state}
    const key = complexKey(action.payload)
    const currentProductInCart = oldState.cart.find(product => complexKey(product) === key)

    if(!currentProductInCart) {
      return oldState
    }
    else if(currentProductInCart.pickedQuantity === 1) {
      oldState.cart = oldState.cart.filter(product => product !== currentProductInCart)
    }
    else {
      currentProductInCart.pickedQuantity -= 1
    }
    oldState.cartQuantity -= 1
    oldState.cart = oldState.cart.map(product => {return {...product}})
    return oldState;
  }


  if(action.type === "CHECK_OUT") {
    const oldState = {...state}
    oldState.cart = []
    oldState.cartQuantity = 0
    return oldState
  }


  if(action.type === "TOGGLE_CART") {
    const oldState = {...state}
    oldState.isCartOpen = !oldState.isCartOpen
    return oldState
  }


  if(action.type === "CATEGORIES") {
    const oldState = {...state}
    oldState.categories = action.payload
    return oldState
  }


  if(action.type === "SET_CURRENT_CURRENCY") {
    const oldState = {...state}
    oldState.currentCurrency = action.payload
    return oldState
  }


  return state;
}

const store = createStore(reducerFn)

export default store;

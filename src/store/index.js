import {createStore} from 'redux'

const reducerFn = (state = {cart: [], isCartOpen: false}, action) => {
  if(action.type === "ADD_ITEM") {
    const oldState = {...state}
    oldState.cart.append(action.payload)
    return oldState;
  }
  if(action.type === "REMOVE_ITEM") {
    const oldState = {...state}
    oldState.cart = oldState.cart.filter(item => item.id !== action.payload)
    return oldState;
  }
  if(action.type === "TOGGLE_CART") {
    const oldState = {...state}
    oldState.isCartOpen = !oldState.isCartOpen
    return oldState
  }

  return state;
}

const store = createStore(reducerFn)

export default store;

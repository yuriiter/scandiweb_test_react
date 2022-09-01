import {createStore} from 'redux'



const reducerFn = (state = {
  cart: [],
  cartQuantity: 0,
  isCartOpen: false
}, action) => {

  if(action.type === "ADD_ITEM") {
    const oldState = {...state}
    const currentProductInCart = oldState.cart.find(product => product.id === action.payload.id)

    if(!currentProductInCart) {
      const card = action.payload
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
    const oldState = {...state}
    const currentProductInCart = oldState.cart.find(product => product.id === action.payload.id)

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


  if(action.type === "PICK_ATTRIBUTE") {
    const {product, attributeSetId, itemId} = action.payload

    const currentProductInCart = state.cart
        .find(iteratedProduct => iteratedProduct.id === product.id)

    if(!currentProductInCart) {
      return state
    }


    const attribute = currentProductInCart.attributes
        .find(attributeSet => attributeSet.id === attributeSetId)
    if(attribute.pickId === itemId) {
      return state
    }

    attribute.pickId = itemId
    const oldState = JSON.parse(JSON.stringify(state))
    return oldState
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

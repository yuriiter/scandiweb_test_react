export const luminance = color => {
    const r = parseInt(color.substring(1, 3), 16)
    const g = parseInt(color.substring(3, 5), 16)
    const b = parseInt(color.substring(5), 16)

    return ( 0.2126 * r + 0.7152 * g + 0.0722 * b ) / 255
}

export const totalPrice = ( cart, currencySymbol ) => {
    if(!currencySymbol || !cart || cart.length === 0) {
        return
    }

    let total = 0
    cart.forEach(product => {
        total += ( product.prices.find(price =>
            price.currency.symbol === currencySymbol)
            .amount * product.pickedQuantity )
    })

    return total
}


export const combinedId = product => {
    return product.id +
        product.attributes.map(attributeSet => attributeSet.pickId).join(";")
}
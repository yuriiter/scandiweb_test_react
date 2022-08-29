import { gql } from "@apollo/client"

export const GET_PRODUCTS_QUERY = category => gql`
    query {
      category(input: {title: "${category}"}) {
        products {
          id
          name
          description
          inStock
          gallery
          brand
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              symbol
            }
            amount
          }
        }
      }
    }
`

export const GET_CATEGORIES = gql`
    query {
       categories {
        name
      }
    }
`

export const GET_CURRENCIES = gql`
    query {
        currencies {
            label
            symbol
        }
    }
`
export const GET_PRODUCT_DETAIL = id => gql`
    query {
        product(id: "${id}") {
            id
            name
            description
            inStock
            gallery
            brand
            attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
            prices {
                currency {
                    symbol
                }
                amount
            }
        }
    }
`

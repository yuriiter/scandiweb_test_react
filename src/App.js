import './sass/_main.scss'
import Category from './views/Category.jsx'
import ProductDetail from './views/ProductDetail.jsx'
import {BrowserRouter, Routes, Route, Switch} from "react-router-dom"
import Cart from "./views/Cart";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: "http:///localhost:4000/graphql",
    cache: new InMemoryCache()
})

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Switch>
                    <Route path="/product/:id" render={props => <ProductDetail {...props} />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/:category_name?" render={props =>  <Category {...props} />  } />
                </Switch>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App


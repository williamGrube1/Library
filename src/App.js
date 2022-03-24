import './index.css';
import React, {useState} from "react";
import Nav from './Components/Nav';
import Home from './pages/Home';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Books from './pages/Books';
import {books} from './data'
import Bookinfo from './pages/BookInfo';
import Cart from './pages/Cart';

function App() {
  const [cart, setCart] = useState([])

function addToCart(book){
  setCart([...cart, {...book, quantity: 1}])
}


function changeQuantity(book, quantity){
  setCart(cart.map(item => 
      item.id === book.id
      ? {
        ...item, quantity: +quantity
      }
      : item
    )
  )
}

function removeItem(item){
  setCart(cart.filter(book => book.id !== item.id))
}

function numberOfItems(cart){
  let counter = 0;
  cart.forEach(item => {
    counter += item.quantity
  } )
  return counter
}

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems} cart={cart}/>
        <Route path="/" exact component={Home}/>
        <Route path="/books" exact render={() => <Books books={books}/>}/>
        <Route path="/books/:id" render={() => <Bookinfo books={books} addToCart={addToCart} cart={cart}/> } />
        <Route path="/cart" render={() => <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem}/>} />

        <Footer />
      </div>
    </Router> 
  );
}

export default App;

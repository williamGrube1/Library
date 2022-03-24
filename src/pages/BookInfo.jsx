import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import Rating from '../Components/ui/rating';
import Price from '../Components/ui/Price';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Book from '../Components/ui/book';


const Bookinfo = ({ books, addToCart, cart }) => {
    const {id}  = useParams();
    console.log(id)
    const book = books.find(book => +book.id === +id)

    function addBookToCart(book) {
        addToCart(book)
    }

    function bookExistsOnCart(){
        return cart.find(book => book.id === +id)
    }

    return (
        <div id="books__body">
            <main id="books__main">
                <div className="books__container">
                    <div className="row">
                        <div className="book__selected--top">
                            <Link to="/books" className="book__link">
                                <FontAwesomeIcon icon="arrow-left" />
                            </Link>
                            <Link to="/books" className="book__link">
                                <h2 className='book__selected--title--top'>Books</h2>
                            </Link>
                        </div>
                        <div className="book__selected">
                            <figure className="book__selected--figure">
                                <img src={book.url} alt="" className='book__selected--img' />
                            </figure>
                            <div className="book__selected--description">
                                <h2 className='book__seleced--title'>{book.title}</h2>
                                <Rating rating={book.rating} />
                                <Price salePrice={book.salePrice} originalPrice={book.originalPrice} />
                                <div className="book__summary">
                                    <div className="book__summary--title">Summary</div>
                                    <p className="book__summary--para">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Mollitia odit maiores quae, necessitatibus excepturi quis dolorum 
                                        consequatur alias repudiandae in dolore, a reiciendis doloremque 
                                        laudantium blanditiis vitae fuga laboriosam quo?
                                    </p>
                                    <div>
                                        {bookExistsOnCart() ? 
                                        <Link to="/cart" className="Book__link"> <button className="btn">Checkout</button> </Link>
                                        : <button className="btn" onClick={() => addBookToCart(book)}>Add to Cart</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="books__container">
                    <div className="row">
                        <div className="book__selected--top">
                            <h2 className="book__selected--title--top">
                                Recomended Books
                            </h2>
                        </div>
                        <div className="books">
                        {
                            books.filter(book => book.rating === 5 && +book.id !== +id)
                                    .slice(0, 4)
                                    .map(book => <Book book={book} key={book.id} />)
                        }
                        </div>
                    </div> 
                </div>
            </main>
        </div>
    );
}

export default Bookinfo;

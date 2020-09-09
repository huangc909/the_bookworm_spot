import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const WishList = (props) => {
  const [books, setBooks] = useState([])

  const { msgAlert } = props

  // API Request to view all books (created by their user)
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/books/`,
      headers: {
        'Authorization': `Token ${props.user.token}`
      }
    })
      .then(res => setBooks(res.data))
      .then(() => msgAlert({
        heading: 'Showing all books',
        message: messages.showWishListSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setBooks({ title: '', author: '' })
        msgAlert({
          head: 'Failed to show all books ' + error.message,
          message: messages.showWishListFailure,
          variant: 'danger'
        })
      })
  }, [])

  // filter through all of the books created by the user,
  // find the books that are on the wish list
  const findWishlistBooks = books.filter(book => book.onWishlist === true)

  // display each of the wishlist books
  const wishListBooks = findWishlistBooks.map(book => (
    <li key={book.id}>
      <div className="photo-and-title">
        <div>
          <img src="https://user-images.githubusercontent.com/53062479/89836158-2a23e800-db34-11ea-8fd4-983f002de819.jpg" className="book-image"/>
        </div>
        <div className="book-title">
          <Link to={`/books/${book.id}/`} className="link-title">{book.title}</Link>
        </div>
      </div>
    </li>
  ))

  return (
    <div className="list-style">
      <h1>My Wishlist Books</h1>
      <br/>
      <Link to={'/create-book/'}>
        <button className="button" variant="primary">Add Book</button>
      </Link>
      <div>
        <div>
          <ol>
            {wishListBooks}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default WishList

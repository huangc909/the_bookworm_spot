import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const Books = (props) => {
  const [books, setBooks] = useState([])

  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/books/`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBooks(res.data.books))
      .then(() => msgAlert({
        heading: 'Showing all books',
        message: messages.showBooksSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setBooks({ title: '', author: '', note: '', rating: '', onWishlist: '', onRead: '' })
        msgAlert({
          head: 'Failed to show all books ' + error.message,
          message: messages.showBooksFailure,
          variant: 'danger'
        })
      })
  }, [])

  const booksJsx = books.map(book => (
    <li key={book._id}>
      <Link to={`/books/${book._id}/`}>{book.title}</Link>
    </li>
  ))

  return (
    <div>
      <h4>My Books</h4>
      <div>
        <div>
          {booksJsx}
        </div>
      </div>
      <Link to={'/add-books'}>
        <button>Add Book</button>
      </Link>
    </div>
  )
}

export default Books

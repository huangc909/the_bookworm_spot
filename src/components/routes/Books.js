import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const Books = (props) => {
  const [books, setBooks] = useState([])

  const { msgAlert } = props
  useEffect(() => {
    // console.log(props)
    axios({
      method: 'GET',
      url: `${apiUrl}/books/`,
      headers: {
        'Authorization': `Token ${props.user.token}`
      }
    })
      // .then(res => {
      //   console.log(res)
      //   return res
      // })
      .then(res => setBooks(res.data))
      .then(() => msgAlert({
        heading: 'Showing all books',
        message: messages.showBooksSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setBooks({ title: '', author: '' })
        msgAlert({
          head: 'Failed to show all books ' + error.message,
          message: messages.showBooksFailure,
          variant: 'danger'
        })
      })
  }, [])
  // console.log(books)

  const booksJsx = books.map(book => (
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
      <h1>My Books</h1>
      <br/>
      <Link to={'/create-book/'}>
        <button className="button" variant="primary">Add Book</button>
      </Link>
      <div>
        <div className="list-display">
          <ol>
            {booksJsx}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Books

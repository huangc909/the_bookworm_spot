import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const ReadBooks = (props) => {
  const [books, setBooks] = useState([])

  const { msgAlert } = props
  useEffect(() => {
    console.log(props)
    axios({
      method: 'GET',
      url: `${apiUrl}/books/`,
      headers: {
        'Authorization': `Token ${props.user.token}`
      }
    })
      .then(res => {
        console.log(res)
        return res
      })
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
  console.log(books)

  const findReadBooks = books.filter(book => book.onRead === true)

  console.log(findReadBooks)

  const readBooks = findReadBooks.map(book => (
    <li key={book.id}>
      <Link to={`/books/${book.id}/`}>{book.title}</Link>
    </li>
  ))

  return (
    <div>
      <h4>My Books</h4>
      <div>
        <div>
          <ol>
            {readBooks}
          </ol>
        </div>
      </div>
      <Link to={'/create-book/'}>
        <button>Add Book</button>
      </Link>
    </div>
  )
}

export default ReadBooks

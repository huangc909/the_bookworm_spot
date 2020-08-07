import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import messages from './../AutoDismissAlert/messages'
const Book = (props) => {
  const [book, setBook] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props
  console.log(props)
  useEffect(() => {
    axios({
      url: `${apiUrl}/books/${props.match.params.bookId}/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${props.user.token}`
      }
    })
      .then(res => setBook(res.data))
      .then(() => msgAlert({
        heading: 'Showing selected book',
        message: messages.showBookSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setBook({ title: '', author: '' })
        msgAlert({
          heading: 'Failed to show book ' + error.message,
          message: messages.showBookFailure,
          variant: 'danger'
        })
      })
  }, [])
  const destroy = () => {
    axios({
      url: `${apiUrl}/books/${props.match.params.bookId}/`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Book Deleted',
        message: messages.deleteBookSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setBook({ title: '', author: '', note: '', rating: '', onWishlist: '', onRead: '' })
        msgAlert({
          heading: 'Failed to delete ' + error.message,
          message: messages.deleteBookFailure,
          variant: 'danger'
        })
      })
  }
  if (!book) {
    return <p>Loading...</p>
  }
  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/books/', state: { msg: 'Book successfully deleted!' }
      }} />
    )
  }
  return (
    <div>
      <h2>{book.title}</h2>
      <h4>{book.author}</h4>
      <p>{book.rating}</p>
      <p>{book.note}</p>
      <p>{book.onWishlist}</p>
      <p>{book.onRead}</p>
      <div>
        <button className="button btn btn-danger" onClick={destroy}>Delete Book</button>
        <Link to={`/books/${props.match.params.bookId}/edit`}>
          <button className="button btn btn-success">Edit Book</button>
        </Link>
      </div>
      <div>
        <Link to='/books/'>Back to all books</Link>
      </div>
    </div>
  )
}

export default Book

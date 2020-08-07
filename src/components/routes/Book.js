import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import messages from './../AutoDismissAlert/messages'
const Book = (props) => {
  const [book, setBook] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props
  useEffect(() => {
    axios({
      url: `${apiUrl}/books/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setBook(res.data.book))
      .then(() => msgAlert({
        heading: 'Showing selected book',
        message: messages.showBookSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setBook({ title: '', author: '', note: '', rating: '', onWishlist: '', onRead: '' })
        msgAlert({
          heading: 'Failed to show book ' + error.message,
          message: messages.showBookFailure,
          variant: 'danger'
        })
      })
  }, [])
  const destroy = () => {
    axios({
      url: `${apiUrl}/books/${props.match.params.id}`,
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
      <h4>{book.name}</h4>
      <h2>{book.author}</h2>
      <p>{book.note}</p>
      <p>{book.rating}</p>
      <p>{book.onWishlist}</p>
      <p>{book.onRead}</p>
      <div>
        <button className="button btn btn-danger" onClick={destroy}>Delete Book</button>
      </div>
    </div>
  )
}

export default Book

import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BookForm from './../shared/BookForm'
import messages from './../AutoDismissAlert/messages'

const BookCreate = props => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    rating: '',
    note: '',
    onWishlist: false,
    onRead: false
  })
  const [createdBookId, setCreatedBookId] = useState(null)
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedBook = Object.assign({}, book, updatedField)
    setBook(editedBook)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = props
    axios({
      url: `${apiUrl}/books/`,
      method: 'POST',
      headers: {
        'Authorization': `Token ${props.user.token}`
      },
      data: { book }
    })
      .then(res => setCreatedBookId(res.data.id))
      .then(() => msgAlert({
        heading: 'Create book success',
        message: messages.createBookSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setBook({ title: '', author: '' })
        msgAlert({
          heading: 'Create book failed: ' + error.message,
          message: messages.createBookFailure,
          variant: 'danger'
        })
      })
  }
  if (createdBookId) {
    return <Redirect to={`/books/${createdBookId}`} />
  }

  return (
    <div>
      <BookForm
        book={book}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/books/'
      />
    </div>
  )
}

export default BookCreate

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

  const wishList = () => {
    if (book.onWishlist === false) {
      book.onWishlist = true
    } else {
      book.onWishlist = false
    }
    return book.onWishlist
  }

  const read = () => {
    if (book.onRead === false) {
      book.onRead = true
    } else {
      book.onRead = false
    }
    return book.onRead
  }

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value, wishList, read }
    const editedBook = Object.assign({}, book, updatedField)
    setBook(editedBook)
  }
  // console.log(setBook)
  const handleSubmit = event => {
    // console.log(book)
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
  // console.log(book)
  if (createdBookId) {
    return <Redirect to={`/books/${createdBookId}/`} />
  }

  return (
    <div>
      <BookForm
        book={book}
        wishList={wishList}
        read={read}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/books/'
      />
    </div>
  )
}

export default BookCreate

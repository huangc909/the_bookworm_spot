import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import BookEditForm from '../shared/BookEditForm'
import messages from './../AutoDismissAlert/messages'

const BookEdit = (props) => {
  console.log(props)
  const [book, setBook] = useState({
    title: '',
    author: '',
    rating: '',
    note: '',
    onWishlist: false,
    onRead: false
  })
  const [updated, setUpdated] = useState(false)
  const { msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/books/${props.match.params.bookId}/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${props.user.token}`
      }
    })
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => setBook(res.data))
      .catch(console.error)
  }, [])

  console.log(book)
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
    event.persist()
    setBook(prevBook => {
      const updatedField = { [event.target.name]: event.target.value, wishList, read }
      const editedBook = Object.assign({}, prevBook, updatedField)
      return editedBook
    })
  }

  const handleSubmit = event => {
    console.log(book)
    console.log(props)
    event.preventDefault()
    axios({
      url: `${apiUrl}/books/${props.match.params.bookId}/`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${props.user.token}`
      },
      data: { book }
    })
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Edited List',
        message: messages.editBookSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setBook({ title: '', author: '' })
        msgAlert({
          heading: 'Failed to update ' + error.message,
          message: messages.editBookFailure,
          variant: 'danger'
        })
      })
  }
  if (updated) {
    return <Redirect to={`/books/${props.match.params.bookId}/`} />
  }
  console.log(book)
  return (
    <div>
      <BookEditForm
        book={book}
        wishList={wishList}
        read={read}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/books/${props.match.params.bookId}`}
      />
    </div>
  )
}
export default BookEdit

import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import BookEditForm from '../shared/BookEditForm'
import messages from './../AutoDismissAlert/messages'

const BookEdit = (props) => {
  // console.log(props)
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

  // API Request to update a book (created by its user)
  useEffect(() => {
    axios({
      url: `${apiUrl}/books/${props.match.params.bookId}/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${props.user.token}`
      }
    })
      .then(res => setBook(res.data))
      .catch(console.error)
  }, [])

  // If 'Add to Wishlist' checkbox is selected,
  // change onWishList to true if originally false,
  // or false if originally true
  const wishList = () => {
    if (book.onWishlist === false) {
      book.onWishlist = true
    } else {
      book.onWishlist = false
    }
    return book.onWishlist
  }

  // If 'Mark as Read' checkbox is selected,
  // change onRead to true if originally false,
  // or false if originally true
  const read = () => {
    if (book.onRead === false) {
      book.onRead = true
    } else {
      book.onRead = false
    }
    return book.onRead
  }

  // setting the state with user input information on edit book form
  const handleChange = event => {
    event.persist()
    setBook(prevBook => {
      const updatedField = { [event.target.name]: event.target.value, wishList, read }
      const editedBook = Object.assign({}, prevBook, updatedField)
      return editedBook
    })
  }

  // API Request to update a book (created by its user)
  const handleSubmit = event => {
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
  // If the API has successfully updated the book,
  // redirect the user to the newly created book info page
  if (updated) {
    return <Redirect to={`/books/${props.match.params.bookId}/`} />
  }

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

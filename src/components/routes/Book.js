import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import messages from './../AutoDismissAlert/messages'
const Book = (props) => {
  const [book, setBook] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { msgAlert } = props
  // console.log(props)
  useEffect(() => {
    axios({
      url: `${apiUrl}/books/${props.match.params.bookId}/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${props.user.token}`
        // 'Content-Type': 'application/json'
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
  // console.log(book)
  // console.log(setBook)

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 book-image-div">
          <div className="col-md-8 align-right">
            <img src="https://user-images.githubusercontent.com/53062479/89836158-2a23e800-db34-11ea-8fd4-983f002de819.jpg" className="book-image"/>

            <div className="checkbox-info">
              <div className="container">
                <div className="row wishlist-row">
                  <div className="wishlist">
                    <p>Added to Wishlist</p>
                  </div>
                  <div className="wishlist-box">
                    <div className="wishlist-marker">
                      {book.onWishlist ? 'X' : ''}
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row readlist-row">
                  <div className="readlist">
                    <p>Marked as Read</p>
                  </div>
                  <div className="readlist-box">
                    <div className="readlist-marker">
                      {book.onRead ? 'X' : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="col-md-6 book-detail">
          <h1>{book.title}</h1>
          <h4>by {book.author}</h4>
          <p>Rating: {book.rating}/5.0</p>
          <br />

          <p>Notes:</p>
          <p>{book.note}</p>

        </div>
      </div>
      <div className="center">
        <div>
          <Link to={`/books/${props.match.params.bookId}/edit`}
            book={book}
          >
            <button className="button btn btn-success">Edit Book</button>
          </Link>
          <button className="button btn btn-danger" onClick={destroy}>Delete Book</button>
        </div>
        <div>
          <Link to='/books/'>Back to all books</Link>
        </div>
      </div>
    </div>
  )
}

export default Book

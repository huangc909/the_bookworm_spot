import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import messages from './../AutoDismissAlert/messages'
const AllBooksDetail = (props, cancelPath) => {
  const [book, setBook] = useState(null)
  const { msgAlert } = props
  console.log(props)
  useEffect(() => {
    axios({
      url: `${apiUrl}/all-books-detail/${props.match.params.bookId}/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => setBook(res.data))
      .then(() => msgAlert({
        heading: 'Showing selected book',
        message: messages.showAllBooksDetailSuccess,
        variant: 'primary'
      }))
      .catch(error => {
        setBook({ title: '', author: '' })
        msgAlert({
          heading: 'Failed to show book ' + error.message,
          message: messages.showAllBooksDetailFailure,
          variant: 'danger'
        })
      })
  }, [])

  if (!book) {
    return <p>Loading...</p>
  }
  console.log(book)
  console.log(setBook)

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 book-image-div">
          <div className="col-md-6 align-right">
            <img src="https://user-images.githubusercontent.com/53062479/89836158-2a23e800-db34-11ea-8fd4-983f002de819.jpg" className="book-image"/>
          </div>
        </div>

        <div className="col-md-6 book-detail">
          <h2>{book.title}</h2>
          <h4>by {book.author}</h4>
          <p>Rating: {book.rating}/5.0</p>
          <br />
        </div>
        <div className="col-md-12 center">
          <Link to='/'>
            <p>Go Back</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AllBooksDetail

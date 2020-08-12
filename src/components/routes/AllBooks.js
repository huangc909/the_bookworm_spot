import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

import messages from './../AutoDismissAlert/messages'

const AllBooks = (props) => {
  const [books, setBooks] = useState([])

  const { msgAlert } = props
  console.log(props)
  useEffect(() => {
    console.log(props)
    axios({
      method: 'GET',
      url: `${apiUrl}/all-books/`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => setBooks(res.data))
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

  // const showBook = (props) => {
  //   books.map(book => {
  //     if (props.user.id === book.owner) {
  //       return '/books/'
  //     } else if (props.user.id !== book.owner || props.user === null) {
  //       return '/all-books-detail/'
  //     }
  //   })
  // }

  const booksJsx = books.reverse().map(book => (
    <li key={book.id} className="all-books">
      <div className="photo-and-title">
        <div>
          <img src="https://user-images.githubusercontent.com/53062479/89836158-2a23e800-db34-11ea-8fd4-983f002de819.jpg" className="book-image"/>
        </div>
        <div className="book-title">
          <Link to={`/all-books-detail/${book.id}/`} className="link-title">{book.title}</Link>
        </div>
      </div>
    </li>
  ))

  // const booksJsx = books.reverse().map(book => (
  //   <li key={book.id}>
  //     <img src="https://user-images.githubusercontent.com/53062479/89836158-2a23e800-db34-11ea-8fd4-983f002de819.jpg" className="book-image"/>
  //     <Link to={/books/`${book.id}/`}>{book.title}</Link>
  //   </li>
  // ))

  return (
    <div className="list-style">
      <h1>Recently Added Books</h1>
      <br/>
      <div>
        <ol>
          {booksJsx}
        </ol>
      </div>
    </div>
  )
}

export default AllBooks

import React from 'react'
import { Link } from 'react-router-dom'

const BookForm = ({ props, book, handleSubmit, handleChange, cancelPath, wishList, read }) => (

  <form onSubmit={handleSubmit}>
    <div>
      <label>Title</label>
      <input
        value={book.title}
        name="title"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Author</label>
      <input
        value={book.author}
        name="author"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Note</label>
      <input
        value={book.note}
        name="note"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>My Rating</label>
      <input
        placeholder="0-5"
        value={book.rating}
        name="rating"
        onChange={handleChange}
      />
    </div>
    <div>
      <p>Add to Wishlist</p>
      <input
        book={book}
        type="checkbox"
        value={book.onWishlist}
        name="wishlist"
        onChange={wishList}
      />
    </div>
    <div>
      <p>Mark as Read</p>
      <input
        book={book}
        type="checkbox"
        value={book.onRead}
        name="read"
        onChange={read}
      />
    </div>
    <button type="submit" className="btn btn-primary button">Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default BookForm

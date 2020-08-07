import React from 'react'
import { Link } from 'react-router-dom'

const BookForm = ({ book, handleSubmit, handleChange, cancelPath }) => (
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
        value={book.rating}
        name="rating"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Add to Wishlist</label>
      <input
        type="checkbox"
        value={book.onWishlist}
        name="onWishlist"
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Mark as Read</label>
      <input
        type="checkbox"
        value={book.onRead}
        name="onRead"
        onChange={handleChange}
      />
    </div>
    <br />
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default BookForm

import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Books from './../routes/Books'
import Book from './../routes/Book'
import BookCreate from './../routes/BookCreate'
import BookEdit from './../routes/BookEdit'
import WishList from './../routes/WishList'
import ReadBooks from './../routes/ReadBooks'

import AllBooks from './../routes/AllBooks'
import AllBooksDetail from './../routes/AllBooksDetail'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />

        <main className="container">
          <Route exact path='/all-books/' render={(props) => (
            <AllBooks {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <Route exact path='/all-books-detail/:bookId/' render={(props) => (
            <AllBooksDetail {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <Route exact path='/sign-up/' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in/' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out/' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password/' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/books/' render={(props) => (
            <Books {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/books/:bookId/' render={(props) => (
            <Book {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-book/' render={() => (
            <BookCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/books/:bookId/edit/' render={(props) => (
            <BookEdit {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/wishlist/' render={(props) => (
            <WishList {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/readbooks/' render={(props) => (
            <ReadBooks {...props} msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
      </Fragment>
    )
  }
}

export default App

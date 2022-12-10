import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginRoute} />
        <ProtectedRoute exact path="/" component={HomeRoute} />
        <ProtectedRoute exact path="/users/:id" component={UserProfile} />
        <ProtectedRoute exact path="/my-profile" component={MyProfile} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App

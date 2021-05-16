import React, { Component } from 'react';
const UserContext = React.createContext({})

export class UserProvider extends Component {
  // Context state
  state = {
    user: {},
    loggedIn: 'false'
  }

  // Method to update state
  setUser = (user) => {
    console.log(user);
    if (user.isverified) {
      this.setState( { user:user, loggedIn: 'true' })

    }
  }
  setLog = () => {
    this.setState({ user:'', loggedIn: 'false' })
  }

  render() {
    const { children } = this.props
    const { user, loggedIn } = this.state
    const { setUser, setLog } = this

    return (
      <UserContext.Provider
        value={{
          user,
          loggedIn,
          setUser,
          setLog
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext;

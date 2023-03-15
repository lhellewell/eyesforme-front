import React, {createContext } from 'react'

const AccountContext: React.Context<any> = React.createContext({
    loggedIn: false,
    setLoggedIn: () => {},
    userInfo: {},
    setUserInfo: () => {},
  })

export default AccountContext
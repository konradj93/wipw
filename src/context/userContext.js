import React from 'react';

const UserContext = React.createContext({
    isAuth: false,
    toggleAuth: () => {
    }
  })
;

export const UserContextProvider = UserContext.Provider;

export default UserContext;
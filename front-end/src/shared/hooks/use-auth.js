import { useState, useCallback, useEffect } from 'react'
// import AuthContext from '../context/auth-context';

let logoutTimer

const getUserData = () => {
  let userData = { token: null, tokenExpirationDate: null, userId: null, isAdmin: false }

  try {
    const localStorageResult = JSON.parse(localStorage.getItem('userData'))

    if (localStorageResult) {
      userData = localStorageResult
    }
  } catch (error) {
    console.log(error)
  }

  return userData
}

export const useAuth = () => {
  const [userSession, setUserSession] = useState(getUserData())
  const { token, tokenExpirationDate, userId, isAdmin } = userSession

  const login = useCallback((uid, token, expirationDate, isAdmin) => {
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setUserSession({
      token,
      userId: uid,
      tokenExpirationDate,
      isAdmin,
    })
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
        isAdmin,
      }),
    )
  }, [])

  const logout = useCallback(() => {
    setUserSession({
      token: null,
      userId: null,
      tokenExpirationDate: null,
      isAdmin: null,
    })
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration),
        storedData.isAdmin,
      )
    }
  }, [login])

  return { token, login, logout, userId, isAdmin }
}

// const AuthContextProvider = () => {
//   const { token, login, logout, userId } = useAuth();

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn: !!token,
//         token: token,
//         userId: userId,
//         login: login,
//         logout: logout,
//       }}
//     ></AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;

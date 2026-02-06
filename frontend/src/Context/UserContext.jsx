import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
export const userDataContext = createContext()
function UserContext({ children }) {
  let { serverUrl } = useContext(authDataContext)
  let [userData, setUserData] = useState(null)


  const getCurrentUser = async () => {

    try {
      let result = await axios.get(serverUrl + "/api/user/currentuser", { withCredentials: true })
      setUserData(result.data)
    } catch (error) {
      setUserData(null)
      console.log(error)

    }

  }
  useEffect(() => {
    getCurrentUser()
  }, [])

  const logout = async () => {
    try {
      await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true });
      setUserData(null);
    } catch (error) {
      console.error("Logout failed", error);
      // Even if API call fails, we should clear local state
      setUserData(null);
    }
  }

  let value = {
    userData,
    setUserData,
    getCurrentUser,
    logout
  }
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext

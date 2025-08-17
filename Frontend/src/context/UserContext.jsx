import React from 'react'
import { createContext, useState, useEffect } from 'react'

export const UserDataContext = createContext()

const UserContext = ({ children }) => {

    const [user, setUser] = useState({})

    //  useEffect(() => {
    //   (user)

    // }, [user])
    


    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext

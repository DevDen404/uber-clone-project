import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const CaptainDataContext = createContext()

const CaptainContext = ({ children }) => {

    const [captain, setCaptain] = useState({})

    return (
        <div>
            <CaptainDataContext.Provider value={{ captain, setCaptain}}>
                {children}
            </CaptainDataContext.Provider>
        </div>
    )
}

export default CaptainContext

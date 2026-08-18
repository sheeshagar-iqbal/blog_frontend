import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'

export    const Usercontext =createContext(null)
 
const Dataprovide = ({children}) => {
    const [account,setAccount]=useState({username:'',email:'',id:''})
    const [user,setUser] =useState(false)
  return (
    <>
    <Usercontext.Provider value={{account,setAccount,user,setUser}}>
     {children}
    </Usercontext.Provider>
    </>
  )
}

export default Dataprovide
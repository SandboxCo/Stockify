// MyContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';


// Step 2: Create the context
const AuthContext = createContext();

// Step 3: Create the provider component
const AuthProvider = ({ children }) => {
  // State or any other data you want to provide
  const [user, setUser] = useState({});

  const signOut = () => {
    setUser(null)
  }

  const signIn = (email, pass) => {
    let apiUrl = ""
    let user = axios.post(apiUrl, {
      auth: {
        email: email,
        password: pass
      }
     })

     if (user != null) {
        return user
     } else {
        alert("Issue creating username and password. Ensure that user is correct")
     }
  }


  const signUp = (email, pass, pass2 ) => {
    let apiUrl = ""

    if (pass === pass2){
      let newUser =axios.post(apiUrl, {
                                auth: {
                                  email: email,
                                  pass: pass
                                }
                            })
      
      if (newUser != null) {
        return newUser
      } else {
        alert("Password or email not correct. Ensure email is not already a user")
      }
    } else {
      alert("Password not equal.")
      return false
    }
  }

  const isSignedIn = () => {
    return user != null
  }

  // Step 4: Provide the context value to the children
  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      signIn,
      signUp,
      signOut,
      isSignedIn
    }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(){
  return useContext(AuthContext)
}

export {AuthProvider, useAuth}
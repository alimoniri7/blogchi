import React, { useState } from 'react';

// FireBase
import { auth } from '../../services/Firebase/auth';
import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from 'firebase/auth'

const SingUp = () => {
    const [user , setUser] = useState({})

    const provider= new GoogleAuthProvider()
    getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
  
      // The signed-in user info.
      const user = result.user;
      setUser(user)
      console.log(user);
    
    }).catch((error) => {
        console.log(error);
      // ...
    });


    return (
        <div>
            <button onClick={()=> signInWithRedirect(auth , provider)} >sign in</button>
            <img src={user.photoURL} alt="" />
        </div>
    );
};

export default SingUp;
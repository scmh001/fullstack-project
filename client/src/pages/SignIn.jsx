import React from 'react';
import LoginSignup from '@/components/LoginSignup'; 

function SignIn({updateUser}) {
  return (
    <div>
      <LoginSignup updateUser={updateUser}/>
    </div>
  );
}

export default SignIn;
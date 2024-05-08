// Importing React library to use JSX and React features
import React from 'react';
// Importing the LoginSignup component from the components directory
import LoginSignup from '@/components/LoginSignup'; 

// SignIn functional component that takes updateUser function as a prop
function SignIn({updateUser}) {
  // Render method returns JSX to be displayed in the UI
  return (
    // A div wrapper for the LoginSignup component
    <div>
      {/* LoginSignup component which handles user login or signup
          It receives updateUser as a prop to update the user state in the parent component */}
      <LoginSignup updateUser={updateUser}/>
    </div>
  );
}

// Exporting SignIn component to be used in other parts of the application
export default SignIn;
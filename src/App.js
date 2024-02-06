import React from 'react';
import SignUp from './SignUp';


function App() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
  };
  return (
    <div style={containerStyle}>
    <div>
    <SignUp/>
    </div>
  </div>
  );
}

export default App;

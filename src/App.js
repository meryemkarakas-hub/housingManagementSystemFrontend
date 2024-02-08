import React from 'react';
import Login from './Login';



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
   <Login/>
    </div>
  </div>
  );
}

export default App;

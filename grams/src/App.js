import React from 'react';
import './App.css';
import Post from './Post'

function App() {
  return (
    <div className='app'>

      <div className='app-header'>
        <img 
          className='header-image' 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt="instagram header"
          />
      </div>
      
      <h1>Welcome to Grams App</h1>

      <Post />
      {/* Posts */}
    </div>
  )
}

export default App;

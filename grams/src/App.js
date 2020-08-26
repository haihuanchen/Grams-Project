import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post'
import  {db} from './firebase'

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

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

      {posts.map(({id, post})=> (
        <Post key={id} username={post.username} caption={post.caption} imgUrl={post.imgUrl} />
      ))}
    </div>
  )
}

export default App;

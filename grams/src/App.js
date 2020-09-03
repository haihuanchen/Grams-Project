import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import  {db, auth} from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(()=> {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  useEffect(()=> {
    const unsub = auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        //user has logged in
        setUser(authUser);
      }else{
        //user has logged out
        setUser(null);
      }
    })

    return () => {
      //perform cleanup actions
      unsub();
    }

  },[user, username])

  const signUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false);
  }

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error)=>alert(error.message))
    setOpenSignIn(false);
  }

  return (
    <div className='app'>
      
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Please login to upload</h3>
      )}

      <Modal open={open} onClose={()=> setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app-signup' onSubmit={signUp}>
            <center>
              <img 
                className='header-image' 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                alt="instagram header"
              />
            </center>
            <Input 
              placeholder='username'
              type='text'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            <Input 
              placeholder='email'
              type='text'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Input 
              placeholder='password'
              type='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button type='submit'>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={()=> setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app-signup' onSubmit={signIn}>
            <center>
              <img 
                className='header-image' 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                alt="instagram header"
              />
            </center>
            <Input 
              placeholder='email'
              type='text'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Input 
              placeholder='password'
              type='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button type='submit'>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className='app-header'>
        <img 
          className='header-image' 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt="instagram header"
        />
      </div>

      {user ? (
        <Button onClick={()=>auth.signOut()}>Log Out</Button>
      ): (
        <div className='app-loginContainer'>
          <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={()=>setOpen(true)}>Sign Up</Button>
        </div>
      )}

      
      <h1>Welcome to Grams App</h1>

      {posts.map(({id, post})=> (
        <Post key={id} username={post.username} caption={post.caption} imgUrl={post.imgUrl} />
      ))}
    </div>
  )
}

export default App;

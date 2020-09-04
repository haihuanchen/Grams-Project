import React, {useState, useEffect} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';
import { db, firebase } from './firebase';

function Post({ postId, username, caption, imgUrl, currentUser }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect (()=> {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection('posts').doc(postId).collection('comments').orderBy('timestamp','asc').onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc) => doc.data()));
            })  
        }

        return () => {
            unsubscribe();
        };
    }, [postId])

    const postComment = (e) => {
        e.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: currentUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        <div className="post">
            <div className='post-header'>
                <Avatar 
                    className="post-avatar"
                    alt='user image'
                    src={imgUrl}
                />
                <h3>{username}</h3>
            </div>

            <img className='post-img' src={imgUrl} alt=""/>

            <h4 className="post-text"><strong>{username}</strong> {caption}</h4>

            <div className="post-comments">
                {comments.map((comment)=> (
                    <p>
                        <b>{comment.username}</b> {comment.text}
                    </p>
                ))}
            </div>

            {currentUser && (
            <form className="post-commentBox">
                <input
                    className="post-input"
                    type='text'
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                />
                <button className="post-button" disabled={!comment} type="submit" onClick={postComment}>Post</button>
            </form>
            )}
        </div>
    )
}

export default Post;

import React, {useState, useEffect} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';
import {db} from './firebase';

function Post({ postId, username, caption, imgUrl }) {
    const [comments, setComments] = useState([]);

    useEffect (()=> {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection('posts').doc(postId).collection('comments').onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc) => doc.data()));
            })  
        }

        return () => {
            unsubscribe();
        };
    }, [postId])
    return (
        <div className="post">
            <div className='post-header'>
                <Avatar 
                    className="post-avatar"
                    alt='Steve Roger'
                    src={imgUrl}
                />
                <h3>{username}</h3>
            </div>

            <img 
                className='post-img'
                src={imgUrl} 
                alt=""
            />

            <h4 className="post-text"><strong>{caption}</strong></h4>
        </div>
    )
}

export default Post;

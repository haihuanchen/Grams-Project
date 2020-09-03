import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';

function Post({ username, caption, imgUrl }) {
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

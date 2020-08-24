import React from 'react'
import './Post.css'

function Post() {
    return (
        <div>
            <h3>Username</h3>
            <img 
                className='post-img'
                src="https://static.vecteezy.com/system/resources/thumbnails/000/273/915/original/ocean-background.jpg" 
                alt=""
            />

            <h4 className="post-text"><strong>What</strong> an image of the ocean</h4>

            {/* header -> avatar + username */}
            {/* image */}
            {/* username + caption */}
        </div>
    )
}

export default Post;

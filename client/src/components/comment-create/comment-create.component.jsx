import React, { useState } from 'react'
import Axios from 'axios'

const CommentCreate = ({postId}) => {
    const [content, setContent] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(postId)
        await Axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        })
        setContent('')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Comment</label>
                <input type="text" value={content} onChange={e => setContent(e.target.value)}/>
            </form>
        </div>
    )
}

export default CommentCreate



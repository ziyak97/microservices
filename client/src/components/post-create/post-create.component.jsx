import React, {useState} from 'react'
import Axios from 'axios'

const PostCreate = () => {
    const [title, setTitle] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        await Axios.post('http://localhost:4000/posts', {
            title
        })

        setTitle('')
    }
    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default PostCreate
import React from 'react'

const CommentList = ({ comments }) => {
    return (
        <div>
            {
                comments.map(comment => {
                    let content
                    if(comment.status === 'approved') {
                        content = comment.content
                    }

                    if(comment.status === 'pending') {
                        content = 'This comment is pending approval.'
                    }

                    if(comment.status === 'rejected') {
                        content = 'This comment has been rejected!'
                    }
                    
                    return (
                        <div key={comment.id}>
                            {content}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CommentList

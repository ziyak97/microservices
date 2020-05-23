const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(express.json())
app.use(cors())

const commentByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentByPostId[req.params.id] || []

    comments.push({ id: commentId, content, status: 'pending' })

    commentByPostId[req.params.id] = comments

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: { id: commentId, content, postId: req.params.id, status: 'pending' }
    })

    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body

    if (type === 'CommentModerated') {
        const { id, postId, status } = data

        const comments = commentByPostId[postId]

        const comment = comments.find(comment => comment.id === id)

        comment.status = status

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                ...data
            }
        })
    }
    res.send({})
})

app.listen(4001, console.log('Listening on port 4001.'))
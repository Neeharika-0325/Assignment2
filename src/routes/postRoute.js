const express = require('express');
const postsRouter =  express.Router();

const post = require('../model/post');

const authMiddleware =  require('../middleware/auth');

postsRouter.get('/posts',(req,res)=>{
    post.find().then(posts => {
        res.status(200).send({
            status : 'success',
            posts : posts
        })
    }).catch(err=>{
        // console.log(err)
        res.status(400).send({
            status : 'failed',
            message : 'unable to fetch posts'
        })
    })
})

postsRouter.post('/posts', authMiddleware, (req,res)=>{
    const userPost = req.body;
    const newPost = new post({
        title: userPost.title,
        body : userPost.body,
        image : userPost.image,
        user: req.userId
    })
    newPost.save().then(post =>{
        res.status(200).send({
            status: 'success',
            message: 'post uploaded successfully',
            post : post
        })
    }).catch(err=>{
        res.status(400).send({
            status: 'failed',
            message: 'failed to post',
            error: err
        }) 
    })
})

postsRouter.put('/posts/:id', authMiddleware, (req,res)=>{
    const postId = req.params.id;
    const updatedData = req.body;
    post.findOneAndUpdate({_id: postId, user: req.userId},updatedData,{new:true}).then(postUpdate=>{
        if(!postUpdate){
            return res.status(400).send({
                status : 'failed',
                message: 'post not found'
            })
        }

        res.status(200).send({
            status: 'success',
            message: 'post updated successfully',
            post: postUpdate
        })
    }).catch(err=>{
        res.status(400).send({
            status: 'failed',
            message: 'failed to update post'
        })
    })

})

postsRouter.delete('posts/:id', authMiddleware, (req,res)=>{
    const postId = req.params.id;
    post.deleteOne({_id: postId, user: req.userId}).then(post => {
        res.status(200).send({
            status: 'success',
            message: "post deleted successfully",
            post: post
        });
    }).catch(err => {
        res.status(500).json({
            message: "Failed to delete post",
            data: err
        });
    });
})

module.exports = postsRouter
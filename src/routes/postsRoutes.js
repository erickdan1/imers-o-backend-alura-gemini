import express from 'express';
import multer from 'multer';
import { listPosts, postNewPost, uploadImage } from '../controllers/postsController.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: './uploads' , storage})

const routes = (app) => {
    app.use(express.json());

    // route to fetch all posts
    app.get('/posts', listPosts);
    // route to create a new post
    app.post('/posts', postNewPost)
    // route to upload a new image (assuming a single image called "image")
    app.post('/upload', upload.single('image'), uploadImage)
};

export default routes;

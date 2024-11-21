import express from 'express';
import { listPosts } from '../controllers/postsController.js';

const routes = (app) => {
    app.use(express.json());

    // route to fetch all posts
    app.get('/posts', listPosts);
};

export default routes;

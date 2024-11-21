import { getAllPosts } from "../models/postsModel.js";

export async function listPosts(req, res) {
    // call the function to fetch the posts
    const posts = await getAllPosts();
    res.status(200).json(posts);
} 

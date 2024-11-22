import fs from 'fs';
import { getAllPosts, createPost, updatePost } from '../models/postsModel.js';
import generateDescriptionWithGemini from '../services/geminiService.js'

// function to list all posts
export async function listPosts(req, res) {
  // fetch all posts from the database
  const posts = await getAllPosts();

  // send the posts as a JSON response with a 200 OK status code
  res.status(200).json(posts);
}

// function to create a new post
export async function postNewPost(req, res) {
  // extract the new post data from the request body
  const newPost = req.body;

  try {
    // create the new post in the database
    const postCreated = await createPost(newPost);

    // send the created post as a JSON response with a 201 Created status code
    res.status(201).json(postCreated);
  } catch (error) {
    // log the error to the console for debugging
    console.error(error.message);

    // send an error response with a 500 Internal Server Error status code
    res.status(500).json({ "Error": "Request failed" });
  }
}

// function to upload an image and create a new post
export async function uploadImage(req, res) {
  // create a new post object with the image URL
  const newPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  try {
    // create the new post in the database
    const postCreated = await createPost(newPost);

    // rename the uploaded file to match the post ID
    const updatedImage = `uploads/${postCreated.insertedId}.png`;
    fs.renameSync(req.file.path, updatedImage);

    // send the created post as a JSON response with a 201 Created status code
    res.status(201).json(postCreated);
  } catch (error) {
    // log the error to the console for debugging
    console.error(error.message);

    // send an error response with a 500 Internal Server Error status code
    res.status(500).json({ "Error": "Request failed" });
  }
}

// function to create a new post
export async function updateNewPost(req, res) {
  // extract the new post data from the request body
  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`
  
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await generateDescriptionWithGemini(imgBuffer)
    
    const post = {
      imgUrl: urlImage,
      descricao: descricao,
      alt: req.body.alt
    }

    // create the new post in the database
    const postUpdated = await updatePost(id, post);
    // send the updated post as a JSON response with a 201 Created status code
    res.status(201).json(postUpdated);
  } catch (error) {
    // log the error to the console for debugging
    console.error(error.message);

    // send an error response with a 500 Internal Server Error status code
    res.status(500).json({ "Error": "Request failed" });
  }
}

import 'dotenv/config';
import { ObjectId } from "mongodb";
import connectToDatabase from "../config/db.js";

// connect to database using connection string
const connection = await connectToDatabase(process.env.STRING_CONNECTION);

// async function to fetch all posts from database
export async function getAllPosts() {
    // select database 'imersao-instabyte'
    const db = connection.db('imersao-instabyte');
    // select collection 'posts' from database
    const collections = db.collection('posts')
    return collections.find().toArray()
};

// async function to create a new post on database
export async function createPost(newPost) {
    // select database 'imersao-instabyte'
    const db = connection.db('imersao-instabyte');
    // select collection 'posts' from database
    const collections = db.collection('posts');
    return collections.insertOne(newPost);
}

// async function to update a post on database
export async function updatePost(id, post) {
    // select database 'imersao-instabyte'
    const db = connection.db('imersao-instabyte');
    // select collection 'posts' from database
    const collections = db.collection('posts');
    const objId = ObjectId.createFromHexString(id)
    return collections.updateOne({_id: new ObjectId(objId)}, {$set:post});
}

import connectToDatabase from "../config/db.js"

// connect to database using connection string
const connection = await connectToDatabase(process.env.STRING_CONNECTION)

// async function to fetch all posts from database
export async function getAllPosts() {
    // select database 'imersao-instabyte'
    const db = connection.db('imersao-instabyte')
    // select collection 'posts' from database
    const collections = db.collection('posts')
    return collections.find().toArray()
};

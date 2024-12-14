const express = require("express");
const mongoose = require("mongoose");
const Blog = require('./model/blogmodel');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is your home page");
});

app.get('/blog', (req, res) => {
    res.send("This is your blog page");
});

app.post("/blogpost", async (req, res) => {
    try {
        console.log(req.body); // Log the incoming request body
        const newBlog = new Blog(req.body); // Create a new blog post
        await newBlog.save(); // Save to MongoDB
        res.status(201).send({ message: "Blog created successfully", data: newBlog });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.get("/blogposts", async (req, res) => {
    try {
        const blogs = await Blog.find(); // Replace "Blog" with your model name if different
        res.status(200).send({ message: "Blogs fetched successfully", data: blogs });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.get("/blogposts/:id", async (req, res) => {
    try {
        // const id=req.params.id;
        const{id}=req.params;
        const blogs = await Blog.findById(id); // Replace "Blog" with your model name if different
        res.status(200).send({ message: "Blogs fetched successfully", data: blogs });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
app.put("/blogposts/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find and update the blog post by ID
        const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

        // Check if the blog post exists
        if (!blog) {
            return res.status(404).json({ message: `Blogpost with ID ${id} not found` });
        }

        res.status(200).send({ message: "Blog updated successfully", data: blog });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.delete("/blogposts/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find and update the blog post by ID
        const blog = await Blog.findByIdAndDelete(id);

        // Check if the blog post exists
        if (!blog) {
            return res.status(404).json({ message: `Blogpost with ID ${id} not found` });
        }

        res.status(200).send({ message: "Blog deleted successfully", data: blog });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});




// Fallback for undefined routes
app.use((req, res) => {
    res.status(404).send(`Cannot ${req.method} ${req.url}`);
});

mongoose.connect("mongodb+srv://utkarsh2005189:uAjTMMMOfSpvkrpe@express.vu3zr.mongodb.net/blogpost")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(error => {
        console.log(error);
    });

app.listen(5000, () => {
    console.log("Server started at port 50000");
});

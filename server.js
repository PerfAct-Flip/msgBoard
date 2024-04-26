const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// MongoDB connection string
const mongoURI = 'mongodb+srv://PerfActFlip:PerfActFlip208@cluster0.lvyznks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const UserInput = mongoose.model('UserInput', userInputSchema);

// Middleware setup
app.use(bodyParser.json());  // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded data
app.use(cors());  // Enable CORS to allow cross-origin requests

// Asynchronous POST route for form submission
app.post('/submit', async (req, res) => {
    try {
        const text = req.body.text;  // Extract the text from the request body

        // Save to MongoDB with async/await
        const userInput = new UserInput({ text });
        await userInput.save();  // Await the save operation

        // Return a success response
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        // Handle errors with a 500 status code and error message
        res.status(500).json({ error: 'Error saving data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

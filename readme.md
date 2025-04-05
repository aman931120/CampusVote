// VOTING SYSTEM

⭐ Step 1 : We created a two folders 
    -> frontend
    -> backend

⭐ Step 2: 
    -> We initialize Node.js in the Backend Folder using "npm init -y"
    -> Install Required Backend Packages [npm install _______]
        > express (Web framework for handling backend routes and APIs.)
        > mongoose (ODM (Object Data Modeling) library to interact with MongoDB.)
        > dotenv (Loads environment variables from a .env file for configuration.)
        > cors (Enables Cross-Origin Resource Sharing to allow frontend-backend communication.)
        > bcryptjs (Hashes passwords securely for authentication.)
        > jsonwebtoken ( Generates and verifies JWT tokens for user authentication.)

    -> We are also installing nodemon (for auto-restart during development):
        "npm install --save-dev nodemon"
    -> Now we are going to create a Basic Server Setup
        > inside backend we are creating a server.js
        > Set Up Environment Variables .env

    -> Till now i have created a mongoDb database user and connected it to my server 

⭐ Step 3 : Set Up the Database (MongoDB + Mongoose Models) 
    -> We created a models folder in backend folder and inside that model folder we are going to create two models one is user.js and second one is candidate.js

⭐ Step 4 : Create Backend Routes
    -> first we create Authentication Routes for authentication
    -> second we create  Candidate Routes for candidate
    -> third we create Vote Route for vote 
    -> Link Routes in server.js 

    <FRONTEND SETUP>

⭐ Step 5: Set Up Frontend (React)
    


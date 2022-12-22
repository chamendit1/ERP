### []()
# Enterprise Resource Planning Software
Built with the MERN stack (MongoDB, Express, React and NodeJS).

## Introduction
A full stack invoicing application made using the MERN stack (MongoDB, Express, React & Nodejs), specially designed for small to medium businesses. 

## Key Features
- 
- Multiple user registration.
- Authentication using jsonwebtoken (jwt) and Google auth


## Technologies used
This project was created using the following technologies.

#### Frontend

- React JS
- Redux (for managing and centralizing application state)
- React-router-dom (To handle routing)
- Axios (for making api calls)
- Material UI & CSS Module (for User Interface)
- React simple Snackbar (To display success/error notifications)
- Cloudinary (to allows users to upload their business logo)
- Apex Charts (to display payment history)
- React-google-login (To enable authentication using Google)
- Material Ui

#### Server

- Express
- Mongoose
- JWT (For authentication)
- bcryptjs (for data encryption)
- Nodemailer (for sending invoice via email)
- html-pdf (for generating invoice PDFs)

#### Database
MongoDB (MongoDB Atlas)

## Configuration and Setup
/ Ignore Client Folder /

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine. 
- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal
- cd frontend and create a .env file in the root of your client directory.
- Supply the following credentials

```
$ cd frontend
$ npm install (to install frontend dependencies)
$ npm start (to start the frontend)
```
In the second terminal
- cd server and create a .env file in the root of your server directory.
- Supply the following credentials

```
DB_URL = 
PORT = 5000
SECRET = 
```

```
$ cd server
$ npm install (to install server-side dependencies)
& npm start (to start the server)
```

## Troubleshooting

## Comment

## Author

## License


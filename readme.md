# MERN Stack Application Documentation

This repository contains a MERN (MongoDB, Express, React, Node.js) stack application.
also it's deployed on AWS (Amazon Web Services) using Docker-Compose. using nginx as webserver and ansible for automation.

## Technologies and Tools Used

The MERN stack application utilizes the following technologies and tools:

- MongoDB
- Express
- React (with Material UI)
- Node.js
- Docker
- Ansible
- NGINX
- AWS (Amazon Web Services)


# Run it locally

## Prerequisites

Before setting up the MERN stack application, ensure you have the following prerequisites installed:

- Node.js v16.17.1
- MongoDB
- Docker

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Waer1/short-link-generator
   cd short-link-generator
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd frontend
   npm install --legacy-peer-deps
   ```

## Configuration

1. Backend Configuration:

   - Create a `config.env` file in the `backend` directory.
   - Add the required environment variables to the `.env` file.

## Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend server:

   ```bash
   cd frontend
   npm start
   ```

3. Access the application in your browser at [http://localhost:3000](http://localhost:3000).


# Run it using Docker

## Prerequisites

Before running the application in Docker, make sure you have Docker installed on your machine. If Docker is not installed, you can follow the official Docker documentation for instructions on how to install it: [Docker Installation Guide](https://docs.docker.com/get-docker/).

1- Config Environment Variables
- Create a `.env` file in the `devops\Docker-Compose\envfiles\backend.env` directory.
- Add the following environment variables to the `.env` file:

     ```
     NODE_ENV=production
     PORT=5000
     DATABASE_USER=<--DATABASE_USER-->
     DATABASE_PASSWORD=<--DATABASE_PASSWORD-->
     DATABASE_HOST=<--DATABASE_HOST-->
     DATABASE_URL=mongodb+srv://<USER>:<PASSWORD>@<HOST>/dpName?retryWrites=true
     BASIC_AUTH_USERNAME=waer
     BASIC_AUTH_PASSWORD=waer
     ```

   Replace `<USER>`, `<PASSWORD>`, and `<HOST>` in the `DATABASE_URL` variable with your MongoDB Atlas database credentials.

## Running the Application in Docker

To run the MERN stack application using Docker, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Waer1/short-link-generator
   cd short-link-generator
   ```

2. Build the Docker images and start the containers:

   ```bash
   cd .\devops\Docker-Compose\
   docker-compose up -d
   ```

3. Access the application in your browser at [http://localhost](http://localhost).



## Deployment

The MERN stack application is deployed to AWS (Amazon Web Services). To access the deployed application, visit [appgain.read-it.live](http://appgain.read-it.live) or [appgain.read-it.live](http://34.230.190.217/) in your web browser.

To deploy the MERN stack application using Docker, follow these steps:

1. Install Docker on the deployment server.

2. Build the Docker images:

   ```bash
   docker-compose build
   ```

3. Start the Docker containers:

   ```bash
   docker-compose up -d
   ```

4. Access the deployed application using the server's IP address or domain.

**Note:** The deployed website requires Basic Authentication. Please use the following credentials to access it:
- Username: waer
- Password: waer

If you encounter any issues during installation or running the application, refer to the application's documentation or contact me through elwaeryousef@gmail.com.


## Screenshots

Here are some screenshots of the MERN stack application:

## Screenshots

Below are several screenshots showcasing different features of the MERN stack application:

![Screenshot 1](./documentation/screenshots/8.png)
*The basic layout of the website mainly consists of a list displaying existing links. Additionally, there is a "Generate Random Values" button for quickly creating new data.*

![Screenshot 2](./documentation/screenshots/7.png)
*At the bottom left, a snackbar appears to indicate the addition of a new link.*

![Screenshot 3](./documentation/screenshots/6.png)
*After clicking the edit button, all input fields become editable, except for the slug field.*

![Screenshot 4](./documentation/screenshots/5.png)
*You can make edits to the fields and then save the updated link.*

![Screenshot 5](./documentation/screenshots/4.png)
*Once you click the save button, a snackbar appears to confirm the successful update of the data. The edit fields return to their original state.*

![Screenshot 6](./documentation/screenshots/3.png)
*There is also a delete button that allows you to remove a link.*

![Screenshot 7](./documentation/screenshots/2.png)
*In this example, the first link has been successfully deleted, and a snackbar confirms the successful deletion.*

![Screenshot 8](./documentation/screenshots/1.png)
*Here's an example of validation: all fields except the slug field cannot be left empty. If the slug field is left empty, it will automatically generate a random value.*


## Troubleshooting

- If you encounter any issues during installation or running the application, refer to the application's documentation or contact me throught elwaeryousef@gmail.com




# MERN Stack Application

This is a basic MERN (MongoDB, Express, React, Node.js) stack application that demonstrates the implementation of a shortlink generator.

## Features

- Create shortlinks with custom slugs or generate random alphanumeric slugs
- Store and retrieve shortlinks from a MongoDB database
- Support for iOS, Android, and web targets for each shortlink

## Installation

1. Clone the repository:

   ```shell
   git clone <repository-url>
    ```

2. Install the dependencies:
    ```shell
    cd mern-stack-application
    npm install
    ```

3. Set up environment variables:

    Create a .env file in the root directory of the project.

    Define the following environment variables in the .env file:
    ```
    PORT=<port-number>
    DATABASE_URL=<database-url>
    DATABASE_USER=<database-username>
    DATABASE_PASSWORD=<database-password>
    DATABASE_HOST=<database-host>
    BASIC_AUTH_USERNAME=<basic-auth-username>
    BASIC_AUTH_PASSWORD=<basic-auth-password>
    ```

## Usage

1. Start the server:
    ```shell
    npm start
    ```
2. Open the application in your web browser:
    ```arduino
    http://localhost:<port-number>
    ```
##API Endpoints

The following API endpoints are available:

-   GET /api/v1/shortlinks: Retrieve all shortlinks
-   POST /api/v1/shortlinks: Create a new shortlink
-    PATCH /api/v1/shortlinks/:slug: Update a specific shortlink
-    PUT /api/v1/shortlinks/:slug: Replace a specific shortlink
-    DELETE /api/v1/shortlinks/:slug: Delete a specific shortlink

##  Technologies Used

-    Frontend: React.js
-    Backend: Node.js, Express.js
-    Database: MongoDB
-    Middleware: Morgan, Helmet, express-mongo-sanitize, xss-clean, cors
-    Other: Basic authentication, Error handling middleware


appgain.read-it.live
# Fastify Socket Server

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [WebSocket Communication](#websocket-communication)
- [Testing](#testing)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is a Fastify application that implements CRUD operations for a User entity and integrates a WebSocket server to enable bidirectional communication between the client and server. The application includes Swagger documentation for the Fastify endpoints and a Postman collection for testing the WebSocket server.

## Project Structure

- ├── src           
- │ ├── controllers
- │ │ └── userController.js
- │ ├── db
- │ │ └── db.js
- │ ├── routes
- │ │ └── user.route.js
- │ ├── controllers
- │ │ └── user.controller.js
- │ ├── services
- │ │ └── user.service.js
- │ └── app.js
- │── socket-server
- |  └─── socketServer.js
- │── prisma
- ├───├── migrations
- |   └── schema.prisma
- ├── .gitignore
- ├── package.json
- ├── package-lock.json
- ├── docker-compose.yml
- └── README.md
`


## Installation

1. Clone the repository:
    
    git clone https://github.com/MohamedAEmara/fastify-socket-server.git
    cd fastify-socket-server
    

2. Install the dependencies:
    
    npm install

3. Add .env file and add your enviroment variables

```
    HOST=localhost
    PORT=3000
    PASSWORD_SALT="$fdb$10$wH8qdfswE5R3C.6v5fdsZ/ZmM"
    JWT_SECRET="secretvalue123"
    DATABASE_URL="postgresql://postgres:1234@localhost:5432/fastifysocket"
    
    ## NOTE: this data base will connect to DB docker container defined in docker-compse.
```

3. Run the server: **this will run DB container and connect fastify server to it.**  

    npm run start:dev       

## Running the Application

1. Start the Fastify server: **this will run DB container and connect fastify server to it. Also will run the socker server**  

    npm run start:dev 
    
    

2. The server will be running at http://localhost:3000.

## API Documentation

Swagger documentation is available for the Fastify endpoints. Once the server is running, you can access the Swagger UI at:

http://localhost:3000/documentation


### User Endpoints

- **GET /users:** Retrieve all users
- **GET /users/:id:** Retrieve a user by ID
- **POST /users:** Create a new user
- **PUT /users/:id:** Update a user by ID
- **DELETE /users/:id:** Delete a user by ID

## WebSocket Communication

The WebSocket server is implemented using the ws library. It enables bidirectional communication between the client and server.

### How to Test WebSocket

1. Open Postman.
2. Create a new WebSocket request to ws://localhost:3000.
3. Send a message to the server.
4. The server will log the received message and send a response back to the client.

For more detailed testing, you can use the provided Postman collection.

## Testing

To test the WebSocket server using Postman:

1. Import the Postman collection from test/socketTest.json.
2. Establish a WebSocket connection to ws://localhost:3000.
3. Send test messages and verify the responses.

## Dependencies

- [Fastify](https://www.npmjs.com/package/fastify) - Fast and low overhead web framework for Node.js
- [ws](https://www.npmjs.com/package/ws) - Simple to use, blazing fast and thoroughly tested WebSocket client and server for Node.js
- [fastify-swagger](https://www.npmjs.com/package/fastify-swagger) - Fastify plugin to serve Swagger UI and JSON
- [bcrypt](https://www.npmjs.com/package/bcrypt) - For hashing user passwords
- [@prisma/client](https://www.npmjs.com/package/@prisma/client) - ORM For easier dealing with postgres

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.


## Contact

For any inquiries or support, please contact [Mohamed Emara](mailto:mohamedemara.dev@gmail.com).
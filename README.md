# Horoscope API

A RESTful API for generating horoscopes based on user's star sign.

## Setup

### MongoDB

1. Install MongoDB on your machine. refer: https://www.mongodb.com/try/download/community
2. Create a new database and add a new collection.
3. Add the following environment variables to your `.env` file:
	* `MONGODB_CONNECTION_URL`: the connection string for your MongoDB instance, note that this should include the database you plan to connect the application to.
4. Run `npm run setup` to create the necessary collections.

### Redis

1. Install Redis on your machine. refer: https://redis.io/downloads/
2. Add the following environment variables to your `.env` file:
	* `REDIS_CONNECTION_URL`: the connection string for your Redis instance.
3. Run `npm run setup` to create the necessary keys.

A sample `.env` file is provided in the root directory.

### Other dependencies

1. Install the required dependencies using `npm install`.

## Running the API

1. Run `npm run start` to start the API.
2. Open `http://localhost:3000` in your browser to access the API.

## API Endpoints

Detailed API spec is available under the `/docs` endpoint.
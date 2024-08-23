# Oxinus Assignment
This project is a simple Node.js API that includes CRUD operations for user accounts, authentication via email/password and Google OAuth2, and SQLite integration. The API is built using Express, Passport.js for authentication, and validated with Joi.

## Features
- CRUD Operations:
  - Create, Read, Update, and Delete accounts.- Authentication:
  - Local Strategy: Login using email and password.  - Google OAuth2: Login using a Google account.
- Session Management:  - Protected routes using express-session and custom middleware.
- Data Validation:  - Joi is used for validating input data.

## Endpoints
### Account Routes
1. GET /accounts: Retrieve all accounts.
2. GET /accounts/:id: Retrieve a specific account by ID.
3. POST /accounts: Create a new account.
4. PUT /accounts/:id: Update an existing account by ID.
5. DELETE /accounts/:id: Delete an account by ID.

### Authentication Routes
1. POST /login: Authenticate user using email and password.
2. GET /auth/google: Redirect to Google OAuth for authentication.
3. GET /auth/google/callback: Handle Google OAuth callback.

## Middleware
- ensureAuthenticated: Middleware function used to protect the account routes. It ensures that only authenticated users can access the account-related endpoints.

## Installation
1. Clone the repository:
    -- cd oxinus-assignment   
2. Install dependencies:
    -- npm install
3. Environment Variables:   Create a .env file in the root directory and add the following environment variables:
   GOOGLE_CLIENT_SECRET=your-google-client-secret   SESSION_SECRET=your-session-secret
   
4. Run the application:
   -- node server.js   

## Usage
- Accessing the API:
  - Local Strategy Login: Send a POST request to /login with email and password.  - Google OAuth2: Visit /auth/google to log in using a Google account.
- Protected Routes:
  - The account routes (`/accounts`) are protected and require the user to be authenticated. If not authenticated, access to these routes will be denied.

## Dependencies
- bcryptjs: For hashing passwords.- express: Web framework for Node.js.
- express-session: For managing user sessions.- joi: For data validation.
- nodemon: For automatically restarting the server during development.
- passport: For handling authentication.
- passport-local: For email and password authentication.
- passport-google-oauth20: For Google OAuth2 authentication.
- passport-oauth2: For handling OAuth2 strategy.- sqlite3: For SQLite database integration.

## License
This project is licensed under the ISC License.
---
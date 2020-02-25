## Fitpad (API)
---
Link: https://fitpad.now.sh/
## Demo Credentials
Email: guest@guest.com
Password: Password1!
## Summary
This is the backend server utilized to run Fitpad. The data and tables were built to be used with postgreSQL. Checkout the 'Available Scripts' section to get started!

## Technology Used
Node, postgreSQl, Express, Mocha, Chai, and Supertest

## Available Scripts
Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## API Documnetation

Base URL: https://localhost8000/api

HTTP Method | Path | Purpose
GET | /users/home | gets and displays user logged data
POST | /auth/login | posts login credentials
GET | /fitpadData | gets all logged exercises for that user
POST | /auth/register | posts new user info and hashes password
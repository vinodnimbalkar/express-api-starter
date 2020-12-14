# Express-API-Starter

> Initially I was using [express-generator](https://expressjs.com/en/starter/generator.html) (still using), but ended-up doing again and again same 'user JWT authentication with refresh token and  suscription plan' so i decided to create git repository.

## Features

* **Stateless** authentication with **JWT** allowing for easy horizontal scaling (expiriIn: 2 Minute)
* **ESLint** Maintain your code quality with ease (Airbnb JavaScript Style).
* **MongoDB** database
* **RefreshToken** It can be used to acquire new access Tokens. (expireIn: 7 days)
* **Subscription** New user initially as 'Trial' and after 7 days as 'Free'.
* **Email** sendgrid to send welcome and cancellation email.
* **Device Limit** Only two device login limit.

## Dependencies

* express (server)
* body-parser (reading body data)
* validator (input validation)
* helmet (Helmet helps you secure your Express apps by setting various HTTP headers.)
* cors (enable CORS)
* mongoose (Mongoose is a MongoDB object modeling tool)
* morgan (HTTP request logger middleware for node.js)
* express-rate-limit (ratelimiting endpoints)
* bcryptjs (password Encryption)
* jsonwebtoken (jwt creation & signing)
* compression (compress response bodies)
* dotenv (It loads environment variables from a .env file into process.env)
* multer (handling multipart/form-data)
* sharp (convert large images in common formats to smaller)
* debug (A tiny JavaScript debugging utility)
* sendgrid (just want to send email)

## Dev Dependencies

* nodemon (hot-reload)
* eslint (ESLint is a linter for the JavaScript programming language.)
* eslint-config-airbnb-base (Airbnb JavaScript Style)
* jest (Jest is a delightful JavaScript Testing Framework with a focus on simplicity.)
* supertest (HTTP assertions made easy via superagent.)

## Installation

1. Clone the project `git clone https://github.com/vinodnimbalkar/express-api-starter.git`.
2. Install dependencies `npm install`
3. Create a `.env` file in the root like the `.env.example` file.
4. For dev you need to have mongodb db locally.
5. `npm run dev`

## TODO
* signup email verification by sending OTP

## Contributing

Feel free to open an issue (or even better, send a Pull Request). Contributions are very welcome!! 😄

## License

**MIT &copy; [Vinod Nimbalkar](https://github.com/vinodnimbalkar/express-api-starter/blob/master/LICENSE)**

# Express-API-Starter

> Initially I was using [express-generator](https://expressjs.com/en/starter/generator.html) (still using), but ended-up doing same thing again and again 'user JWT authentication with refresh token and suscription plan' so i decided to create git repository.

## Features

- **Stateless** authentication with **JWT** allowing for easy horizontal scaling (expiriIn: 2 Minute)
- **ESLint** Maintain your code quality with ease (Airbnb JavaScript Style).
- **MongoDB** database
- **RefreshToken** It can be used to acquire new access Tokens. (expireIn: 7 days)
- **Subscription** New user initially as 'Trial' and after 7 days as 'Free'.
- **Email** sendgrid to send welcome and cancellation email.
- **Device Limit** Only two device login limit.

## Dependencies

- [express](https://www.npmjs.com/package/express) (server)
- [body-parser](https://www.npmjs.com/package/body-parser) (reading body data)
- [validator](https://www.npmjs.com/package/validator) (input validation)
- [helmet](https://www.npmjs.com/package/helmet) (Helmet helps you secure your Express apps by setting various HTTP headers.)
- [cors](https://www.npmjs.com/package/cors) (enable CORS)
- [mongoose](https://www.npmjs.com/package/mongoose) (Mongoose is a MongoDB object modeling tool)
- [morgan](https://www.npmjs.com/package/morgan) (HTTP request logger middleware for node.js)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) (ratelimiting endpoints)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) (password Encryption)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (jwt creation & signing)
- [compression](https://www.npmjs.com/package/compression) (compress response bodies)
- [dotenv](https://www.npmjs.com/package/dotenv) (It loads environment variables from a .env file into process.env)
- [multer](https://www.npmjs.com/package/multer) (handling multipart/form-data)
- [sharp](https://www.npmjs.com/package/sharp) (convert large images in common formats to smaller)
- [debug](https://www.npmjs.com/package/debug) (A tiny JavaScript debugging utility)
- [sendgrid](https://www.npmjs.com/package/@sendgrid/mail) (just want to send email)

## Dev Dependencies

- [nodemon](https://www.npmjs.com/package/nodemon) (hot-reload)
- [eslint](https://www.npmjs.com/package/eslint) (ESLint is a linter for the JavaScript programming language.)
- [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) (Airbnb JavaScript Style)
- [jest](https://www.npmjs.com/package/jest) (Jest is a delightful JavaScript Testing Framework with a focus on simplicity.)
- [supertest](https://www.npmjs.com/package/supertest) (HTTP assertions made easy via superagent.)

## Installation

1. Clone the project `git clone https://github.com/vinodnimbalkar/express-api-starter.git`.
2. `cd express-api-starter`
3. Make it your own `rm -rf .git && git init && npm init`
4. Install dependencies `npm install`
5. Create a `.env` file in the root like the `.env.example` file.
6. For dev you need to have mongodb db locally.
7. For dev - `npm run dev`
8. For lint - `npm run lint`
9. For test - `npm run test`

## Stucture

```bash
├── app.js
├── bin
│   └── www
├── .env
├── .eslintrc.js
├── .gitignore
├── jest.config.js
├── LICENSE
├── nodemon.json
├── package.json
├── package-lock.json
├── public
│   ├── images
│   ├── index.html
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── README.md
├── src
│   ├── controllers
│   │   └── user.js
│   ├── db
│   │   └── mongoose.js
│   ├── email
│   │   └── account.js
│   ├── middleware
│   │   └── auth.js
│   ├── models
│   │   └── user.js
│   └── routes
│       ├── index.js
│       └── users.js
└── tests
    └── user.test.js

13 directories, 21 files
```

## TODO

- signup email verification by sending OTP
- Add docker support

## Contributing

Feel free to open an issue (or even better, send a Pull Request). Contributions are very welcome!! 😄

## License

**MIT &copy; [Vinod Nimbalkar](https://github.com/vinodnimbalkar/express-api-starter/blob/master/LICENSE)**

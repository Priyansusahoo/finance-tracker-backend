## [LIVE](https://finance-tracker-backend-beta.vercel.app/)

### 1. Project SETUP (Local)

- create `.env` file in project root

  ```properties
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/finance-tracker
  JWT_SECRET=<SECRET>
  ```

- you can generate a JWT Secret from `here` -> [JWT SECRET GENERATOR](https://jwtsecret.com/)
- and paste the `secret` in `.env` file to `JWT_SECRET=`

- Node `(required)`
- In Terminal
  - `cd finance-tracker-backend`
  - `npm install`
  - `npm run dev`

### 2. IMPORT this Collection in Postman:

[POSTMAN COLLECTION](https://github.com/Priyansusahoo/finance-tracker-backend/blob/master/FinTrackerApp.postman_collection.json)

#### POSTMAN ENV Variable
[Local](https://github.com/Priyansusahoo/finance-tracker-backend/blob/master/Local.postman_environment.json)

[PRODUCTION](https://github.com/Priyansusahoo/finance-tracker-backend/blob/master/production.postman_environment.json)

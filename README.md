# heroku-demo
---
A basic guide to setting up a [project](https://learn.foundersandcoders.com/course/syllabus/apprenticeship/authentication/project/) hosted on Heroku with a PostgreSQL database using [Giovanna Aveiro's](https://dev.to/glrta/deploy-postgresql-in-node-js-to-heroku-for-beginners-1ck0) and [OliverJam's](https://github.com/oliverjam/express-postgres-example#local-db-setup) tutorial for [Founders & Coders Bootcamp](https://github.com/foundersandcoders), [FAC22 cohort](https://github.com/fac22) during [Authentication week](https://learn.foundersandcoders.com/course/syllabus/apprenticeship/authentication/schedule/).

<p align="center">
   <img src="https://media3.giphy.com/media/l0Iy88cWKqBeBN92o/giphy.gif?cid=ecf05e47r29w57q0jy68u1bz7n5o5javfbt0ipccg4qjoedy&rid=giphy.gif&ct=g" alt="animated"/>
</p>

## Table of contents
- [Setup project](#setup-project)
- [Setup local postgres database](#setup-local-postgres-database)
- [Setup Heroku CLI](#setup-heroku-cli)
- [Deploy your project on Heroku](#deploy-your-project-on-heroku)
   - [Create app](#create-app)
   - [Connect to github](#connect-to-github)
   - [Heroku Git using Heroku CLI](#heroku-git-using-heroku-cli)
- [Deploy your PostgreSQL database on Heroku](#deploy-your-postgresql-database-on-heroku)
   - [Add Postgres database](#add-postgres-database)
   - [Connect to the database](#connect-to-the-database)
   - [View Postgres database](#view-postgres-database)
- [Setup Team on Heroku](#setup-team-on-heroku)
   - [Delete collaborator](#delete-collaborator)
- [Debugging in Heroku](#debugging-in-heroku)
   - [In the terminal](#in-the-terminal)
   - [In Heroku](#in-heroku)
- [Delete App](#delete-app)
- [Resources](#resources)

<p align="center">
   <img src="https://media.giphy.com/media/xT0xeiXommNrbX6HF6/giphy.gif"/>
</p>

## Setup project 
[(Back to top)](#table-of-contents) 
- Initialise git hub repo, with README & gitignore file (using node template)
- Clone repo and open in VSCode
- Install package.json, dependencies and devDependencies (express, pg, dotenv, bcryptjs, cookie-parser, nodemon, cypress)
- Add automated server and cypress scripts to package.json.
- Update gitignore file with .DS_Store file
- Add [Procfile](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile) in root directory of app to explicitly declare what command should be executed to start your app.
    - `web: npm start`
- Add project files
  - server.js
  - layout.js
  - auth.js*
  - example.env*
  - public* (styles.css)
  - routes* (homes.js, logIn.js, logOut.js, posts.js, signUp.js)
  - database* (connection.js, init.sql, model.js)
  - [scripts](https://github.com/oliverjam/express-postgres-example#local-db-setup)* (create_db, populate_db)

* These files can be created after the app is deployed on Heroku, otherwise you will run into errors such as `Error: Please set the DATABASE_URL environment variable
(/app/database/connection.js:9:9)`.

<p align="center">
   <img src="https://media.giphy.com/media/3oz8xNmCcNTW9QrvOw/giphy.gif"/>
</p>

## Setup local postgres database 
Use [Oliverjam's](https://github.com/oliverjam) [Express Postgres Example tutorial](https://github.com/oliverjam/express-postgres-example#local-db-setup)

a) Copy and paste code from `create_db` & `populate_db` files into your project

(i) Amend file path of `init.sql` file in `populate_db` file L17 to 
   ```javascript
   ./database/init.sql
   ```
(ii) Do NOT change any code in `create_db` file

b) In the terminal run the following commands to allow permissions on each file to make them executable:
   ```javascript
   chmod +x ./scripts/create_db
   ```
   ```javascript
   chmod +x ./scripts/populate_db
   ```

c) In terminal run script commands (Note add the name of your db . This will dynamically input this name into all of the locations
   ```javascript
   ./scripts/create_db <here>
   ```
(ii) Once you have a designed your database (`init.sql`), run the following command to populate your local db;
   ```javascript
     ./scripts/populate_db
   ```

## Setup Heroku CLI
[(Back to top)](#table-of-contents)
I followed [Heroku Dev Center's](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) guide.

- Check to see if you have heroku installed on your terminal
  ```javascript
  heroku --version
  ```
- Install heroku
  ```javascript
  npm install -g heroku
  ```
- Log in to heroku CLI
  ```javascript
    heroku login
    ```
You’ll be prompted to enter any key to go to your web browser to complete login. The CLI will then log you in automatically.

<p align="center">
   <img src="https://media.giphy.com/media/xT3i1fXVbvyU52Ov2o/giphy.gif"/>
</p>

## Deploy your project on Heroku
[(Back to top)](#table-of-contents)
- Sign up/log in to Heroku.

### Create app
- Top right of dashboard screen click
    `New`>`Create new app`> Add app name > `Europe`(if in uk)>`Create app`

There are two ways you can deploy your app; via Herouku CLI or GitHub in the `Deploy` section.

### Connect to github
- Under `Deployment method` click `GitHub` and under `Connect to Github` search and select your project repo
- Next section `Automatic deploys` click `Enable Automatic Deploys`
  - This will automatic rebuild and deploy your app on Heroku with every push to main branch of your repository.
- For the first deployment you need to deploy manually.
  - Under `Manual deploy` click `Deploy Branch`
  - You will be able to see the build log
- Once app has successfully deployed you will see a `View` button which will open your app in another tab! 

![Screenshot 2021-10-13 at 17 21 55](https://user-images.githubusercontent.com/69358550/137174113-bed58b87-ce2f-46c1-8b79-9125ccd9840b.png)

### Heroku Git using Heroku CLI

To use this method you must have installed [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and follow these step.
![Screenshot 2021-10-13 at 17 20 10](https://user-images.githubusercontent.com/69358550/137174180-313860a8-6061-409b-8399-4ac09720ad71.png)

## Deploy your PostgreSQL database on Heroku
[(Back to top)](#table-of-contents)

### Add Postgres database

Under `Resources` section under `Add-ons` search `Heroku Postgres` > `Hobby Dev - Free` > `Provision`
Now you should see a tab under the `Add-ons`search bar labelled `Heroku Postgres`

### Connect to the database

Under `Setting` section > `Config Vars` section > `Revel Config Vars` > copy `DATABASE_URL` string.
Note here is where you can also add API keys, tokens(cookie secrets) and [environment variables](https://github.com/oliverjam/express-postgres-example#deploying-to-heroku) & .
Insert `PGSSLMODE='no-verify'` where `PGSSLMODE` is KEY and `no-verify` is VALUE.
In the terminal connect your database(init.sql) to your production(Heroku) postgres database:
  - `psql `DATABASE_URL_FROM_HEROKU`
  - `\i database/init.sql`
- You now have access/can query data from your heroku production database from your terminal.

### View Postgres database

Under `Resources` section you should see a tab under the `Add-ons`search bar labelled `Heroku Postgres`

![Screenshot 2021-10-13 at 17 32 22](https://user-images.githubusercontent.com/69358550/137175622-4e1ece9b-e4e5-4474-9a28-c7ee2eb90b75.png)

If you click on it you another tab will open showing data about your database (below is an example).

![Screenshot 2021-10-13 at 17 35 11](https://user-images.githubusercontent.com/69358550/137175983-cb3161b4-a79a-45c5-8caa-8574ae8299b9.png)

<p align="center">
   <img src="https://media.giphy.com/media/NEU34P7OlWe1a/giphy.gif"/>
</p>

## Setup Team on Heroku
[(Back to top)](#table-of-contents)

There are two ways:
- `Access` tab
- `Overview` tab > under `Collaborator activity` click on `Manage Access`

`Add collaborator` > insert email > `Save changes` > ask team mate to check email > `Accept Invitation`
Team mate now has access to Heroku app and add-ons.

### Delete collaborator

Under `Access` tab click on the pen emoji next to the collaborator you wish to remove.
Click `Delete collaborator` > `Confirm`

<p align="center">
   <img src="https://media.giphy.com/media/3oGNSMeVJ1cHup0OvC/giphy.gif"/>
</p>

## Debugging in Heroku
[(Back to top)](#table-of-contents)

### In the terminal

Run command
```javascript
  heroku logs --app=your-app-name --tail
```
### In Heroku

Top right hand corner > `More` > `View logs`
Here you can view your build logs especially handy when debugging!

<p align="center">
   <img src="https://media.giphy.com/media/de5bARu0SsXiU/giphy.gif"/>
</p>

## Delete App
[(Back to top)](#table-of-contents)

`Settings` tab > bottom of page `Delete App` > Enter your app's name > `Delete app`

## Resources
[(Back to top)](#table-of-contents)

- [An Absolute Beginner Guide to Node Package Manager](https://www.section.io/engineering-education/beginner-guide-to-npm/)
- [How to set up a free PostgreSQL database on Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1)
- [Deploy PostgreSQL in Node.js to Heroku for beginners](https://dev.to/glrta/deploy-postgresql-in-node-js-to-heroku-for-beginners-1ck0)
- [FAC21 Week 6 Authentication group project - Checkin'](https://github.com/fac21/week-6-csam)
- [Getting Started on Heroku with Node.js - Procfile](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile)
- [Heroku Postgres](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup)
- [The Heroku CLI Installation](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

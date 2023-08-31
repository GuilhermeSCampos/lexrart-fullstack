# :computer: Lexart - Web ChatBot


## :page_with_curl: About

This project aims to develop a web chatbot that responds to certain terms

<br />

In addition to being able to install and run the project locally, you can also interact with this
[<strong>online deploy made with vercel</strong>](https://lexrart-fullstack.vercel.app/)

> 	:bangbang: As the deployment is done in a free plan, the first requests may take a while to load. :bangbang:


<br />

And you can also check the API in this [<strong>deploy performed in Render</strong>](https://lexart-back-end.onrender.com/)

![Optus1](https://github.com/GuilhermeSCampos/lexrart-fullstack-test/assets/82980024/3960dadd-1fb9-4440-888c-c4b61df31c83)
![Optus2](https://github.com/GuilhermeSCampos/lexrart-fullstack-test/assets/82980024/e104b7ea-184b-4b1c-9935-a053dd59f8ba)


<br />
<br />


## :wrench: Tools Used

**Frontend**
- JavaScript
- React.js
- Tailwind.css
- Vite
- React Router
- Lucide icons
- React Loading Components
- React Context

**Backend**
- Node.js
- Express.js
- Cors
- Zod
- TypeORM
- PostgreSQL

  

## :hammer_and_wrench: Installation and Execution

<details>
  <summary markdown="span"><strong>Running the Application Locally</strong></summary><br />
To run this application locally, you need to have **Git**, **Node**, and **PostgreSQL** installed and updated on your computer.

<details>
  <summary markdown="span"><strong> :hammer: Setting up the Back-end</strong></summary><br />

1. Clone the repository

   - Use the command: `git clone git@github.com:GuilhermeSCampos/lexrart-fullstack-test.git`.
   - Enter the repository folder you just cloned:
     - `cd lexrart-fullstack-test`
2. Enter the Backend folder

   - `cd back-end`

3. Install the dependencies

   - `npm install`

   <summary markdown="span"><strong>Setting up the Database and .env</strong></summary><br />

   The project is configured to run on a PostgreSQL database, so you need to install PostgreSQL on your computer or use a cloud server. After configuring the database, you need to set the environment variables:

### 1. In a .env file in the repository root, add your PostgreSQL database settings:

```sh
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
```

### 2. In the same .env file, set the desired port for the Express server and the JWT secret:

```sh
PORT=
JWT_SECRET=
```
### 3. After filling in the .env data to connect to the database, run migrations to populate the database:
  
  - `npm run migration:generate` only if you don't have the migration yet
  - `npm run migration:run`

### 4. Finally, after all configurations, start the server using this command in the back-end directory:
  
  - `npm run dev`

  
  </details>
  
   <details>
  <summary markdown="span"><strong> :sunrise: Setting up the Front-end</strong></summary><br />
  
  
  1. Access the repository
    - `cd lexrart-fullstack-test`
    
  2. Enter the Frontend folder

  - `cd front-end`

  3. Install the dependencies

  - `npm install`
    
  <summary markdown="span"><strong>Setting up environment variables</strong></summary><br />
  
 The Frontend project is configured to make various requests to an API, and the API address will change depending on how you run the project. Therefore, you need to set the environment variables:

### 1. In a .env file in the repository root, add your API address settings as shown below:

```sh
VITE_API_URL=https://lexart-back-end.onrender.com
```

### 2. Finally, after all configurations, start the server using this command in the frontend directory:
  
  - `npm run dev`

  
  </details>
  
 </details>
 
 ## :computer: API Documentation and Routes:

 <summary markdown="span"><strong>Getting all the conversations - GET /conversation?order=</strong></summary><br />
 
 <summary markdown="span"><strong>Creating a conversation - POST /conversation</strong></summary><br />
 
```json
{
          "text": "asdoaskd##date;;",
      
        }
```
 <summary markdown="span"><strong>Downloading a conversation - PATCH /conversation/:id</strong></summary><br />
 
<details>
  <summary markdown="span"><strong>Creating an user - POST /auth/register </strong></summary><br />
  
```sh
body = {
          "user_name": "guilherme",
          "password": "guilherme123",
        }
```
</details>

<details>
  <summary markdown="span"><strong>Login - POST /auth;login </strong></summary><br />
  
```sh
body = {
          "user_name": "name",
          "password": "password"
        }
```
</details>



 
 

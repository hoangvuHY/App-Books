# SETA TEST FRESHER NODEJS
## I. OVERVIEW

### Function
- SignUp
- Login
- GetAllBooks 
- GetBookByID 
- AddBook 
- UpdateBookByID 

### Technology  
- Front-end: HTML, CSS, Javascript, ES6, JQuery 
- Back-end: NodeJS, Express 
- Database: MongoDB, Mongoose 
- Authorization: JWT 

### Database
- users: _id, name, email, password, birthday, address
- books: _id, name, author, description, idUser

### Queries
- create 
- find
- findOne
- updateOne
- deleteOne

## II. SETTING
### The computer must be pre-installed with the following technologies: 
* nodejs: https://nodejs.org/en/download
* MongoDB Community Server (localhost) : https://www.mongodb.com/try/download/community


Step 1. Clone repo to your computer with

      git clone https://github.com/hoangvuHY/App-Books.git
      
Step 2. Edit the parameters in the .env file to suit the configuration of your device

Step 3. Run in cmd
      
      npm install
      
      npm start

Step 4. Type the following link in your browser (Chrome) to go to the Login page:
      
      http://localhost:8080/login


Step 5. Register and login to use

Step 6: Perform your functions such as:  add, edit, delete, ...


## III. ALGORITHM TEST
### Algorithm idea
- Method 1: Reverse the elements in the child array, then reverse the elements in the parent array
- Method 2: Reverse the elements in the parent array, and then reverse the elements in the sub-array
### Testing with jest

Run in cmd

      npm run test
# SETA-TEST_NODEJS

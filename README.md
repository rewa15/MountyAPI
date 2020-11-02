# MountyAPI

Assignment solution

// Steps to run:

1. Installing all the node modules
   - npm i express
   - npm i body-parser
   - npm i mongoose
2. Run 'node app.js' on terminal
3. Server will start on port 3000
4. List Of API's supported:
   - GET: 
     route: /get-users
     route: /get-sorted-users
     route: /get-nearest-users/:latitude/:longitude
   - POST:
     route: /add-user
   - PUT:
     route: /update-user/:userNo
   - DELETE
     route: /delete-user/:userNo
 5. For Testing of API's, we can use Postman. We can just send request to the API route along with data via Postman and test the REST API, while server is running       locally.

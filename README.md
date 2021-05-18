# twitch-clone
A web application that uses React.js in the frontend, and a Node server with Express in the backend.

I am still planning on adding more to this as I go on, such as implementing a user login, which would allow for more personalized experiences.

## How to use the application

1. In order to use this application, you must first navigate to twitch-backend/lib/API.js. In that file, edit the clientId() and clientSecret() functions so that they return the values you have in your Twitch Developer Console. 

2. Once that is done, navigate to the twitch-backend folder, and run the "npm start" command. This will start the server. 

3. In your browser, navigate to "localhost:9000/token." If you did the previous step correctly, you should see an access token on screen. 

4. Copy the token and return to the API.js file mentioned earlier. Paste the token in the authorizationHeader() function where it says "<put your access token here>."

5. Save the API.js file and stop the server by using the Ctrl+C shortcut. 

6. Once again, navigate to the twitch-backend folder and use the command "npm start" to run the server with your newest changes. 

7. After this, navigate to the twitch-api-project folder and use the "npm start" command to run the React application. When everything is up and running, you can go to localhost:3000 in your browser and use the application.
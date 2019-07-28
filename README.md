# Transfree App Deployment Guide

Follow this step-by-step to deploy the app

 1. Clone project, open your terminal and go to the project's folder.
 2. Install dependencies: 
> npm i
3. Modify environments on *config.js*. Current API is on http://103.101.224.147:8080. For development purpose, use this address as the API (e.g. http://localhost:8000) (you need to run the server as well)
4. Run the app. By default, it will run on port 3000.
> npm run dev
5. To test it, open http://localhost:3000/ on your browser
6. To build into production, run these two commands
> npm run build;
> npm start

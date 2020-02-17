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


# Bugs fixing and testing new features

To fix bugs or test new features, please create a new branch and push to remote directory. Once updated, I will merge into development branch to test. If there's no problem, I will merge to master and deploy into production. Step-by-step guide:

1. Pull latest commit from development
2. Checkout to new branch
> git checkout -b 'new-branch-name'
3. Make the necessary changes/addition. One it's done, push to the branch to remote repository
> git add 'files here'\
> git commit -m 'new commit message'\
> git push origin 'new-branch'

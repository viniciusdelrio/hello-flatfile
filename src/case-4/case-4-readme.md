# Case 4: How to use backend and frontend to have a better experience
In this example I use the Flatfile React embedded component integrating with backend. It enables the user to save the progress allowing to continue the process another time.

## Prereq.
1. Install these packages: nvm, node and nodemon
2. Inside frontend and backend folders, create your env files like .env.example.

## How to execute
To execute this app you should execute both frontend and backend. To do that open two terminals and execute the following commands:

### Terminal 1 (backend):
1. cd backend
2. nvm use 18
3. npm i
4. npm run dev

### Terminal 2 (frontend):
1. cd frontend
2. nvm use --lts
3. npm i
4. npm start

After that you can play on http://localhost:3000.

There is a spreadsheet inside "spreadsheets" folder that you could use to import when you are playing. 
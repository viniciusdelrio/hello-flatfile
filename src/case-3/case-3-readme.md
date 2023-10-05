# Case 3: How to handle with clients
In this example I use the Flatfile React embedded component working with two comboboxes. THese choose what workbook and listener the component will render and use.

## Prereq.
This example assumes that you have done the case 1, because you will need env id and publishable key to run this example!

## How to execute
1. Clone and open the repository
2. Rename the '.env.example' to '.env' and set your keys
3. Run the follow commands below:
    - npm install
    - npm start

## Limitation
Because we are using just a frontend (authentication at Flatfile using publishable key) we do not have the progress stored. Every time the space is open, a new space will be created in our account.
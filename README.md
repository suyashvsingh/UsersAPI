# Getting Started

## Create a new user

- POST request to _https://svs-usersapi.herokuapp.com/users_
- Body should contain _name_, _email_ and _password_ keys
- New user will be created successfully

## Login

- GET request to _https://svs-usersapi.herokuapp.com/users_
- Body should contain _email_ and _password_ keys
- User will receive his/her JSON web token

## Updating information

- PUT request to _https://svs-usersapi.herokuapp.com/users_
- Body should contain updated info, with one or more fields, and - Headers should have _authorization_ key and value should be **_Bearer JWT_**, where JWT will be the JSON web token of the user
- User will receive the updated information

## Deleting

- DELETE request to _https://svs-usersapi.herokuapp.com/users_
- Headers should have _authorization_ key and value should be **_Bearer JWT_**, where JWT will be the JSON web token of the user
- The user will be deleted

To start the react server :
- npm install
- npm start
- http://localhost:5173/

To start the json server :
- npm install -g json-server
- json-server --watch db.json
- http://localhost:3000/


Architecture for src folder :
 - providers : contains the 2 providers used in the app
    - CharactersProvider : contains the logic to get/create the characters from the json server
    - UserProvider : contains the logic for login
 - router : contains the router of the app
    -  / : contains the main page of the app
    -  /login : contains the login page
    -  /character/:id : contains the character page
    -  /character : contains the create character page
 - views : contains the views of the app
    -  character : contains the character view
    -  home : contains the home view (with the list of characters)
    -  main-content : contains the main content of the app (the header and general container)

## Molotov

### How to run the App :

Run the app with the command : sudo sh deploy.sh

The server should be listening on port 5000.

The port of the client is not important.

If the script doesn't work :

Run the following commands in one terminal: cd server/ && npm install && node server.js
Run the following commands in another terminal : cd client/ && npm install && npm start

Access to the website here : localhost:3000
### Database

You can use your own database created on https://mongodb.com.
You need to change the SRV connection line in the sample.env file by your own.
It's better to have your own password as the JWT password in the sample file.



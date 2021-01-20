## Molotov

### How to run the App :

Run the app with the command : 

$cd serveur
$sudo npm install
$cd ../client
$sudo npm install
$cd ..
$sudo sh deploy.sh

The server should be listening on port 5000.

The port of the client is not important.

### Database

You can use your own database created on https://mongodb.com.
You need to change the SRV connection line in the sample.env file by your own.
It's better to have your own password as the JWT password in the sample file.



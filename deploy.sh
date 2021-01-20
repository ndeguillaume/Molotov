#!/bin/bash
cp sample.env server/.env
cp sample.env client/.env

cd server
gnome-terminal -- sudo npm start 

cd ../client
gnome-terminal -- sudo npm start

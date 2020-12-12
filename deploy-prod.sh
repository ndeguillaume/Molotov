#!/bin/bash
cp docker-compose-prod.yml docker-compose.yml
docker-compose up --build --remove-orphans

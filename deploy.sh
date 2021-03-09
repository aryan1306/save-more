#!/bin/bash
echo What should the version be?
read VERSION
docker build -t 9284807854/save-more:$VERSION .
docker push 9284807854/save-more:$VERSION
ssh root@139.59.17.148 "docker login -u 9284807854 -p Kz0VyEBqkS2o && docker pull 9284807854/save-more:$VERSION && docker tag 9284807854/save-more:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"

echo ------------------------------------Application Deployed-----------------------------------
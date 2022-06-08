# sudo yarn build
git pull
sudo npm run build
sudo rm -rf ./server/dist
sudo cp -rf dist ./server
sudo cd ./server
sudo docker-compose up -d --force-recreate --no-deps --build
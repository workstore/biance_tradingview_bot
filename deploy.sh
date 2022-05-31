# sudo yarn build
git pull
sudo npm run build
sudo rm -rf ./server/dist
cp -rf dist ./server
cd ./server
docker-compose up -d --force-recreate --no-deps --build
sudo yarn build
cp -r dist ./server/static
cd ./server
docker build -t 3dx_app .
docker-compose up
FROM node:14-alpine

# 注释
LABEL maintainer = "jasonchang6435 <jasonchang6435@gmail.com>"

# 创建工作目录
RUN rm -rf /app
RUN mkdir /app
WORKDIR /app

# 安装项目依赖
COPY . /app
RUN npm install

# 对外暴露端口
EXPOSE 4000
EXPOSE 8082

# 启动 Image 时执行命令
# CMD BUILD_ENV=docker node app.js

RUN cd /app
# CMD ["npm", "run", "start"]
CMD ["npm", "run", "deploy"]


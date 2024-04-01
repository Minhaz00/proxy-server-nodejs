# syntax=docker/dockerfile:1
FROM node

WORKDIR /app

COPY . .

RUN bash -c "npm install"

EXPOSE 5000

ENTRYPOINT ["npm", "start"]

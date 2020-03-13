from node:12-alpine as base
RUN apk add --no-cache tini tzdata \
    && echo "UTC" > /etc/timezone
ENTRYPOINT ["/sbin/tini", "--"]

ENV NODE_ENV=production
WORKDIR /usr/node/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]

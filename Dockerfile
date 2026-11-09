FROM node:26-alpine
WORKDIR /app
COPY package.json server.js ./
COPY lib ./lib
ENV PORT=5590
EXPOSE 5590
USER node
CMD ["node", "server.js"]

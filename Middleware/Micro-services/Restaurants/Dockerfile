FROM node:16.15.1
WORKDIR .
COPY . .

RUN npm install
RUN npm install -g typescript
EXPOSE 3005

CMD  ["npm", "run", "start"]
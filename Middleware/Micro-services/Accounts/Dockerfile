FROM node:16.15.1
WORKDIR .
COPY . .

RUN npm install
RUN npm install -g typescript
EXPOSE 3001

CMD  ["npm", "run", "start"]
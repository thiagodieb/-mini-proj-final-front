FROM node

RUN mkdir -p /opt/project/

WORKDIR /opt/project/

COPY app/dist/jip-app /opt/project/
COPY app/node_modules /opt/project/node_modules
COPY app/server.js /opt/project/

RUN npm i -g pm2@latest

CMD ["pm2", "start", "server.js","--no-daemon"]

FROM node:latest as node

ARG WORK_DIR=/frontend
ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm install -g @angular/cli
RUN npm install
RUN npm install bootstrap

COPY . ${WORK_DIR}

EXPOSE 4200

CMD npm start

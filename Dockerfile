FROM node:18

COPY api.js app.js fileWriter.js package.json package-lock.json setup.js .
RUN npm i

CMD ["node", "app.js"]
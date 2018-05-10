FROM node:9.11.1-alpine

LABEL maintainer="Heroqu"

# Create app directory
WORKDIR /opt/app

# # Install app dependencies
# RUN npm -g install serve

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# RUN yarn
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Build react static files
RUN npm run build

EXPOSE 3000

# serve build folder on port 3000
CMD ["serve", "-s", "/opt/app/build", "-p", "3000"]

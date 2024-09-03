FROM node:12.14.1
WORKDIR /microfrontends
COPY package*.json ./
RUN npm install -g npm@6.13.4
RUN npm install -g @angular/cli@12.2.10

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
# RUN npm run build
EXPOSE 4200 4202 4203 4204

# Serve the application (default to shell)
# CMD ["ng", "serve", "shell"]

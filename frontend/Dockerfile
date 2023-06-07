FROM node:16.17-alpine as builder

# Create directory for application
WORKDIR /react-ui

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Build the project
RUN npm run build


FROM nginx:1.17.10-alpine

RUN apk add nano && apk add curl

# Remove default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY ./nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Copy built files from the builder stage
COPY --from=builder /react-ui/build /usr/share/nginx/html
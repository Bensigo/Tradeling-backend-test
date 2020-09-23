# Use Node v11.2 as the base image.
FROM node:latest

# Copy everything in current directory to /server folder
COPY . /server

#Set the working directory
WORKDIR /server/src/dist


# Install dependencies
RUN cd /server; \
    yarn


EXPOSE 3001

CMD ["yarn", "dev"]

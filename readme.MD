# Tradeling API Test

A voucher microservice that allow customer to create a voucher for a special offer and consume it.
  #### features
  - create a customer
  - create a special offer
  - create a voucher
  - view vouchers by customer email
  - use or apply voucher
  - Api test
  - swagger(appi docs)
  #### Technologies used
   - Docker
   - nodejs
   - Typescript
   - mongoDB
   - nginx (for reverse proxy)
   - swagger for Api documentation 

#### Architecture!
   Using a microservice architecture pattern for the following reasons
   -  Scalability
   -   Availability
   -   Resiliency
   - Independent, autonomous
   - Decentralized governance
 we are using an Itegration design Pattern where we have an api gateway as the single source of truth. the design pattern use in the screen shot below. 
 ![alt archtiecture](https://res.cloudinary.com/dczlbbkdg/image/upload/v1600884189/archecture_wu2zfa.png)

### Installation
 require docker to run all services. visit [docker](https://docker.com)
 ##### start
 To start up all services/conatiner.
 ```sh
   # make sure you have docker install on you local macking
   $ docker-compose build && docker-compose up
   ```
   #### On start to use endpoint
   when all your conatainer is up should vist the enpoint below
   [localhost:8080](http://localhost8080)
   ##### Drop container
   To drop down conatiner
   ```sh
   $ docker-compose down
   ```
   #### To run test
   ```sh
   # in application current working dir
   $ cd voucher-service
   # make sure you have yarn and node install on your local machine
   $ yarn  # install dependencies
   $ yarn test
   ```
    

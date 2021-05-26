# Inventory API Mockup
*version 1.0.0*

A mockup inventory API to demonstrate an implementation of RESTful API on 
[NodeJS](http://nodejs.org/) using [NestJS](https://nestjs.com) framework with 
[TypeORM](https://typeorm.io) database abstraction and 
[JWT](https://jwt.io/) authentication

## Setup

```bash
$ npm install
```

### Database

Create a new MySQL database and enter the connection information
on `ormconfig.json` file according to the following:

```json
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "username",
    "password": "password",
    "database": "databasename",
    "synchronize": true,
    "logging": false,
    "cli": {
        "entitiesDir": "src/entities",
        "migrationsDir": "src/migrations"
    }
}
```
All the database structure and seed data will be
created at the first time the application is run.

## Running the app

```bash
# development
$ npm run start
```
The application will be available at [http://localhost:3000](http://localhost:3000)

## Testing

This application has the following entities:

- User
- Company
- Product

All the endpoints are protected by JWT except the `auth` one. 
So, after authenticating the user, the generated access token
must be placed on a bearer Authorization header.

Follow the available endpoint:

#### Authentication
- POST `/auth` - sign in
    - body: { email, password } 
    - response: { access_token }
- GET `/profile` - retrieve user's profile
    - response: User
    
#### Company
- POST `/company` - create company
    - body: { name }
    - response: Company
- GET `/company` - retrieve all companies
    - response: Company[]
- GET `/company/:companyId/products` - retrieve all products from a company
    - response: Company
- POST `/company/:companyId/product` - create product
    - body: { name, description }
    - response: Product

#### Product
- GET `/product` - retrieve all products
    - response: Product[]
- PUT `/product` - modify product
    - body: { name, description }
    - response: Product
- DELETE `/product/:productId` - delete a product

## Considerations

For convenience, the endpoints are available on the postman collections at 
`inventory-api-mock.postman_collection` file.

Case needs to reset the database, use this command: 
`npm run typeorm schema:drop`

Although the application sample has authentication implemented with JWT, 
the standards of authorization was not be implemented yet. So, it lacks on
security since it is possible to create, update or delete a product on
a company that the user is not associated.

Unit tests have not been implemented yet
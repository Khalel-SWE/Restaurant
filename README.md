markdown
# Restaurant

Restaurant is a full-stack restaurant ordering and management system developed as a graduation project.

The application provides separate functionality for regular users and administrators. Users can browse restaurant products, manage their shopping cart, place and track orders, manage their profile, communicate with the restaurant, and receive in-app notifications. Administrators can manage products, users, orders, and contact messages.

## Project Overview

The system is divided into two main parts:

- Frontend: Angular
- Backend: Spring Boot
- Database: Oracle Database 21c

The application uses JWT-based authentication and role-based authorization to provide different access levels for users and administrators.

## Technologies

### Frontend

- Angular 11 / Angular 16
- Node.js
- NVM
- TypeScript
- HTML5
- CSS3
- Bootstrap

### Backend

- Java 17
- Spring Boot 3
- Spring Security
- JWT Authentication
- REST APIs
- Maven

### Database

- Oracle Database 21c
- Oracle HR Schema
- DBeaver

### Development Tools

- IntelliJ IDEA
- Visual Studio Code
- DBeaver
- GitHub

## User Features

Regular users can:

- Register a new account
- Login and logout
- Browse restaurant products
- Browse products by category
- View product details
- Add products to the shopping cart
- View the shopping cart
- See updated cart information in the navbar
- Checkout and create orders
- View previous and current orders
- Track order status
- Update their profile information
- Send messages to the restaurant
- View previously sent messages
- View administrator replies
- View the restaurant team
- Receive in-app notifications

## User Profile Completion

A user must complete the required profile information before placing an order.

The required information includes:

- Email
- Phone number
- Address
- Age

If a new user tries to place an order without completing the required information:

1. The system displays a message asking the user to complete their profile.
2. The user is redirected to the profile page.
3. The user completes the required information.
4. The user can return to the ordering process.
5. The order can then be created successfully.

After creating an order, the system generates an order code such as:

```text
RES-202
````

Users who have already completed their profile can place orders without going through the profile completion process again.

## Product Browsing

Users can view available restaurant products and open the product details before adding an item to the cart.

Product information includes:

* Product name
* Description
* Price
* Image
* Category

The product details are displayed before the user adds the product to the shopping cart.

## Shopping Cart

Users can add products to their shopping cart.

The application keeps track of the cart information and updates the cart-related information displayed in the navbar whenever products are added.

Users can review their selected products before proceeding to checkout.

## Order Management

Users can view all of their previous and current orders in one place.

Each order contains information such as:

* Order code
* Total price
* Number of items
* Ordered products
* Current order status

The order status can be changed by an administrator.

The normal order process is:

```text
PENDING
   |
   v
PREPARING
   |
   v
ON_THE_WAY
   |
   v
DELIVERED
```

An order can also be cancelled:

```text
PENDING / PREPARING / ON_THE_WAY
                |
                v
            CANCELLED
```

Whenever the administrator changes the order status, the user receives an in-app notification about the new status.

## Contact Us System

The application includes a communication system between users and administrators.

### User

Users can:

* Open the Contact Us page
* Send messages to the restaurant
* View all messages they have sent
* Check whether a message has been answered
* View the administrator's reply

If an administrator has not replied yet, the user can see that there is no reply available.

### Administrator

Administrators can:

* View all contact messages
* See which user sent each message
* Read user messages
* Reply to users

When an administrator replies to a user's message, the user receives an in-app notification.

## Administrator Features

Administrators can:

* Login and logout
* Add new products
* Edit existing products
* Delete products
* View product details
* Select product categories
* Manage product names
* Manage product descriptions
* Manage product prices
* Manage product images
* View all orders
* Change order statuses
* View all registered users
* Edit user information
* Check whether users have completed their profiles
* View contact messages
* Reply to user messages
* Receive notifications about new orders
* Receive notifications about new contact messages

## Product Management

Administrators can add new restaurant products.

When creating a product, the administrator can specify:

* Product name
* Product description
* Price
* Category
* Product image

Administrators can also edit existing products and change:

* Name
* Description
* Price
* Category
* Image

Products can also be deleted by administrators.

Product images used by the frontend are stored in:

```text
front-end/src/assets/img
```

## User Management

Administrators can view registered users.

The administrator can:

* View user information
* Edit user information
* Check whether a user's required profile information is complete

The system uses roles to distinguish between regular users and administrators.

## Authentication and Authorization

The application uses Spring Security and JWT for authentication.

The authentication flow is:

```text
Register
   |
   v
Login
   |
   v
Authentication
   |
   v
JWT Token
   |
   v
Authenticated Requests
   |
   v
Role-Based Authorization
```

New accounts are registered as regular users.

Administrator access is determined by the user's role stored in the database.

The application supports:

* USER
* ADMIN

## Notification System

The project includes an in-app notification system for both users and administrators.

### Administrator Notifications

Administrators receive a notification when a user sends a new contact message.

The flow is:

```text
User sends a message
        |
        v
Admin receives notification
        |
        v
Admin opens messages
        |
        v
Admin reads and replies
```

Administrators also receive a notification when a new order is created.

The flow is:

```text
User creates an order
        |
        v
Admin receives notification
        |
        v
Admin opens orders
        |
        v
Admin processes the order
```

### User Notifications

Users receive notifications when:

* An administrator replies to their message
* Their order status changes
* A new product is added

Order status notifications can be triggered when an order changes to:

* PREPARING
* ON_THE_WAY
* DELIVERED
* CANCELLED

When an administrator adds a new product, users receive an in-app notification informing them about the new product.

The system does not send notifications to users when:

* A product is deleted
* An existing product is edited

## Database

The project uses Oracle Database 21c.

Database service:

```text
XEPDB1
```

Database schema:

```text
HR
```

The required database tables are created and updated automatically through JPA/Hibernate.

Initial restaurant data is inserted separately using DBeaver.

The initial data includes approximately:

* 60 restaurant products
* Product descriptions
* Product prices
* Product image references
* Restaurant team / chef data

## Project Images

Frontend images are stored in:

```text
front-end/src/assets/img
```

This directory contains the images used throughout the application, including product and restaurant-related images.

## Project Structure

A simplified project structure is:

```text
Restaurant/
|
+-- backend/
|   |
|   +-- src/
|   |   +-- main/
|   |       +-- java/
|   |       +-- resources/
|   |
|   +-- pom.xml
|
+-- front-end/
|   |
|   +-- src/
|   |   +-- app/
|   |   +-- assets/
|   |       +-- img/
|   |
|   +-- package.json
|   +-- angular.json
|
+-- README.md
```

## Running the Project

### Prerequisites

Make sure the following are installed:

* Java 17
* Node.js
* NVM
* Oracle Database 21c
* DBeaver
* IntelliJ IDEA
* Visual Studio Code

### Backend

Open the backend project using IntelliJ IDEA.

Make sure Oracle Database is running and the required database configuration is available.

The project uses:

```text
Database: Oracle Database 21c
Service: XEPDB1
Schema: HR
```

Run the Spring Boot application directly from IntelliJ IDEA.

### Frontend

Open the frontend project and navigate to:

```text
front-end
```

Install the required dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

The frontend will then be available through the local Angular development server.

## Initial Database Data

The database structure is handled automatically by Hibernate/JPA.

Initial restaurant data is prepared separately using DBeaver.

The project contains approximately 60 predefined products with their:

* Names
* Descriptions
* Prices
* Categories
* Image references

Restaurant chef/team information is also stored as initial database data.

## Main Application Flow

```text
                         LOGIN
                           |
              +------------+------------+
              |                         |
             USER                      ADMIN
              |                         |
              v                         v
       Browse Products          Manage Products
              |                         |
              v                         v
       Product Details           Manage Users
              |                         |
              v                         v
             Cart               Manage Orders
              |                         |
              v                         v
           Checkout            Contact Messages
              |                         |
              v                         v
            Order               Notifications
              |
              v
       Track Order Status
              |
              v
        Notifications
```

## Graduation Project

Restaurant was developed as a graduation project to demonstrate the practical development of a full-stack restaurant ordering and management system.

The project demonstrates practical implementation of:

* Full-stack web development
* REST APIs
* Spring Boot
* Spring Security
* JWT authentication
* Role-based authorization
* Angular
* Oracle Database
* CRUD operations
* Product management
* Shopping cart functionality
* Order management
* User profile management
* Contact messaging
* In-app notifications

## Project Status

Completed.

The main required user and administrator features have been implemented and the application is ready for graduation project demonstration.

## Future Improvements

Possible future improvements include:

* Online payment integration
* Email notifications
* Real-time notifications using WebSockets
* Advanced product search and filtering
* Order delivery tracking
* Improved administration dashboard
* Automated testing
* Docker deployment
* Production deployment
* More advanced security and account management

```
```

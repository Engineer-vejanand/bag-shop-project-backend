# Bag Shop Project Backend

Welcome to the **Bag Shop Project Backend**, a Node.js-powered backend application built with Express.js. This is my first backend project, focusing on implementing key backend functionalities such as user and admin authentication, product management, and more. The project includes support for dynamic views using EJS templates.

---

## Features

- **User Authentication**: 
  - Register, login, and logout functionality for users.
  - Passwords are hashed using `bcrypt` for secure storage.
- **Admin Authentication**: 
  - Admin login with restricted access to owner-related functionalities.
  - JWT-based authentication for secure admin sessions.
- **Product Management**: 
  - Admins can create and manage products, including adding images using Multer.
- **Cart Management**: 
  - Users can add products to their cart and view calculated bills dynamically.
- **Dynamic Views with EJS**:
  - Server-side rendering for all pages with integrated error and success flash messages.
- **Secure Sessions**:
  - Cookies and sessions are managed with `express-session` and `cookie-parser`.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT, bcrypt
- **File Uploads**: Multer
- **Templating Engine**: EJS
- **Flash Messages**: connect-flash
- **Environment Management**: dotenv
- **Session Management**: express-session
- **Other**: Path, cookie-parser

---

## Project Structure

```plaintext
bag-shop-project-backend/
├── config/
│   ├── mongoose.connection.js   # MongoDB connection
│   ├── multer.config.js         # Multer configuration for file uploads
├── controllers/
│   ├── adminAuthController.js   # Admin authentication logic
│   ├── authController.js        # User authentication logic
├── middlewares/
│   ├── isAdminAccess.js         # Middleware for admin access validation
│   ├── isLoggedin.js            # Middleware for user access validation
├── models/
│   ├── owners.model.js          # MongoDB schema for owners
│   ├── product.model.js         # MongoDB schema for products
│   ├── user.model.js            # MongoDB schema for users
├── public/                      # Static assets (excluded in Git)
├── routes/
│   ├── index.js                 # Routes for general pages
│   ├── ownersRouter.js          # Routes for admin/owners
│   ├── productRouter.js         # Routes for products
│   ├── usersRouter.js           # Routes for users
├── utils/
│   ├── generateAdminToken.js    # JWT generator for admin
│   ├── generateToken.js         # JWT generator for users
├── views/                       # EJS templates (excluded in Git)
├── .env                         # Environment variables (excluded in Git)
├── .gitignore                   # Ignored files and folders
├── index.js                     # Main entry point of the application
├── package.json                 # Node.js dependencies
├── package-lock.json            # Lockfile for dependencies

Here is the updated information with the login details:

# E-commerce Application
This project is a full-stack e-commerce application built with Vue.js for the frontend and Node.js (Express) for the backend. It features a product listing page, user authentication, and product management functionalities.

## Features
### Frontend (Vue.js)
- Product listing page with details (name, description, price, image)
- Add new product form (authenticated users only)
- Search functionality to filter products by name
- User authentication (login form)
  - Login details:
    - Username: admin
    - Password: admin
- Responsive design for various devices

### Backend (Node.js + Express)
- RESTful API for product management (CRUD operations)
- User authentication API
- Route protection middleware
- Database integration (MongoDB)

### Database
- Users collection/table (username, hashed password, email)
- Products collection/table (name, description, price, imageURL, createdBy)

## Tech Stack
- Frontend: Vue.js, Vue CLI, Vue Router, Vuex
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- ORM/ODM: Mongoose (for MongoDB)
- CSS Framework: Tailwind CSS

## Prerequisites
- Node.js (v14+ recommended)
- npm
- MongoDB

## Setup and Installation
1. Clone the repository:
   ```
   git clone https://github.com/vickymayowa/LearnlyApp-Edtech-Web-App
   cd LearnlyApp-Edtech-Web-App
   ```
2. Install dependencies for both frontend and backend:
   ```
   # Install backend dependencies
   cd LearnlyApp Edtech Backend
   npm install
   # Install frontend dependencies
   cd LearnlyApp Edtech Frontend
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add the following variables:
     ```
     PORT=5000
     NODE_ENV = your-node-env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
4. Start the backend server:
   ```
   cd LearnlyApp Edtech Backend
   nodemon index
   ```
5. Start the frontend development server:
   ```
   cd LearnlyApp Edtech Frontend
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:8080`

## Project Structure
```
ecommerce-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── frontend/
    ├── public/
    └── src/
        ├── assets/
        ├── components/
        ├── router/
        ├── store/
        ├── views/
        ├── App.vue
        └── main.js
```

## API Endpoints
- POST /api/auth/login - User login
  - Username: admin
  - Password: admin
- GET /api/products - Get all products
- POST /api/products - Create a new product (authenticated)
- PUT /api/products/:id - Update a product (authenticated)
- DELETE /api/products/:id - Delete a product (authenticated)

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License
This project is licensed under the MIT License.

## Acknowledgements
- [Vue.js](https://vuejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JSON Web Tokens](https://jwt.io/)

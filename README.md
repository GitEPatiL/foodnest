# FoodNest API 🍔🚀

A full-stack food delivery application backend built with Node.js, Express, and MongoDB.

## 🌟 Features

- **User Authentication**: Secure signup, login, and logout functionalities using JWT and bcrypt.
- **Role-Based Access**: 
  - **Users**: Browse and order food.
  - **Food Partners (Restaurants)**: Manage menus and upload food items.
- **Media Uploads**: Integrated with ImageKit for robust image and video uploads.
- **Database**: MongoDB with Mongoose ODM.

## 🛠️ Tech Stack

- **Backend Framework**: Node.js & Express.js
- **Database**: MongoDB & Mongoose
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **File Storage**: ImageKit (@imagekit/nodejs)
- **File Handling**: Multer & UUID

## 📂 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Route handlers (auth, food, etc.)
│   ├── middlewares/      # Authentication & authorization checks
│   ├── models/           # Mongoose schemas (user, foodpartner, food)
│   ├── routes/           # API endpoints routing
│   └── services/         # External services integration (e.g., storage)
├── package.json
└── server.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB instance running
- ImageKit account for media uploads

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=your_port_number
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## 🔮 Future Enhancements & Ideas

Here are some features you can implement next to make this application more robust and closer to a production-ready application:

- [ ] **Order Management System**: Allow users to place orders, and food partners to accept/reject and update order statuses (e.g., Preparing, Out for Delivery, Delivered).
- [ ] **Payment Gateway Integration**: Integrate Stripe or Razorpay to simulate real payments.
- [ ] **Live Location Tracking**: Add WebSockets (e.g., Socket.io) to track delivery driver locations in real-time.
- [ ] **Search and Filtering**: Implement advanced search for restaurants and dishes using MongoDB text search or geospatial queries for nearby restaurants.
- [ ] **Reviews and Ratings**: Allow users to rate restaurants and leave reviews for food items.
- [ ] **Cart Functionality**: Build a robust shopping cart logic (involving backend persistence and frontend state management).
- [ ] **Admin Dashboard**: Create an admin panel for managing users, food partners, resolving disputes, and viewing overall analytics.
- [ ] **Push Notifications**: Integrate Firebase Cloud Messaging (FCM) or standard Web Push to notify users about order updates.
- [ ] **Promocodes and Discounts**: Add a coupon system to apply discounts during checkout.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---
*Built with ❤️ for learning and development.*

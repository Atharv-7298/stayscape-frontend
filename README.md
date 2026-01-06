# StayScape 🏡

**StayScape** is a full-stack Airbnb-style property booking platform that allows users to explore properties, apply filters, and securely book stays. The application features authentication, protected booking workflows, and user-specific booking history.

---

## 🚀 Features

* 🔐 **JWT-based Authentication** (Signup / Login)
* 🏘️ **Property Listings** with search and filtering
* 📅 **Protected Booking Workflow** (authenticated users only)
* 👤 **User-Specific Booking History**
* 🗄️ **Persistent Data Storage** using MongoDB
* 🌐 **RESTful APIs** for frontend–backend communication
* 📱 **Responsive UI** built with React

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* JWT (JSON Web Tokens)
* REST APIs

### Database

* MongoDB (Mongoose ODM)

---

## 📂 Project Structure (Simplified)

```
StayScape/
├── client/          # React frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── server/          # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## 🔑 Authentication Flow

* Users can **sign up / log in** using email and password
* On successful login, a **JWT token** is issued
* Protected routes (booking, history) require valid JWT

---

## 🔍 Search & Filtering

* Search properties by keywords
* Filter by category, price range, or location
* Optimized queries for fast data retrieval

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js
* MongoDB
* npm or yarn

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/stayscape.git
```

2. **Backend setup**

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start backend server:

```bash
npm run dev
```

3. **Frontend setup**

```bash
cd client
npm install
npm run dev
```

---

## 📌 Future Improvements

* Online payment integration
* Reviews & ratings system
* Host dashboard for property management
* Wishlist functionality
* Image optimization & caching

---

## 👨‍💻 Author

**Atharv Shevade**
Final-year Computer Engineering student passionate about building scalable and user-centric web applications.

---

## ⭐ Acknowledgements

Inspired by Airbnb-style booking platforms and modern full-stack web architecture.

---

Feel free to ⭐ the repository if you find this project useful!

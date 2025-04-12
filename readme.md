# CampusVote 🎓🗳️

**CampusVote** is a secure and scalable online voting system built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Designed for college elections, it ensures a transparent and seamless voting experience with real-time updates and robust admin controls.

---

## 🔑 Features

- 🔐 **Secure Voter Authentication**  
  Verifies student identity before allowing access to the voting system.

- ⚙️ **Admin Panel**  
  Admin can log in, add/remove positions and candidates dynamically, and monitor votes.

- 📊 **Real-time Result Updates**  
  Vote counts are updated live as students cast their votes.

- 🧾 **MongoDB Data Handling**  
  All data is stored and retrieved securely from MongoDB using Mongoose.

- 🧼 **Auto Cleanup**  
  When all candidates under a position are deleted, the position is automatically removed.

- 📱 **Responsive UI**  
  Fully responsive design ensures smooth experience across all devices.

- 🚫 **Session Protection**  
  Logout disables back-navigation to prevent unauthorized access.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (with Vite), Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (MongoDB Compass used for local DB)  
- **Others**: Mongoose, JWT (if used), React Router

---

## 🚀 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/campusVote.git
cd campusVote
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the `backend` folder with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the App

#### Start Backend
```bash
cd backend
npm start
```

#### Start Frontend
```bash
cd ../frontend
npm run dev
```

---

## 🧑‍💻 Admin Credentials

```
Email: ----------------
Password: *******
```

---

## 📂 Project Structure

```
campusVote/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
├── README.md
```

---

## 🙌 Acknowledgements

Special thanks to mentors, peers, and the IIIT Manipur community for their support and feedback.

---

> Made with ❤️ by Aman | [LinkedIn]([https://www.linkedin.com/](https://www.linkedin.com/in/aman931120/)) 

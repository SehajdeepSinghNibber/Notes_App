📝 Note Taking App (JWT Auth)

A secure and scalable note-taking web application that allows users to create, edit, and manage personal notes with authentication powered by JSON Web Tokens (JWT).

🚀 Features
🔐 User Signup & Login with JWT Authentication
🧾 Create, Read, Delete Notes
🛡️ Protected Routes & Authorization Middleware
🔑 Password Hashing using bcrypt
💾 Persistent Sessions with Token-Based Auth
⚡ RESTful API Architecture
🎯 Clean and User-Friendly UI
🛠️ Tech Stack

Frontend:

React / HTML / TailwindCSS / JavaScript

Backend:

Node.js
Express.js

Database:

MongoDB (Mongoose)

Authentication:

JSON Web Tokens (JWT)
bcrypt

⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/your-username/note-taking-app.git
cd note-taking-app
2. Install Dependencies
# backend
cd server
npm install

# frontend
cd ../client
npm install
3. Environment Variables

Create a .env file in the server folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4. Run the Application
# start backend
cd server
npm run dev

# start frontend
cd client
npm start
🔐 API Endpoints
Auth Routes
POST /api/auth/register → Register user
POST /api/auth/login → Login user
Notes Routes (Protected)
GET /api/notes → Get all notes
POST /api/notes → Create note
PUT /api/notes/:id → Update note
DELETE /api/notes/:id → Delete note
🔒 Authentication Flow
User logs in or registers
Server generates a JWT token
Token is sent to client
Client stores token (localStorage / cookies)
Token is sent in headers for protected requests
Middleware verifies token before granting access
📌 Future Improvements
🗂️ Categories & Tags for notes
🔍 Search & Filtering
🌙 Dark Mode
☁️ Cloud sync / backup
🧠 Rich text editor
🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

📄 License

This project is licensed under the MIT License.
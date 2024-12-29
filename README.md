This repository contains the frontend (sbb-files-main) and the backend (sbb-backend-main) of our Applied Project.

In the case of this repository breaking, those folders can be found at:
- Frontend: https://github.com/kchase9/sbb-files.git
- Backend: https://github.com/kchase9/sbb-backend.git

## Prerequisites
Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.x or later)
- [React](https://react.dev) (v16.x or later)
- [PostgreSQL](https://www.postgresql.org/) (v13.x or later)
- A terminal (Command Prompt, PowerShell, or Bash)
- A text editor/IDE like Visual Studio Code (recommended)

# Usage
<h1>Frontend</h1>
- Navigate to
``` sbb-files-main```
- Run the following commands
```bash
npm install 
npm start
```
The application should start on http:/localhost:3000. This is where most of our user interface resides

<h1>Backend</h1>
- Navigate to
```sbb-backend-main\sbb-backend```
- Create a file named `.env` in the root of the backend directory. Add the following variables:
```env
DB_USER=your_database_user     # Your PostgreSQL username
DB_HOST=localhost              # PostgreSQL is running locally
DB_NAME=your_database_name     # Name of the database to connect to
DB_PASSWORD=your_database_password # Your PostgreSQL password
DB_PORT=5432                   # Default PostgreSQL port
JWT_SECRET=your_jwt_secret     # A random secret string for JWT
EMAIL_USER=your_email@example.com  # Email address for notifications
EMAIL_PASS=your_email_password # Email password for SMTP
```
- Run the following commands
```bash
npm install 
npm start```

The backend API will run on `http://localhost:5000` by default.

#Operational Use
Clicking the power button on the right side of the primary navigation bar will automatically sign out any users and redirect you to the welcome page, for sign up and sign in purposes.
<h2>The Admin User</h2>
To test the full functionality of this project:
- Open pgAdmin
- Navigate to the users table
- Edit the "role" field of your desired record to say 'admin'
- Click the power button to reset and sign in again.

Further functionality will be displayed in our accompanying presentation.

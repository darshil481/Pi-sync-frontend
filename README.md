# PiSync Admin Dashboard - Frontend

PiSync is a lightweight service that helps PiBook and PiBox devices sync offline learning data (videos watched, notes taken, assignments completed) to the cloud when internet is available.

This dashboard allows internal team members to:
- View registered devices and their sync status
- Trigger a manual sync for a device
- View recent sync error logs

---

## 🖥️ Tech Stack

- React.js (with TypeScript)  
- Redux Toolkit  
- Axios with Interceptors  
- Tailwind CSS

---

## 🛠️ Installation & Setup

# Install dependencies
npm install

# Start frontend server
npm start


## 📄 .env Setup

Create a `.env` file in the root:

```env
REACT_APP_API_URL= http://127.0.0.1:4000

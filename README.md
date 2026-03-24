# 🚀 Local WiFi File Transfer

🌐 **Live Demo:** https://transfer-hub-f1n3.onrender.com/
⚡ Real-time file sharing across devices on the same WiFi network

---

## 📌 Overview

A real-time file sharing web application built with **Next.js, TypeScript, and Socket.io**.

This app allows multiple devices connected to the same WiFi network to instantly upload, share, and download files — without relying on any external cloud service.

---

## ✨ Features

* 🔥 Real-time file sharing using WebSockets
* 📡 Live connected device tracking
* 📂 Instant file upload and download
* 🔗 Auto-generated download links
* 📱 Cross-device support (Laptop, Mobile, Tablet)
* ⚡ No cloud or database required

---

## 🛠 Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Node.js (Custom Server)
* **Language:** TypeScript
* **Real-time:** Socket.io

---

## 🏗 Architecture

```
Device A → Upload File → Server Stores File  
        → Socket Event Emitted → Broadcast to All Devices  
        → Device B Instantly Receives File
```

* Files stored temporarily in `/public/uploads`
* Devices tracked via Socket IDs
* Real-time updates handled using Socket.io

---

## 🌐 Live Demo

| Environment      | URL                                |
| ---------------- | ---------------------------------- |
| 🚀 Production    | https://transfer-hub-f1n3.onrender.com/ |
| 💻 Local Network | http://YOUR_LOCAL_IP:3000          |

---

## ⚠️ Usage Note

This application is designed for **local network (WiFi) file transfer**.

* Devices must be connected to the **same WiFi network**
* For fastest performance, use **local IP address**
* Public deployment may have limitations for large files

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

### 4️⃣ Open in Browser

Main device:

```
http://localhost:3000
```

Other devices (same WiFi):

1. Find your local IP:

* Windows:

```bash
ipconfig
```

* Mac/Linux:

```bash
ifconfig
```

2. Open:

```
http://YOUR_LOCAL_IP:3000
```

Example:

```
http://192.168.0.5:3000
```

---

## 📂 Project Structure

```
/server.ts              → Custom Node + Socket.io server
/src/app               → Next.js App Router
/src/lib               → Utility functions
/public/uploads        → Temporary file storage
```

---

## ⚡ Important Notes

* Files stored in `/public/uploads` are **temporary**
* Data may be lost on server restart (especially in cloud deployments)
* For production use, consider:

  * Cloud storage (AWS S3, Cloudinary)
  * File cleanup mechanism

---

## 🔮 Future Improvements

* 🔐 File encryption for secure sharing
* ⏳ Auto-delete files after time limit
* 📦 Drag & drop upload UI improvements
* 🌍 Cross-network sharing support
* 📊 Transfer progress indicators

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 💡 Author

Built with ❤️ by **Your Name**

If you found this project helpful, consider giving it a ⭐ on GitHub!

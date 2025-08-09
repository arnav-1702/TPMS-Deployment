# 🌟 Talent Pool Management System (TPMS)  

![TPMS Banner](https://via.placeholder.com/1200x300.png?text=Talent+Pool+Management+System)  

---

## 📌 Overview  
**Talent Pool Management System** is a smart recruitment platform that connects **Candidates**, **Recruiters**, and an **Admin** into one ecosystem.  
The platform ensures that **companies**, **job postings**, and **candidate applications** pass through an **Admin approval workflow** for quality and authenticity before being displayed publicly.  

---

## ✨ Features  

### 👑 Admin  
✅ Secure **Admin login** (credentials from `.env`)  
✅ Approve / Reject job postings  
🚧 *(Coming soon)* Approve / Reject company registrations before they can post jobs  
🚧 *(Coming soon)* Approve / Reject candidate applications before sending to recruiters  

### 🏢 Recruiter  
✅ Register with company details  
✅ Login & post jobs *(after company approval — coming soon)*  
✅ View job posting status  

### 👨‍🎓 Candidate  
✅ Register & login  
✅ Complete profile once (upload resume, skills, education)  
✅ Apply to jobs *(Admin approval for applications — coming soon)*  
🚧 *(Coming soon)* Track application status directly from UI without multiple backend calls  

---

## 🛠 Tech Stack  
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white)  
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)  
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)  
![Express](https://img.shields.io/badge/Framework-Express.js-000000?logo=express&logoColor=white)  
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)  
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?logo=cloudinary&logoColor=white)  
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=json-web-tokens&logoColor=white)  

---

## 📂 Project Structure  
```plaintext
/frontend   → React application (UI)
/backend    → Express API & MongoDB models

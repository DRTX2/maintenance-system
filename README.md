# 📦 Inventory Management & Judicial Audit System

A comprehensive **web system designed for public institutions** to manage inventories, maintenance routines, and auditing responsibilities. Built using **RESTful services**, it integrates a secure and scalable architecture with a rich user interface.

---

## 🔍 Key Features

- ✅ **User Management**  
  Custom user roles with secure authentication via JWT.

- 📦 **Inventory & Supplies**  
  Track assets, supplies, providers, and physical locations.

- 🛠️ **Maintenance Module**  
  Register, track, and audit mandatory maintenance actions over time.

- 📄 **Auditing Reports**  
  Generate dynamic PDF reports aligned with Ecuadorian public audit regulations.

- 📊 **Performance Tracking**  
  Report on asset change history and staff efficiency/responsibility.

---

## 🛠️ Tech Stack

### 🔗 Backend
- [Laravel](https://laravel.com/) + MySQL
- JWT for authentication and access control
- Caching strategies for performance optimization
- Encryption for sensitive data

### 🎨 Frontend
- [React](https://reactjs.org/) + [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/) for API communication
- [React Router](https://reactrouter.com/) for SPA routing
- Interfaces designed in [Figma](https://figma.com)

---

## 🧪 Development Methodology

- Scrum methodology with sprint-based development and issue tracking
- RESTful API architecture (Laravel as backend service)
- UI/UX designed in Figma and translated into responsive React components

---

## 📊 Reporting Capabilities

The system includes robust reporting features designed to comply with institutional audit regulations and support data-driven decision-making:

- 🔧 Legal Compliance Tracking
Identify assets that fail to meet mandatory maintenance standards within the first three years of acquisition, as required by Ecuadorian public audit regulations.

- 📚 Asset Maintenance History
Generate detailed reports showing the entire maintenance and change history for each product or asset, including responsible parties, types of intervention, and recorded observations.

- 👨‍💼 Personnel Performance Reports
Evaluate the performance of individuals in charge of maintenance tasks through metrics like completed work, delays, and quality indicators. Helps institutions track team efficiency and accountability.

- 📑 Dynamic PDF Reports
All audit data can be exported as customized, printable PDF reports for presentation to compliance authorities or internal evaluations.

---

## 📁 Project Structure

```bash
/frontend        # React application with MUI and Axios
/backend         # Laravel API with JWT and MySQL
```
<!-- /designs         # Figma exports and documentation -->
---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 🔧 Backend (Laravel + MySQL)

1. Clone the repository and navigate to the `backend` directory:
    ```bash
    git clone https://github.com/DRTX2/maintenance-system.git
    cd backend
    ```

2. Install dependencies:

   ```bash
   composer install
   ```

3. Copy the example environment file and configure your DB credentials:

   ```bash
   cp .env.example .env
   ```

4. Generate app key:

   ```bash
   php artisan key:generate
   ```

5. Run migrations:

   ```bash
   php artisan migrate
   ```

6. Start the backend server:

   ```bash
   php artisan serve
   ```

---

### 🎨 Frontend (React + Material UI)

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the API base URL in `.env`:

   ```
   VITE_API_URL=http://localhost:8000/api
   ```

4. Start the frontend:

   ```bash
   npm run dev
   ```

---

The application should now be running on:

* **Frontend**: `http://localhost:5173`
* **Backend API**: `http://localhost:8000/api`

## 🤝 Contributions

Feel free to fork the repo, submit pull requests, or open issues. Feedback is always appreciated!

# Impact Tracker

A web-based project management and impact tracking system designed to help organizations manage projects, beneficiaries, volunteers, and project outcomes in one place.

## Overview

Impact Tracker provides a centralized platform for managing community and development projects. It allows administrators and field workers to record project information, manage beneficiaries and volunteers, monitor project progress, and generate project impact reports.

The application was developed as a full-stack project with a focus on REST APIs, relational database design, authentication, and containerized development.

## Features

* 🔐 **Authentication & Role-Based Access**

  * Secure user login
  * Admin and Field Worker roles
  * Role-based access to application features

* 📋 **Project Management**

  * Create, view, edit, and delete projects
  * Track project status and dates
  * Monitor project information

* 👥 **Beneficiary Management**

  * Register and manage beneficiaries
  * Track personal information and status
  * Search beneficiaries by name or location

* 🤝 **Volunteer Management**

  * Register and manage volunteers
  * Track skills and availability
  * Record volunteer hours

* 📊 **Impact Reports**

  * View project-level impact information
  * Summarize beneficiaries and volunteer contributions
  * Generate downloadable PDF reports

* 🗄️ **Database & API**

  * PostgreSQL relational database
  * Prisma ORM
  * RESTful backend API
  * Zod validation

* 🐳 **Docker Support**

  * Containerized frontend
  * Containerized backend
  * PostgreSQL container
  * Docker Compose orchestration
  * Persistent database storage

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui

### Backend

* Node.js
* Express
* TypeScript
* Prisma
* Zod
* JWT Authentication
* bcrypt

### Database & Infrastructure

* PostgreSQL
* Docker
* Docker Compose



## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* PostgreSQL

For the Docker setup:

* Docker Desktop

### Run with Docker

From the project root:

```bash
docker compose up --build
```

Once the containers are running, open:

```text
http://localhost:8080
```

The backend API runs on:

```text
http://localhost:3000
```

### Database

The application uses PostgreSQL with Prisma.

Database migrations are stored in:

```text
server/prisma/migrations/
```

For a fresh development database, seed the initial data with:

```bash
docker exec -it impact-server npx prisma db seed
```

## Development

The project can also be run locally without Docker by running the frontend and backend separately.

Frontend:

```bash
cd client
npm install
npm run dev
```

Backend:

```bash
cd server
npm install
npm run dev
```

Make sure the required environment variables and PostgreSQL database are configured before starting the backend.


## Project Purpose

Impact Tracker was built to explore the development of a real-world full-stack application, including:

* Full-stack application architecture
* REST API development
* Authentication and authorization
* Relational database design
* ORM usage with Prisma
* Input validation
* Frontend and backend integration
* Docker containerization
* Reporting and data export

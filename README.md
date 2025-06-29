# hahn-interview

This project consists of a Spring Boot backend and a React frontend, connected to a PostgreSQL database running in Docker.

---

## Prerequisites

- Docker (to run instances of the backend, frontend and the PostgreSQL database)
- By Default, the backend will add a user with the credentials (email : admin@admin.com , password : admin123456)
- Dummy Data in inserted upon starting the backend using a csv file in the resources directory .

---

## Setup and Run Instructions

### 1. Start All using Docker

Run this Docker command in the same directory where the docker-compose.yml file is

```bash
docker-compose up --build
```




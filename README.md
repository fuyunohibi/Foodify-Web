# Flask Recipe Application

## Overview

This is a Flask application for managing recipes. It uses SQLAlchemy for ORM and can be run using Docker.

## Prerequisites

- Python 3.x
- Docker and Docker Compose (optional but recommended for containerized setup)

## Setup Instructions

### Using Docker (Recommended)

1. **Clone the Repository**

   ```sh
   git clone https://github.com/fuyunohibi/foodify-web.git
   cd foodify-web
   ```

2. **Build and Run Containers**

    ```sh
    docker-compose up --build
    ```


Run front end
1. cd frontend
2. docker build -t nextjs:latest -f Dockerfile .
3. docker build -t nginx:latest -f nginx/Dockerfile nginx
4. docker-compose up
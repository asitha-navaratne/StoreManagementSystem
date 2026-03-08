# Store Management System Backend

## Setup

1. Add a .env file inside the frontend folder, based on the given .env.example file
2. Create a Postgres database called **StoreManagementSystem** and enter its details in the env variable DATABASE_URL
3. If not inside the frontend folder, type `cd backend`
4. Run `pip install -r requirements.txt` to install all packages
5. Run `fastapi dev main.py` to start the application
6. Open the Swagger interface at http://localhost:8000/docs

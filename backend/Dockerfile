# syntax=docker/dockerfile:1

FROM python:3.11

ENV DATABASE_URL="postgresql+psycopg2://postgres:%s@host.docker.internal:5432/StoreManagementSystem"

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
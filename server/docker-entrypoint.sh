#!/bin/sh

echo "Waiting for database..."

until npx prisma migrate deploy; do
  echo "Database not ready yet. Retrying..."
  sleep 2
done

echo "Database migrations are up to date."

echo "Starting server..."

exec npm run dev
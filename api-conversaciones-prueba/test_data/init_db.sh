#!/bin/bash

DB_NAME="conversaciones_test"

# Drop the database
echo "Dropping existing database '$DB_NAME'..."
mongosh --eval "db.getSiblingDB('$DB_NAME').dropDatabase()"
echo "Database dropped."

# Import users
echo "Importing users..."
mongoimport --db "$DB_NAME" --collection users --file users.json --jsonArray
echo "Users imported."

# Import conversations
echo "Importing conversations..."
mongoimport --db "$DB_NAME" --collection conversations --file conversations.json --jsonArray
echo "Conversations imported."
echo "All data has been imported"

# Blogify

Blogify is a full stack web application that allows users to sign up, login, read, write, edit, and delete blog posts. It provides a platform for users to share their thoughts, ideas, and stories with others.

## Features
- User Authentication: Blogify offers a secure user authentication system that allows users to sign up and log in to their accounts. It uses JWT (JSON Web Tokens) for authentication, ensuring data privacy and security.

- Post Management: Users can create, read, update, and delete their blog posts. The application provides an intuitive interface for managing posts, allowing users to easily express their thoughts and make updates when needed.

- Frontend Technologies: The frontend of Blogify is built using React, TypeScript, TailwindCSS, and ContextAPI. This combination of modern technologies provides a robust and interactive user interface.

- Backend Technologies: The backend of Blogify is developed with NestJS, a progressive Node.js framework, and MongoDB, a popular NoSQL database. NestJS enables efficient and scalable server-side development, while MongoDB stores and manages the data.

## Installation
To run Blogify locally on your machine, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/blogify.git
Navigate to the project directory:

bash
Copy code
cd blogify
Install the dependencies for the frontend:

bash
Copy code
cd frontend
npm install
Install the dependencies for the backend:

bash
Copy code
cd ../backend
npm install
Set up the environment variables:

Create a .env file in the backend directory.
Define the necessary environment variables such as database connection details, JWT secret, etc.
Start the backend server:

arduino
Copy code
npm run start:dev
Start the frontend development server:

sql
Copy code
npm start

Open your web browser and access http://localhost:3000 to view the Blogify application.




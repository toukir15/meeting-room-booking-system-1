
# MeetEase

## Introduction
Welcome to MeetEase, your go-to platform for hassle-free meeting room bookings. Whether you're hosting a corporate meeting, a brainstorming session, or a private event, MeetEase makes it easy to find and book the perfect space. With our user-friendly interface, you can explore, compare, and reserve meeting rooms tailored to your needs. Book with confidence and take the stress out of organizing your next meeting with MeetEase!
## Project Decription
### Purpose
MeetEase is a meeting room booking platform designed to simplify the process of finding and reserving meeting spaces. Our goal is to offer a seamless and efficient booking experience for professionals, businesses, and organizations needing suitable rooms for meetings or events. With a wide selection of meeting rooms across various locations, MeetEase ensures that users can quickly find the right room tailored to their specific requirements.
### Goals
1. **Comprehensive Room Listings**: Provide a diverse range of meeting rooms with detailed descriptions, availability, and high-quality images.
2. **User-Friendly Experience**: Design an intuitive interface for easy searching, filtering, and booking of meeting spaces.
3. **Efficient Booking Management:**: Offer robust admin tools for managing room availability, bookings, and cancellations.
4. **Secure Payment Processing**:  Ensure reliable and secure payment systems for hassle-free transactions.
5. **Scalability and Performance**:  Develop a scalable platform with fast load times and responsive design to ensure smooth performance across devices.

## Features

- **Room Listings**: A well-organized catalog of meeting rooms with detailed descriptions, capacity information, availability, and high-quality images.
- **Search and Filters**: Advanced search functionality with filters for location, capacity, price range, and amenities to help users quickly find the perfect room.
- **Admin Dashboard**: A comprehensive admin panel for room owners to manage room listings, including adding, editing, and removing rooms, as well as monitoring bookings.
- **Secure Booking and Payments**: A secure, streamlined booking process with reliable payment gateways and multiple payment options.
- **Responsive Design**: A fully responsive design that ensures a consistent experience across all devices, including desktops, tablets, and smartphones.

## Technology Stack

- **Frontend**:
  - HTML
  - CSS
  - Tailwind CSS
  - JavaScript
  - React
  - TypeScript
  - Redux

- **Backend**:
  - Node.js
  - Express

- **Database**:
  - MongoDB
  - Mongoose

### Installation Guideline

Follow these instructions to set up the project locally on your machine.

#### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (either local or using a cloud service like MongoDB Atlas)

#### Clone the Repository

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/toukir15/Meeting-Room-Booking-System-Part-2.git
   ```

### Install server dependencies and start the backend server

   ```bash
   cd server
   ```
   ```bash
  npm install
   ```
   ```bash
  npm run start:dev
   ```

### Install client dependencies and Start the frontend development server

   ```bash
   cd client
   ```
   ```bash
  npm install
   ```
   ```bash
  npm run dev
   ```

## Configuration

To configure the project for local development or deployment, follow these steps:

### Setting up Environment Variables

1. Create a `.env` file inside the server directory of the project if it doesn't already exist.

2. Add the necessary configuration variables to the `.env` file. Here are the variables used in our project:

   ```bash
   PORT=5000
   DATABASE_URL=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cludinay_name
   CLOUDINARY_API_KEY=your_cludinay_api_key
   CLOUDINARY_API_SECRET=your_cludinay_api_secret
   STRIPE_SECRET=your_stripe_secret
   NODE_ENV=production
   BCRYPT_SALT_ROUND=10
   SECRET_KEY=your secret_key
   CLIENT_URL=your_client_url
   STRIPE_CLI=your_stripe_cli
   STRIPE_ENDPOINT_SECRET= your_stripe_endpoint
   ```

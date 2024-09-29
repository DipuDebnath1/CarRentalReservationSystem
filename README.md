# Car Rental Reservation System Backend Server

## Live

[https://car-rental-reservation-system-server-n0ou8lzrc.vercel.app](#)

## 📋 Project Overview

This backend server for car rental business, where users can book cars and admins can manage the car inventory, bookings, and costs. The app ensures secure and efficient management through authentication, authorization, and error handling.

## Features-

#### Admin Features:

- **Car Management**: Create, update, and delete cars.
- **Booking Oversight**: View all bookings.
- **Cost Calculation**: Calculate the total rental cost based on start and end times.

#### User Features:

- **Book a Car**: Select and book a car for a specific date and time.
- **Rental History**: Access booking history to review past rentals.

#### Technology

- **TypeScript, Express.js, MongoDB, Mongoose, JWT, Zod.**

#### Installation & Setup

- **Clone the repository:** git clone https://github.com/DipuDebnath1/CarRentalReservationSystem
- **Set ".env file":**
  PORT= local host port
  DATABASE_URL= your datelbase llink
  ACCESS_TOKEN= token secret
- **npm install**
- **npm run start:dev**

## API Documentation

##### User Authentication

- Sign Up: /api/auth/signup (POST)
- Sign In: /api/auth/signin (POST)

##### Car Management

- Create Car: /api/cars (POST - Admin )
- Update Car: /api/cars/:id (PUT - Admin )
- Delete Car: /api/cars/:id (DELETE - Admin )
- Get All Cars: /api/cars (GET) ==> [ query like
  /api/bookings?carId=608a6d8d03a1b40012abcdef&date=2024-06-15 ]
- Get Car By ID: /api/cars/:id (GET)

##### Booking System

- Book a Car: /api/bookings (POST - User)
- Get All Bookings: /api/bookings (GET - Admin )
- Get My Bookings: /api/bookings/my-bookings (GET - User )
- Car Return: /api/cars/return (PUT - Admin)

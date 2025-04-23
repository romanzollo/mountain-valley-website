#### **Mountain Valley Website**

![App Preview](screenshots/screenshot-1.png)  
_Custom-built application to manage everything about the hotel: bookings, cabins, and guests._

A customer-facing website where guests can learn about the hotel, browse all cabins, and manage their profiles. This website is integrated with the internal management app through a shared Supabase database and API.

---

### **Table of Contents**

-   [Overview](#overview)
-   [Features](#features)
-   [Project Requirements](#project-requirements)
-   [Technology Stack](#technology-stack)
-   [Screenshots](#screenshots)
-   [Links](#links)

---

### **Overview**

The **Mountain Valley Website** is a public-facing platform designed for potential and actual guests of the Wild Oasis Hotel. It allows users to explore cabin options, make reservations, and manage their profiles. The website is built using Next.js and integrates with the same Supabase database and API as the internal management app, ensuring real-time data synchronization.

---

### **Features**

-   **Hotel Information**: Guests can learn all about the Wild Oasis Hotel.
-   **Cabin Exploration**: Browse all available cabins, filter by guest capacity, and view booked dates.
-   **Reservation System**: Reserve cabins for specific date ranges without online payment; payments are made upon arrival at the hotel.
-   **Profile Management**: Sign up, log in, and update profile information to streamline the check-in process.
-   **Past & Future Reservations**: View and manage all past and future bookings, including updates and cancellations.

---

### **Project Requirements**

1. **Users**:

    - Users of the app are potential guests and actual guests.
    - Guests should be able to learn all about the Wild Oasis Hotel.

2. **Cabin Information**:

    - Guests should be able to get information about each cabin and see booked dates.
    - Guests should be able to filter cabins by their maximum guest capacity.

3. **Reservations**:

    - Guests should be able to reserve a cabin for a certain date range.
    - Reservations are not paid online. Payments will be made at the property upon arrival. Therefore, new reservations should be set to "unconfirmed" (booked but not yet checked in).
    - Guests should be able to view all their past and future reservations.
    - Guests should be able to update or delete a reservation.

4. **Authentication**:

    - Guests need to sign up and log in before they can reserve a cabin and perform any operation.
    - On sign-up, each guest should get a profile in the DB.

5. **Profile Management**:
    - Guests should be able to set and update basic data about their profile to make check-in at the hotel faster.

---

### **Technology Stack**

-   **Frontend**:

    -   Framework: Next.js 14
    -   UI State Management: Context API
    -   Styling: Tailwind CSS
    -   Other Tools:
        -   @heroicons/react
        -   react-day-picker
        -   date-fns
        -   Auth.js + Middleware
        -   Server Actions (Next.js)
        -   useOptimistic Hook

-   **Backend & Database**:
    -   Built using Supabase (API and Database)

---

### **Screenshots**

![Screenshot 1](screenshots/screenshot-1.png)
![Screenshot 2](screenshots/screenshot-2.png)
![Screenshot 3](screenshots/screenshot-3.png)
![Screenshot 4](screenshots/screenshot-4.png)
![Screenshot 5](screenshots/screenshot-5.png)
![Screenshot 6](screenshots/screenshot-6.png)
![Screenshot 7](screenshots/screenshot-7.png)
![Screenshot 8](screenshots/screenshot-8.png)
![Screenshot 9](screenshots/screenshot-9.png)
![Screenshot 10](screenshots/screenshot-10.png)
![Screenshot 11](screenshots/screenshot-11.png)

---

### **Links**

-   **GitHub Repository**: [Mountain Valley Website](https://github.com/romanzollo/mountain-valley-website)
-   **Related Project**: [Mountain Valley App](https://github.com/romanzollo/mountain-valley-app) – The internal management app that shares the same Supabase database and API.

---

### **Contact**

If you have any questions or feedback, feel free to reach out!

---

### **License**

This project is licensed under the MIT License.

---

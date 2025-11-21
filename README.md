# WorkSphere - Employee Management Web Application

## Table of Contents
- [Overview](#overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Functionality](#functionality)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Overview

**WorkSphere** is a web-based application designed to manage and allocate employees across various zones within an office environment. The system allows administrators to:

- Add and manage employees
- Assign employees to specific rooms based on their role and room constraints
- Track professional experiences for each employee
- Ensure role-based access control for sensitive areas like Server Room or Archives

The interface is intuitive, responsive, and interactive, making employee management visual and easy to understand.

---

## Features

- **Employee Management**
  - Add,and delete employees
  - Assign professional experience (company, role)
  - Upload/display profile images

- **Room Management**
  - Predefined rooms: Conference, Reception, Server Room, Security, Staff, Archives
  - Room capacity constraints
  - Role-based access rules (e.g., only IT Technicians can enter Server Room)
  
- **Interactive Workspace**
  - Click-to-assign employees to rooms
  - Visual representation of employees in each room
  - Modal popups for detailed employee view

- **Validation**
  - Form validation for names, email, phone, and experience dates
  - Alert messages for invalid assignments or capacity overflow

---

## Technologies Used

- **Frontend:**
  - HTML5, CSS3, JavaScript (Vanilla JS)
  - Tailwind CSS for styling
  - Font Awesome for icons

- **Tools:**
  - Browser-based application (no backend needed)
  - Pure JavaScript for dynamic DOM manipulation

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/abderrahmane140/WorkSphere

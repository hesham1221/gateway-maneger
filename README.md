# Gateway Manager

## Overview

Gateway Manager is a monorepo project built using the NX framework, designed to manage gateways and their associated peripheral devices. The backend, powered by NestJS and MongoDB, provides a RESTful API for adding gateways, showing gateways, and managing devices associated with each gateway. The frontend, built with React, Tailwind CSS, and Tremor, provides an intuitive user interface for interacting with the system.

## Features

- **Backend**: 
  - **NestJS**: A scalable backend framework.
  - **MongoDB**: NoSQL database for data storage.
  - **Swagger**: Interactive API documentation.
  - **OpenAPI**: Type-safe API interaction via `openapi-fetch`.

- **Frontend**:
  - **React**: Library for building user interfaces.
  - **Tailwind CSS**: Utility-first CSS framework.
  - **Tremor**: UI components for data visualization and layout.

- **Monorepo Structure**:
  - Managed with NX, combining frontend and backend in a single repository for streamlined development.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hesham1221/gateway-maneger
   cd gateway-maneger
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Project

#### Backend (API)

1. Start the backend server in watch mode:

   ```bash
   npm run start:api
   ```

   The API will be accessible at `http://localhost:3000`.

2. Access the Swagger API documentation:

   ```bash
   http://localhost:3000/swagger
   ```

   All API endpoints are prefixed with `/api`.

#### Frontend (Board)

1. Start the frontend server in watch mode:

   ```bash
   npm run start:board
   ```

   The frontend will be accessible at `http://localhost:4200`.

### Building the Project

To create production builds of both the backend and frontend:

- **Build the API**:

  ```bash
  npm run build:api
  ```

- **Build the Frontend**:

  ```bash
  npm run build:board
  ```

### Type Generation

Generate types for the API using OpenAPI:

```bash
npx openapi-typescript http://localhost:3000/swagger.json -o ./apps/board/@types/api-types.d.ts
```

### Environment Setup

Ensure to configure the environment variables for the API and serve the frontend with any static site server.

### Response Structure

The API responses follow a consistent format:

```json
{
  "data": {},         // The response data
  "code": 200,        // HTTP status code
  "message": "OK"     // API message
}
```

## Documentation

The complete API documentation is available at:

```bash
http://localhost:3000/swagger
```

## Features Overview

- **Add Gateways**: Create a new gateway in the system.
- **Show Gateways**: Retrieve and display a list of all gateways.
- **Add Devices to a Gateway**: Associate devices with a specific gateway.
- **Remove Devices from a Gateway**: Disassociate devices from a gateway.
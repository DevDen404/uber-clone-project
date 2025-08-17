
# Uber Clone Backend API Documentation

This backend powers the Uber Clone project, providing RESTful and real-time APIs for user and captain authentication, ride management, and geolocation services. It is built with Node.js, Express, MongoDB, JWT, and integrates Google Maps API for location and distance calculations.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io (for real-time features)
- Google Maps API (for geolocation, address suggestions, distance/time)

## Frontend
The frontend is built with React.js and Vite, and communicates with this backend via HTTP and WebSocket APIs. See the main project README for more details.

---

# User Registration Endpoint Documentation

## Endpoint

`POST user/register`

## Description

Registers a new user in the system. This endpoint validates the input data, creates a new user, hashes the password, and returns an authentication token upon successful registration.

## Request Body

The request body must be in JSON format and include the following fields:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

- **200 OK**
  - Registration successful. Returns a JSON object with an authentication token and user data.
  - Example:
    ```
    {
      "token": "<jwt_token>",
      "result": {
        "_id": "<user_id>",
        "fullname": { "firstname": "John", "lastname": "Doe" },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - Validation failed. Returns a JSON object with an array of error messages.
  - Example:
    ```
    {
      "errors": [
        { "msg": "Invalid Email", "param": "email", ... },
        { "msg": "Password must be atleast 6 characters long", "param": "password", ... }
      ]
    }
    ```

## Notes
- All fields marked as required must be present in the request body.
- The password is securely hashed before being stored.
- The email must be unique.
- The returned token can be used for authenticated requests.

# User Login Endpoint Documentation

## Endpoint

`POST user/login`

## Description

Authenticates an existing user. This endpoint validates the input data, checks the credentials, and returns an authentication token if the login is successful.

## Request Body

The request body must be in JSON format and include the following fields:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

- **201 Created**
  - Login successful. Returns a JSON object with an authentication token and user data.
  - Example:
    ```
    {
      "token": "<jwt_token>",
      "result": {
        "_id": "<user_id>",
        "fullname": { "firstname": "John", "lastname": "Doe" },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - Validation failed. Returns a JSON object with an array of error messages.
  - Example:
    ```
    {
      "errors": [
        { "msg": "Invalid email id", "param": "email", ... },
        { "msg": "Password must be atleast 3 characters", "param": "password", ... }
      ]
    }
    ```

- **401 Unauthorized**
  - Invalid email or password. Returns a string message.
  - Example:
    ```
    "Invalid email or password"
    ```

## Notes
- Both fields are required.
- The returned token can be used for authenticated requests.

# Get User Profile Endpoint Documentation

## Endpoint

`GET user/profile`

## Description

Fetches the profile of the currently authenticated user. This endpoint requires a valid JWT token to be sent in the request (either as a cookie named `token` or in the `Authorization` header as a Bearer token).

## Authentication

- **Required**: Yes (JWT token)
- The token can be provided in:
  - Cookie: `token=<jwt_token>`
  - Header: `Authorization: Bearer <jwt_token>`

## Request

No request body is required.

## Responses

- **201 Created**
  - Returns the user's profile data.
  - Example:
    ```
    {
      "profile": {
        "_id": "<user_id>",
        "fullname": { "firstname": "John", "lastname": "Doe" },
        "email": "john.doe@example.com"
      }
    }
    ```

- **401 Unauthorized**
  - If the token is missing or invalid.
  - Example:
    ```
    "Unauthorized Login"
    ```
    or
    ```
    { "message": "Unauthorized Login" }
    ```

## Notes
- You must be logged in and provide a valid token to access this endpoint.
- The token is decoded to extract the user ID and fetch the profile from the database.

# User Logout Endpoint Documentation

## Endpoint

`GET user/logout`

## Description

Logs out the currently authenticated user. This endpoint requires a valid JWT token (provided as a cookie or in the `Authorization` header). The token is blacklisted and the authentication cookie is cleared, preventing further use of the token.

## Authentication

- **Required**: Yes (JWT token)
- The token can be provided in:
  - Cookie: `token=<jwt_token>`
  - Header: `Authorization: Bearer <jwt_token>`

## Request

No request body is required.

## Responses

- **200 OK**
  - Logout successful. The token is blacklisted and the cookie is cleared.
  - Example:
    ```
    "Logged Out"
    ```

- **401 Unauthorized**
  - If the token is missing or invalid.
  - Example:
    ```
    "Unauthorized attempt"
    ```
    or
    ```
    { "message": "Unauthorized attempt" }
    ```


## Notes
- You must be logged in and provide a valid token to access this endpoint.
- After logout, the token cannot be used for further requests (it is blacklisted for 24 hours).
- The authentication cookie is cleared on logout.

# Captain Registration Endpoint Documentation

## Endpoint

`POST /captain/register`

## Description

Registers a new captain (driver) in the system. This endpoint validates the input data, checks for duplicate email, hashes the password, and returns an authentication token and captain data upon successful registration.

## Request Body

The request body must be in JSON format and include the following fields:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "number (min 1, required)",
    "vehicleType": "string (car | bike | auto, required)"
  },
  "location": {
    "lat": "number (optional)",
    "lon": "number (optional)"
  }
}
```

### Example

```
{
  "fullname": {
    "firstname": "Alex",
    "lastname": "Smith"
  },
  "email": "alex.smith@example.com",
  "password": "strongPassword!",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  },
  "location": {
    "lat": 28.6139,
    "lon": 77.2090
  }
}
```

## Responses

- **201 Created**
  - Registration successful. Returns a JSON object with an authentication token and captain data.
  - Example:
    ```
    {
      "token": "<jwt_token>",
      "captain": {
        "_id": "<captain_id>",
        "fullname": { "firstname": "Alex", "lastname": "Smith" },
        "email": "alex.smith@example.com",
        ...
      }
    }
    ```

- **401 Unauthorized**
  - If validation fails, email is already registered, or an unknown error occurs.
  - Example (validation error):
    ```
    "Please check all fields again and enter details in required format."
    ```
  - Example (duplicate email):
    ```
    "Email already registered"
    ```
  - Example (unknown error):
    ```
    "Unknown error while registration. Please try again"
    ```

## Notes
- All required fields must be present and valid.
- The password is securely hashed before being stored.
- The email must be unique.
- The returned token can be used for authenticated requests as a captain.
- The API now returns status code 201 for success and 401 for errors.

# Captain Login Endpoint Documentation

## Endpoint

`POST /captain/login`

## Description

Authenticates an existing captain. This endpoint validates the input data, checks the credentials, and returns an authentication token if the login is successful.

## Request Body

The request body must be in JSON format and include the following fields:

```
{
  "email": "string (valid email, required)",
  "password": "string (required)"
}
```

### Example

```
{
  "email": "alex.smith@example.com",
  "password": "strongPassword!"
}
```

## Responses

- **201 Created**
  - Login successful. Returns a JSON object with an authentication token and captain data.
  - Example:
    ```
    {
      "token": "<jwt_token>",
      "captain": {
        "_id": "<captain_id>",
        "fullname": { "firstname": "Alex", "lastname": "Smith" },
        "email": "alex.smith@example.com",
        ...
      }
    }
    ```
- **401 Unauthorized**
  - If validation fails or credentials are incorrect.
  - Example:
    ```
    "Invalid email or password"
    ```

## Notes
- Both fields are required.
- The returned token can be used for authenticated requests as a captain.

# Captain Profile Endpoint Documentation

## Endpoint

`GET /captain/profile`

## Description

Fetches the profile of the currently authenticated captain. This endpoint requires a valid JWT token to be sent in the request (either as a cookie named `token` or in the `Authorization` header as a Bearer token).

## Authentication

- **Required**: Yes (JWT token)
- The token can be provided in:
  - Cookie: `token=<jwt_token>`
  - Header: `Authorization: Bearer <jwt_token>`

## Request

No request body is required.

## Responses

- **201 Created**
  - Returns the captain's profile data.
  - Example:
    ```
    {
      "captain": {
        "_id": "<captain_id>",
        "fullname": { "firstname": "Alex", "lastname": "Smith" },
        "email": "alex.smith@example.com",
        ...
      }
    }
    ```
- **401 Unauthorized**
  - If the token is missing or invalid.
  - Example:
    ```
    "Unauthorized attempt"
    ```

## Notes
- You must be logged in and provide a valid token to access this endpoint.
- The token is decoded to extract the captain ID and fetch the profile from the database.

# Captain Logout Endpoint Documentation

## Endpoint

`GET /captain/logout`

## Description

Logs out the currently authenticated captain. This endpoint requires a valid JWT token (provided as a cookie or in the `Authorization` header). The token is blacklisted and the authentication cookie is cleared, preventing further use of the token.

## Authentication

- **Required**: Yes (JWT token)
- The token can be provided in:
  - Cookie: `token=<jwt_token>`
  - Header: `Authorization: Bearer <jwt_token>`

## Request

No request body is required.

## Responses

- **201 Created**
  - Logout successful. The token is blacklisted and the cookie is cleared.
  - Example:
    ```
    "Logged Out"
    ```
- **401 Unauthorized**
  - If the token is missing or invalid.
  - Example:
    ```
    "Unauthorized attempt"
    ```

## Notes
- You must be logged in and provide a valid token to access this endpoint.
- After logout, the token cannot be used for further requests (it is blacklisted for 24 hours).
- The authentication cookie is cleared on logout.

# User Delete Endpoint Documentation

## Endpoint

`GET user/delete`

## Description

Deletes the currently authenticated user from the system. This endpoint requires a valid JWT token. The user is removed from the database, and a success or error message is returned.

## Authentication

- **Required**: Yes (JWT token)
- The token can be provided in:
  - Cookie: `token=<jwt_token>`
  - Header: `Authorization: Bearer <jwt_token>`

## Request

No request body is required.

## Responses

- **200 OK**
  - User deleted successfully.
  - Example:
    ```
    "User deleted successfully"
    ```
- **404 Not Found**
  - User not found in the database.
  - Example:
    ```
    "User not found"
    ```
- **401 Unauthorized**
  - If the token is missing or invalid.
  - Example:
    ```
    "Unauthorized attempt"
    ```

## Notes
- You must be logged in and provide a valid token to access this endpoint.
- The user is deleted based on the user ID extracted from the token.
- This action is irreversible.

# Map Endpoints Documentation

## Endpoint: `GET /map/getCoordinates`
- **Description:** Get latitude and longitude for a given address.
- **Query Parameters:**
  - `address` (string, required)
- **Authentication:** JWT required
- **Demo Request:**
  ```
  /map/getCoordinates?address=Connaught Place, Delhi
  ```
- **Demo Response (200 OK):**
  ```json
  {
    "ltd": 28.6315,
    "lng": 77.2167
  }
  ```
- **400 Bad Request:** Validation errors
- **404 Not Found:** Coordinates not found

## Endpoint: `GET /map/getDistanceTime`
- **Description:** Get distance and time between origin and destination.
- **Query Parameters:**
  - `origin` (string, required)
  - `destination` (string, required)
- **Authentication:** JWT required
- **Demo Request:**
  ```
  /map/getDistanceTime?origin=Connaught Place, Delhi&destination=India Gate, Delhi
  ```
- **Demo Response (200 OK):**
  ```json
  {
    "distance": { "text": "3.2 km", "value": 3200 },
    "duration": { "text": "10 mins", "value": 600 }
  }
  ```
- **400 Bad Request:** Validation errors
- **404 Not Found:** Route not found

## Endpoint: `GET /map/getAddressSuggestions`
- **Description:** Get address suggestions for input string.
- **Query Parameters:**
  - `input` (string, required)
- **Authentication:** JWT required
- **Demo Request:**
  ```
  /map/getAddressSuggestions?input=Connaught
  ```
- **Demo Response (200 OK):**
  ```json
  [
    "Connaught Place, Delhi",
    "Connaught Circus, Delhi"
  ]
  ```
- **400 Bad Request:** Validation errors

# Ride Endpoints Documentation

## Endpoint: `GET /ride/createRide`
- **Description:** Create a new ride for a user.
- **Body Parameters:**
  ```json
  {
    "origin": "Connaught Place, Delhi",
    "destination": "India Gate, Delhi",
    "vehicleType": "car"
  }
  ```
- **Authentication:** JWT required
- **Demo Response (201 Created):**
  ```json
  {
    "_id": "60f7c2b8e1b1c8a1d4e8b123",
    "userId": "60f7c2b8e1b1c8a1d4e8b111",
    "origin": "Connaught Place, Delhi",
    "destination": "India Gate, Delhi",
    "fare": 120,
    "status": "pending",
    "otp":"3434"
  }
  ```
- **400 Bad Request:** Validation errors
- **500 Internal Server Error:** Creation failed

## Ride Model Fields
- `userId` (ObjectId, required)
- `captain` (ObjectId)
- `origin` (string, required)
- `destination` (string, required)
- `fare` (number, required)
- `status` (string, enum)
- `duration` (number)
- `distance` (number)
- `paymentId`, `orderId`, `signature` (string)

## Notes
- All endpoints require JWT authentication.
- Validation errors return status 400 with details.
- Ride creation calculates fare using distance and duration from mapService.
- See respective controllers/services for more details on business logic.

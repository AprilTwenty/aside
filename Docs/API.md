# Aside API

Base URL

```
http://localhost:4000
```

---

# Authentication

## Register

### POST /auth/register

Request

```json
{
  "email": "test@test.com",
  "password": "12345678",
  "display_name": "test user"
}
```

Response 201

```json
{
  "success": true,
  "message": "Register successful"
}
```

---

## Login

### POST /auth/login

Request

```json
{
  "email": "test@test.com",
  "password": "12345678"
}
```

Response 200

```json
{
  "success": true,
  "token": "jwt_token"
}
```

Response 401

```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

---

## Me

### GET /auth/me

Headers

```text
Authorization: Bearer <token>
```

Response 200

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "test@test.com",
    "display_name": "test user"
  }
}
```

# Saves

## GET /saves

Query Parameters

| Name  | Type   | Required | Description |
|---------|---------|---------|---------|
| page | number | No | Page number |
| limit | number | No | Items per page |
| title | string | No | Search title |
| sort | string | No | title, created_at, source_domain |
| order | string | No | asc, desc |

Example

```http
GET /saves?page=1&limit=20&sort=created_at&order=desc

```
Response 200

```json
{
  "success": true,
  "data": [
    {
      "id": 10,
      "user": "test user",
      "title": "test patch",
      "url": "https://youtube.com/watch?v=123",
      "note": null,
      "source_domain": "youtube.com",
      "created_at": "2026-06-12T10:50:05.314Z",
      "updated_at": "2026-06-12T10:50:56.367Z"
    },
    {
      "id": 9,
      "user": "test user",
      "title": "Google",
      "url": "https://www.google.com/search?q=test",
      "note": null,
      "source_domain": "google.com",
      "created_at": "2026-06-12T10:49:55.991Z",
      "updated_at": "2026-06-12T10:49:55.991Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 2,
    "totalPages": 1
  }
}
```
Response 400

```json

{
  "success": false,
  "message": "Invalid sort field"
}

```

## GET /saves/:id

---

Response 200

```json
{
  "success": true,
  "data": {
    "id": 1,
    "user": "test user",
    "title": "New Title",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "note": "",
    "source_domain": null,
    "created_at": "2026-06-06T11:52:40.467Z",
    "updated_at": "2026-06-09T10:27:00.452Z"
  }
}

```

Response 404

```json
{
  "success": false,
  "message": "Save item not found"
}

```
## POST /saves

🔒 Authentication Required

Headers

```text
Authorization: Bearer <token>
```

Request

```json
{
  "title": "youtube",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "note": "optional"
}
```
Response 201

```json
{
  "success": true,
  "message": "Created post successfully",
  "data": {
    "id": 11,
    "user_id": 2,
    "title": "Google",
    "url": "https://www.google.com/search?q=test",
    "note": null,
    "source_domain": "google.com",
    "created_at": "2026-06-12T11:34:14.135Z",
    "updated_at": "2026-06-12T11:34:14.135Z"
  }
}

```

## PATCH /saves/:id

🔒 Authentication Required

Headers

```text
Authorization: Bearer <token>
```

Request

```json
{
    "title": "test patch",
    "url": "https://youtube.com/watch?v=123"
}
```
Response 200

```json
{
  "success": true,
  "data": {
    "id": 12,
    "user": "Test User",
    "title": "test patch",
    "url": "https://youtube.com/watch?v=123",
    "note": null,
    "source_domain": "youtube.com",
    "created_at": "2026-06-12T11:42:28.268Z",
    "updated_at": "2026-06-12T11:42:35.728Z"
  }
}

```
Response 400

```json
{
  "success": false,
  "message": "At least one field is required"
}

```
Response 400

```json
{
  "success": false,
  "message": "At least one field is required"
}

```

Response 403

```json
{
  "success": false,
  "message": "Forbidden"
}

```
## DELETE /saves/:id

🔒 Authentication Required

Headers

```text
Authorization: Bearer <token>
```
Response 200

```json
{
  "success": true,
  "message": "Save deleted successfully"
}

```
Response 401

```json
{
  "success": false,
  "message": "Unauthorized"
}

```
# MangaHub API contract

This contract describes the endpoints consumed by the frontend services in
`src/services`. The API base URL is configured with
`NEXT_PUBLIC_API_BASE_URL`; all paths below are relative to that base URL.

## Conventions

### Authentication

Authenticated endpoints require:

```http
Authorization: Bearer <access-token>
Accept: application/json
Content-Type: application/json
```

The current frontend API client does not yet attach the bearer token. The
backend should still implement authentication on the endpoints marked
**Required** so the frontend can add the token without changing the contract.
`GET /api/manga` and `GET /api/manga/featured` are public.

### Common errors

Every error response uses this shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid parameters.",
    "details": [
      {
        "field": "page",
        "message": "Must be greater than or equal to 1."
      }
    ],
    "requestId": "req_01J..."
  }
}
```

`details` is optional. `requestId` should be included in production to
correlate client errors with server logs.

Common status codes:

| Status | Meaning |
| --- | --- |
| `400` | Invalid query or JSON body |
| `401` | Missing or invalid access token |
| `403` | Authenticated user is not allowed to access the resource |
| `404` | Resource does not exist |
| `409` | Request conflicts with current state |
| `422` | Semantically invalid input |
| `500` | Unexpected server error |

### Shared data models

The JSON field names below match the TypeScript models used by the frontend.

```json
{
  "id": "manga_01J...",
  "title": "Eclipse City",
  "description": "In a city where the sun never rises...",
  "genres": ["Sci-Fi", "Mystery"],
  "totalChapters": 42,
  "coverUrl": "https://cdn.example.com/manga/eclipse-city/cover.webp",
  "rating": 9.1
}
```

`rating` is optional and must be a number from `0` to `10`. `description` is
optional. `coverUrl` should be an absolute HTTPS URL served by object storage
or a CDN.

```json
{
  "mangaId": "manga_01J...",
  "currentChapter": 12,
  "currentPage": 8,
  "progressPercent": 54,
  "lastReadAt": "2026-10-23T16:42:00.000Z"
}
```

`progressPercent` is calculated from the user's position and should be
clamped to `0..100`. Timestamps are ISO-8601 UTC strings.

## Endpoints

## 1. Get featured manga

```http
GET /api/manga/featured
```

Authentication: **Public**.

### Request

No path, query, or body parameters.

### `200 OK`

Returns one manga object:

```json
{
  "id": "manga_eclipse_city",
  "title": "Eclipse City",
  "description": "In a city where the sun never rises, a detective uncovers a conspiracy.",
  "genres": ["Sci-Fi", "Mystery"],
  "totalChapters": 42,
  "coverUrl": "https://cdn.example.com/manga/eclipse-city/cover.webp",
  "rating": 9.1
}
```

If no manga is configured as featured, return `404` with code
`FEATURED_MANGA_NOT_FOUND`. Do not return a fake or empty success object.

## 2. Search and browse manga

```http
GET /api/manga
```

Authentication: **Public**.

### Query parameters

| Parameter | Type | Default | Rules |
| --- | --- | --- | --- |
| `search` | string | empty | Case-insensitive title search; trim whitespace |
| `genre` | string | omitted | Exact genre slug or name |
| `status` | string | omitted | `ongoing`, `completed`, `hiatus`, or `cancelled` |
| `sort` | string | `popular` | `popular`, `rating`, `newest`, or `updated` |
| `page` | integer | `1` | Minimum `1` |
| `limit` | integer | `20` | Range `1..50` |

Example:

```http
GET /api/manga?search=city&genre=mystery&sort=popular&page=1&limit=20
```

### `200 OK`

```json
{
  "items": [
    {
      "id": "manga_eclipse_city",
      "title": "Eclipse City",
      "description": "In a city where the sun never rises...",
      "genres": ["Sci-Fi", "Mystery"],
      "totalChapters": 42,
      "coverUrl": "https://cdn.example.com/manga/eclipse-city/cover.webp",
      "rating": 9.1
    }
  ],
  "page": 1,
  "limit": 20,
  "total": 1,
  "totalPages": 1
}
```

An empty search is still a successful response with `"items": []`, not `404`.

## 3. Get continue-reading list

```http
GET /api/reading-progress/continue
```

Authentication: **Required**.

### Request

No query or body. The user is identified from the bearer token. Return at most
six items, ordered by `lastReadAt DESC`.

### `200 OK`

Returns an array because the frontend maps directly over the result:

```json
[
  {
    "id": "manga_eclipse_city",
    "title": "Eclipse City",
    "description": "In a city where the sun never rises...",
    "genres": ["Sci-Fi", "Mystery"],
    "totalChapters": 42,
    "coverUrl": "https://cdn.example.com/manga/eclipse-city/cover.webp",
    "rating": 9.1,
    "status": "reading",
    "progress": {
      "mangaId": "manga_eclipse_city",
      "currentChapter": 12,
      "currentPage": 8,
      "progressPercent": 54,
      "lastReadAt": "2026-10-23T16:42:00.000Z"
    }
  }
]
```

If the user has no in-progress titles, return `200` with `[]`.

## 4. Get reading activity

```http
GET /api/reading-activity
```

Authentication: **Required**.

### Request

No query or body. The activity window is the current user's local week,
resolved by the backend from the user's timezone preference. If no timezone is
stored, use UTC.

### `200 OK`

```json
{
  "streakDays": 12,
  "chaptersThisWeek": 4,
  "readingTimeMinutes": 150,
  "completedThisMonth": 2
}
```

Use `0` for valid counters with no activity. Do not use `null` for counters.

## 5. Get the user's library

```http
GET /api/library
```

Authentication: **Required**.

### Query parameters

| Parameter | Type | Default | Rules |
| --- | --- | --- | --- |
| `search` | string | empty | Case-insensitive title search |
| `status` | string | omitted | `reading`, `completed`, `plan_to_read`, `on_hold`, or `dropped` |
| `page` | integer | `1` | Minimum `1` |
| `limit` | integer | `50` | Range `1..100` |

The current frontend sends `search`; the remaining parameters are reserved for
library filters and should be supported by the backend.

### `200 OK`

```json
{
  "items": [
    {
      "id": "manga_eclipse_city",
      "title": "Eclipse City",
      "description": "In a city where the sun never rises...",
      "genres": ["Sci-Fi", "Mystery"],
      "totalChapters": 42,
      "coverUrl": "https://cdn.example.com/manga/eclipse-city/cover.webp",
      "rating": 9.1,
      "status": "reading",
      "progress": {
        "mangaId": "manga_eclipse_city",
        "currentChapter": 12,
        "currentPage": 8,
        "progressPercent": 54,
        "lastReadAt": "2026-10-23T16:42:00.000Z"
      }
    }
  ],
  "total": 1,
  "stats": {
    "titles": 24,
    "reading": 8,
    "completed": 11,
    "planToRead": 5
  }
}
```

`stats` describes the complete library, not only the filtered page. `total`
also describes the filtered result set.

## 6. Update reading progress

```http
PUT /api/reading-progress
```

Authentication: **Required**.

### Request headers

```http
Content-Type: application/json
Idempotency-Key: <unique-client-operation-id>
```

The idempotency key is recommended when progress is autosaved, so retries do
not create duplicate activity records.

### Request body

```json
{
  "mangaId": "manga_eclipse_city",
  "currentChapter": 12,
  "currentPage": 8,
  "progressPercent": 54
}
```

Validation:

| Field | Type | Rules |
| --- | --- | --- |
| `mangaId` | string | Required; existing manga ID |
| `currentChapter` | integer | Required; `>= 1` and `<= totalChapters` |
| `currentPage` | integer | Required; `>= 1` |
| `progressPercent` | number | Required; range `0..100` |

The backend must derive `lastReadAt` from server time and must not trust a
client-supplied timestamp. It should upsert the user's progress and append a
reading activity event in one transaction.

### `200 OK`

```json
{
  "mangaId": "manga_eclipse_city",
  "currentChapter": 12,
  "currentPage": 8,
  "progressPercent": 54,
  "lastReadAt": "2026-10-24T00:44:00.000Z"
}
```

Return `404` with `MANGA_NOT_FOUND` when `mangaId` does not exist and `422`
with `INVALID_READING_POSITION` when the chapter or page is invalid.

## Error examples

### `401 Unauthorized`

```json
{
  "error": {
    "code": "UNAUTHENTICATED",
    "message": "A valid access token is required."
  }
}
```

### `422 Unprocessable Entity`

```json
{
  "error": {
    "code": "INVALID_READING_POSITION",
    "message": "currentChapter must not exceed the manga chapter count.",
    "details": [
      {
        "field": "currentChapter",
        "message": "Expected a value from 1 to 42."
      }
    ]
  }
}
```

## Backend implementation notes

- Use PostgreSQL transactions for progress upserts and activity inserts.
- Return stable IDs; the frontend uses `id` as the React key.
- Keep database column names snake_case, but serialize API fields as the
  camelCase names defined above.
- Store manga images in object storage/CDN and persist only the canonical URL.
- Use UTC timestamps in storage and responses.
- Enable CORS for the Vercel frontend origin and local development origin.
- Configure cache headers for public manga endpoints; do not cache
  user-specific endpoints publicly.

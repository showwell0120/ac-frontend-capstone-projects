# Backend README

## Running the Server Locally

1. Make sure MySQL is installed.
2. Make a copy of `.env.example` to `.env`, eg. `cp .env.example .env`
3. Update the contents of `.env` with the necessary environment variables

## Running Tests

Integration tests only - MySQL is required to run the tests.

You can use `dotenv -e .env.test` to configure dotenv to use a different env
file for running tests locally.

For example:

```
# Only needed for the first time to migrate the DB schema
dotenv -e .env.test npm run migratetest

dotenv -e .env.test npm run test
```


# DB Schema
## User Model
| 屬性 | 描述 | 必填 | 預設值 | 資料型別 |
| --- | --- | --- | --- | --- |
| `id` | 使用者在 Spotify 上的 ID | yes | no | string |
| `createdAt` | 使用者註冊時間 | 系統自動生成 | 當下時間戳記 | Date |


## UserFavorite
| 屬性 | 描述 | 必填 | 預設值 | 資料型別 |
| --- | --- | --- | --- | --- |
| `userId` | 使用者在 Spotify 上的 ID, Foreign Key | yes | no | string |
| `episodeId` | 使用者收藏的 Episode IDs | yes | no | string |
| `createdAt` | 建立分類的時間 | 系統自動生成 | 當下時間戳記 | Date |	

## Category Model
| 屬性 | 描述 | 必填 | 預設值 | 資料型別 |
| --- | --- | --- | --- | --- |
| `id` | 分類 ID | yes | no | string |
| `userId` | 使用者在 Spotify 上的 ID, Foreign Key | yes | no | string |
| `name` | 分類的名稱 | yes | no | string |
| `createdAt` | 建立分類的時間 | 系統自動生成 | 當下時間戳記 | Date |	

## CategoryShow Model
| 屬性 | 描述 | 必填 | 預設值 | 資料型別 |
| --- | --- | --- | --- | --- |
| `userId` | 使用者在 Spotify 上的 ID, Foreign Key | yes | no | string |
| `categoryId` | 使用者的分類 ID, Foreign Key | yes | no | string |
| `showID` | 儲存的 show ID | yes | no | string |
| `createdAt` | 新增 show 到分類的時間 | 系統自動生成 | 當下時間戳記 | Date |	


# API


## Introduction

To use this API, you need to first obtain an Access Token from Spotify, and use
the Spotify Access Token to create an account.

Steps:
- Complete [Spotify's tutorial][1] to obtain a Spotify access token
- Create a user account by sending in your Spotify access token - see [建立使用者資料](### 2. `POST` 建立使用者資料 － `/api/users`)
- You will receive another token back from this API service, keep this token for future use

### Types of Access Tokens
- **Spotify access token**: used to access Spotify's API
- **API access token**: used to access this API service to access your categories, favorites, and shows


## User
### 1. `GET` 取得使用者資料 － `/api/me`

Header
```
{
    Authorization: Bearer <Token>
}
```

有資料的 Response
```
{
    id: string,
    favoriteEpisodeIds: string[]
}
```

Error Responses
- HTTP 403: Invalid token / Token does not belong to user
- HTTP 404: User not found

### 2. `POST` 建立使用者資料 / 取得新的 API Access Token － `/api/users`

Use this to create an account on this API service using your Spotify Access
Token, or to get a new API Access Token. You will receive an API token to use
this API service.

body
```
{
    spotifyToken: string, 
}
```

`spotifyToken`: The access token you received from Spotify

成功的 Response
```
{
    id: string,
    favoriteEpisodeIds: string[],
    apiToken: string
}
```

`apiToken` is the token you need to access this API service.
You need to keep your Spotify access token to use Spotify's APIs.


Error Responses
- HTTP 403: Invalid Spotify Access Token

### 3. `POST` 新增收藏的 episode － `/api/episodes`

Header
```
{
    Authorization: Bearer <Token>
}
```

body
```
{
    episodeId: string
}
```
成功的 Response
```
{
    success: true
}
```

Error Responses
- HTTP 403: Invalid token / Token does not belong to user
- HTTP 409: User has already favorited this episode

### 4. `DELETE` 移除收藏的 episode － `/api/episodes/<episodeId>`

Header
```
{
    Authorization: Bearer <Token>
}
```

body
```
{}
```
成功的 Response
```
{
    success: true
}
```

Error Responses
- HTTP 403: Invalid token / Token does not belong to user
- HTTP 404: Episode is not liked by the user


## Category
### 5. `GET` 取得分類資料 － `/api/categories`

Header
```
{
    Authorization: Bearer <Token>
}
```

有資料的 Response
```
{
    categories:  [
        {
            id: string,
            name: string,
            savedShows: string[]
        },
        ...
    ]
}
```

沒資料的 Response
```
{
    categories: []
}
```

Error Responses
- HTTP 403: Invalid token / Token does not belong to user


### 6. `POST` 新增分類 － `/api/categories`

Header
```
{
    Authorization: Bearer <Token>
}
```

body
```
{
    name: string, 
}
```
成功的 Response
```
{
    success: true
}
```

Error Responses
- HTTP 403: Invalid token / Token does not belong to user
- HTTP 409: Category with the same name already exists


### 7. `PUT` 更新分類名稱 － `/api/categories/<categoryId>`

Header
```
{
    Authorization: Bearer <Token>
}
```

body
```
{
    name: string, 
}
```
成功的 Response
```
{
    success: true
}
```

Error Responses
- HTTP 403: Invalid token / Token does not belong to user
- HTTP 404: Category with this ID cannot be found
- HTTP 409: Category with the same name already exists

### 8. `DELETE` 移除分類 － `/api/categories/<categoryId>`

Header
```
{
    Authorization: Bearer <Token>
}
```

成功的 Response
```
{
    success: true
}
```

Error Responses
- HTTP 403: Invalid token / Token / Category does not belong to user
- HTTP 404: Category with this ID cannot be found

### 9. `POST` 在分類下新增 show － `/api/categories/<categoryId>/shows`

Header
```
{
    Authorization: Bearer <Token>
}
```

body
```
{
    showId: string, 
}


成功的 Response
```
{
    success: true
}
```

Error Responses
- HTTP 403: Invalid token / Token does not belong to user
- HTTP 404: Category with this ID cannot be found
- HTTP 409: Show has already been added to this category


### 10. `DELETE` 在分類下移除 show － `/api/categories/<categoryId>/shows/<showId>`

Header
```
{
    Authorization: Bearer <Token>
}
```

成功的 Response
```
{
    success: true
}
```

Error Responses
- HTTP 403: Invalid token / Token does not belong to user
- HTTP 404: Category or Show with this ID cannot be found


[1]: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile

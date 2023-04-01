# DB Schema
## User Model
| 屬性 | 描述 | 必填 | 預設值 | 資料型別 |   
| --- | --- | --- | --- | --- |     
| `id` | 使用者在 Spotify 上的 ID | yes | no | string |     
| `createdAt` | 使用者註冊時間 | 系統自動生成 | 當下時間戳記	 | Date |	   

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
| `showId` | 儲存的 show IDs | yes | no | string |   
| `createdAt` | 建立分類的時間 | 系統自動生成 | 當下時間戳記 | Date |	


# API

## User
### 1. `GET` 取得使用者資料 － `/api/users/<userId>`

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
    savedEpisodes: string[]
}
```

Error Responses
- HTTP 403: Invalid token / Token does not belong to user
- HTTP 404: User not found

### 2. `POST` 建立使用者資料 － `/api/users`

body
```
{
    id: string, 
}
```

成功的 Response
```
{
    id: string,
    favoriteEpisodeIds: string[],
    token: string
}
```

Error Responses
- HTTP 403: Invalid token / Token does not belong to user
- HTTP 409: User with id already exists

### 3. `POST` 新增收藏的 episode － `/api/users/<userId>/episodes`

Header
```
{
    Authorization: Bearer <Token>
}
```

body
```
{
    id: string
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

### 4. `DELETE` 移除收藏的 episode － `/api/users/<userId>/episodes/<episodeId>`

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
### 5. `GET` 取得分類資料 － `/api/<userId>/categories`

Header
```
{
    Authorization: Bearer <Token>
}
```

有資料的 Response
```
[
    {
        id: string,
        name: string,
        savedShows: string[]
    }
]
```

沒資料的 Response
```
[]
```

Error Responses
- HTTP 403: Invalid token / Token does not belong to user


### 6. `POST` 新增分類 － `/api/<userId>/categories`

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


### 7. `PUT` 更新分類名稱 － `/api/<userId>/categories/<categoryId>`

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


### 8. `DELETE` 移除分類 － `/api/<userId>/categories/<categoryId>`

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
- HTTP 404: Category with this ID cannot be found

### 9. `POST` 在分類下新增 show － `/api/<userId>/categories/<categoryId>/shows`

Header
```
{
    Authorization: Bearer <Token>
}
```

body
```
{
    id: string
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
- HTTP 409: Show has already been added to this category


### 10. `DELETE` 在分類下移除 show － `/api/<userId>/categories/<categoryId>/shows/<showId>`

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
- HTTP 404: Category or Show with this ID cannot be found
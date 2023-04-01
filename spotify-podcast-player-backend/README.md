# DB Schema
## User Model
| 屬性 | 描述 | 必填 | 預設值 | 資料型別 |   
| --- | --- | --- | --- | --- |     
| `id` | 使用者在 Spotify 上的 ID | yes | no | string |     
| `createdAt` | 使用者註冊時間 | 系統自動生成 | 當下時間戳記	 | Date |	   

## UserFavorite
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
| `userId` | 使用者在 Spotify 上的 ID, Foreign Key | yes | no | string |
| `categoryId` | 使用者的分類 ID, Foreign Key | yes | no | string |
| `showId` | 儲存的 show IDs | yes | no | string |   
| `createdAt` | 建立分類的時間 | 系統自動生成 | 當下時間戳記 | Date |	


# API

## User
### 1. `GET` 取得使用者資料 － `/api/user/<userId>`

有資料的 Response
```
{
    id: string,
    savedEpisodes: string[],
}
```

沒資料的 Response
```
{}
```

### 2. `POST` 建立使用者資料 － `/api/user`

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
    savedEpisodes: string[],
}
```

### 3. `POST` 新增收藏的 episode － `/api/user/<userId>/collection`

body
```
{
    id: string, 
}
```
成功的 Response
```
true
```

### 4. `DELETE` 移除收藏的 episode － `/api/users/<userId>/collection`

body
```
{
    id: string, 
}
```
成功的 Response
```
true
```

## Category
### 5. `GET` 取得分類資料 － `/api/categories/<userId>`

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

### 6. `POST` 新增分類 － `/api/categories/<userId>`

body
```
{
    name: string, 
}
```
成功的 Response
```
true
```

### 7. `PUT` 更新分類名稱 － `/api/categories/<userId>/<categoryId>`

body
```
{
    name: string, 
}
```
成功的 Response
```
true
```

### 8. `POST` 在分類下新增 show － `/api/categories/<userId>/<categoryId>`

body
```
{
    id: string, 
}
```
成功的 Response
```
true
```

### 9. `DELETE` 在分類下移除 show － `/api/categories/<userId>/<categoryId>`

body
```
{
    id: string, 
}
```
成功的 Response
```
true
```



# Restaurant Finder API

API to perform CRUD operation and to find the nearest list of restaurants of the users current location 




## Tech Stack

**Client:** POSTMAN

**Server:** Node, Express and MongoDB Atlas


## Installation

DockerHub image 
```bash
     https://hub.docker.com/r/thattallman/restaurant_finder  
```
 Using Docker (RUN following commands)

```bash
     docker pull thattallman/restaurant_finder
     docker run -p 8000:8000   thattallman/restaurant_finder
```
Running on the system 
```bash
   npm install 
   npm run start
```
    
## Environment Variables

Docker image is already configured  with  the mongoDB cluster  but 
to run this project locally , you will need to add the following environment variables to your .env file



`PORT`

`MONGO_URL`

`SECRET`


## System Architecture 

 ![Image 21-04-24 at 5 32 PM](https://github.com/thattallman/restaurant_finder/assets/82497615/69cc0a77-db9e-4f0d-853b-7b8301e9563c)


## API Reference

#### Register the user 

```http
  POST /api/user/register
```

  ![Image 21-04-24 at 5 45 PM](https://github.com/thattallman/restaurant_finder/assets/82497615/59400e1b-c2c9-44be-aa26-70d53739b2d3)


#### Authenitcate the user 

```http
  POST /api/user/login
```
![Image 21-04-24 at 5 45 PM](https://github.com/thattallman/restaurant_finder/assets/82497615/dc2adb2e-f771-474f-b1c7-b3dfe5d0b5a0)



#### Add restaurant

```http
  POST /api/secured/add
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. JWT token in the Headers  |

![Image 21-04-24 at 5 46 PM](https://github.com/thattallman/restaurant_finder/assets/82497615/57898dfb-1455-427f-b3e0-e7124ca8d805)

![Image 21-04-24 at 5 46 PM (1)](https://github.com/thattallman/restaurant_finder/assets/82497615/a6f77279-a695-4251-ba0f-094f0491598b)



#### GET restaurant

```http
  GET /api/secured/get
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. JWT token in the Headers  |

![Image 21-04-24 at 5 51 PM](https://github.com/thattallman/restaurant_finder/assets/82497615/64a6f4ca-1843-445e-a02f-597ee8db57d1)



#### Delete  restaurant

```http
  DELETE /api/secured/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. JWT token in the Headers  |

![Image 21-04-24 at 5 51 PM (1)](https://github.com/thattallman/restaurant_finder/assets/82497615/dc096bf8-0762-417a-9181-de20ebc55291)


#### Update  restaurant

```http
  PUT /api/secured/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. JWT token in the Headers  |

![Image 21-04-24 at 5 51 PM (2)](https://github.com/thattallman/restaurant_finder/assets/82497615/112010b6-7062-4299-937f-c355f74ab599)


#### Finding restaurant within the radius 

```http
  POST /api/secured/within
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. JWT token in the Headers  |


![Image 21-04-24 at 5 57 PM](https://github.com/thattallman/restaurant_finder/assets/82497615/7358502b-1b64-4e50-b84c-ede9123217c2)

![Image 21-04-24 at 5 57 PM (1)](https://github.com/thattallman/restaurant_finder/assets/82497615/52187c10-05bd-4a40-936b-9bf4351be1cc)
#### Finding restaurant within the range

```http
  POST /api/secured/range
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. JWT token in the Headers  |

![Image 21-04-24 at 5 58 PM](https://github.com/thattallman/restaurant_finder/assets/82497615/391ce8ab-422a-4fce-b60d-73c4e3b82b2e)

![Image 21-04-24 at 5 58 PM (1)](https://github.com/thattallman/restaurant_finder/assets/82497615/f9b6b735-9555-4253-825d-15543cbcd57c)





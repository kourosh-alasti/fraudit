# FrauditAPI Documentation

## Version 0.1.05

### Models

#### Comment Model

- content : String
- fraudit_id : String
- user_id : String

#### Course Model

- name : String
- number : String
- abbreviation : String

#### Fraudit Model

- title : String
- description : String
- slug : String
- owner_id : String
- member_count : Number

#### Member Model

- fraudit_id : String
- user_id : String
- permission_lvl : String

#### Professor Model

- name : String
- email : String
- overallRating : Number

#### Thread Model

- user_id : String
- fraudit_id : String
- content : String
- title : String

#### University Model

- name : String
- abbreviation : String
- overallRating : Number
- address : Object {
  - street : String
  - city : String
  - state : String
  - zipCode : String
  - }

#### User Model

- first_name : String
- last_name : String
- username : String
- email : String
- password : String
- profile_picture : String
- isAdmin : Boolean

### Routes

#### Auth Routes (/api/auth)

- POST /login _working_
- POST /register _working_
- POST /request-reset _working_
- POST /password-reset _working_
- GET /logout _working_

#### Course Routes (/api/course)

- /update/:courseId (IP)
- /delete/:courseId (IP)
- /getcourses (IP)
- /:courseId (IP)

#### Fraudit Routes (/api/fraudit)

- /create (IP)
- /delete/:frauditId (IP)
- Thread Routes (/api/thread)
- /create (IP)
- /:threadId (IP)
- /delete/:threadId (IP)
- /update/:threadId (IP)

#### Thread Routes (/api/threads)

- POST /
- GET /
- GET /:threadId
- DELETE /:threadId
- PATCH /:threadId

#### User Routes (/api/user)

- PATCH /:userId _working_
- PATCH /admin/:userId _working_
- DELETE /:userId _working_
- GET / _working_
- GET /:userId _working_

_More Coming_

### Middlewares

#### Auth Middlewares

- verifyToken
- verifyIsAdmin

### Utils

#### Loggers

- consoler
  - Custom Console Logger
- logger
  - Custom Execution Logs

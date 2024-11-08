# API Configurations

### Technology
- Language: Python
- Framework: Flask
- Database: MYSQL
- ORM: SQLAlchemy


### Response Format
JSON response

### API Start
```flask --app app run```

```http://localhost:5000/```

### Routes

#### Register
```/register```
* Response: 
    - {user: user JSON object, message: 'User created successfully!'} status code: 201 on success
    - { message: 'user already exists!'} status code: 400
    - {message: 'Missing Required fields'} status code: 400


#### Login
```/login```
* Response:
    - {id: userid, name: user full name, email: user email, message: user logged in successfully} status code: 200 on success
    - {message: missing input for email or password} status code: 400
    - {message: incorrect email! user does not exist}
    - {message: invalid password}


#### Logout
``/logout``
* Response:
    - {message: user logged out successfully} status coode: 200 on success
# REST-API

## This Week's brief was:
### Create two middleware functions that deal with password hashing & Create middleware that creates tokens and
another that decodes tokens.

- Use the BcryptJS npm package `npm i bcryptjs`
- One middleware should hash the password before it is stored in the database on user creation
- The second middleware should decrypt the hashed password on a login route
- Test these routes with Thunder Client/Insomnia/Postman[^1]
- **_Stretch Goal = Create middleware that checks if a email is structured like an actual email (name@domain.com)_**

**Below is a list of commands to properly use this repository**

### NPM Commands 
> - `npm init -y`
> - `npm i express mongoose jsonwebtoken dotenv cors bcryptjs`

## Thunder Client Route Commands
Check the URL is set to `http://localhost:5001/`
Append the following for different results
> `POST` - Adds a new user
> > `{"username": "", "password": "", "email": ""}` 
>
> `POST` - Logs a user in
> > `{"username": "", "password": ""}`
>
> `DELETE` - Deletes a user 
> > `{"username": ""}`
>
> `PUT` - Searches for user by username and updates password [^2]
> > `{username": "", "password": ""} `

[^1]: *I used Thunder Client as it is intergrated in visual studio code*
[^2]: *Still a work in progress*

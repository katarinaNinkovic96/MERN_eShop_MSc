import jwt from 'jsonwebtoken'

//we take user ID because thats what we want to add as the payload in this token
const generateToken = (id) => {

    //we return jwt.sign and payload is going to be an object with the ID and the second argument is the secret 
        //which put in .env and third argument of options - put in here is expiresIn and can set the token to expire
        //we use 30d which means 30 days

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken
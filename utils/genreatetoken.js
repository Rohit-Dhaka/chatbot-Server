import jwt from 'jsonwebtoken'

const genreatetoken = (id) =>{
    return  jwt.sign({name:id} ,  process.env.JWT_SECRET , {expiresIn:"7d"})
}
export default genreatetoken
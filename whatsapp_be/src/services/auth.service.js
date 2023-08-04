import createHttpError from 'http-errors'
import validator from 'validator'
import { UserModel } from '../models/index.js'
import bcrypt from 'bcrypt'

//env variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env


export const createUser = async (userData) => {
    const { name, email, picture, status, password } = userData

    //check if fields are empty
    if (!name || !email || !password) {
        throw createHttpError.BadRequest("Please fill all the fields")
    }

    //check name length
    if (!validator.isLength(name, { min: 2, max: 100 }
    )) {
        throw createHttpError.BadRequest('Please make sure your name in between 2 and 16 characters is not')
    }

    //check status length
    if (status) {
        if (status.length > 100) {
            throw createHttpError.BadRequest('Please provide the status less than 100 characters')
        }
    }

    //check email
    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest('Please provide a valid email address')

    }

    // if user existe
    const checkDb = await UserModel.findOne({ email })
    if (checkDb) {
        throw createHttpError.Conflict("email alredy exists")
    }

    //check password
    if (!validator.isLength(password, {
        min: 6,
        max: 128
    })) {
        throw createHttpError.BadRequest("Provide a valid password")
    }


    //add user to database
    const user = await new UserModel({
        name,
        email,
        picture: picture || DEFAULT_PICTURE,
        status: status || DEFAULT_STATUS,
        password
    }).save()

    return user

}

export const signUser = async (email, password) => {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).lean()
    console.log(user);
    //check if user exits
    if (!user) {

        throw createHttpError.NotFound("Invalid credentials")
    }

    //compare passwords
    let passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) throw createHttpError.NotFound("Invalid credentials")

    return user;

}
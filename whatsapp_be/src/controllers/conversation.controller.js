import createHttpError from "http-errors"
import logger from "../configs/logger.js"
import { findUser } from "../services/user.service.js"
import { createConversation, doesConversationExit, getUserConversations } from '../services/conversation.service.js'

const create_open_conversation = async (req, res, next) => {
    try {



        const sender_id = req.user.userId
        const { receiver_id } = req.body
        // if receiver_id is provided
        if (!receiver_id) {
            logger.error("please provide a id you want to talk to ")
            throw createHttpError.BadGateway("Something went wrong")
        }

        //check of task exist
        const existed_conversation = await doesConversationExit(sender_id, receiver_id)

        if (existed_conversation) {
            res.json(existed_conversation)
        } else {
            console.log(req.body);

            // res.send("create one ")

            let receiver_user = await findUser(receiver_id)
            let convoData = {
                name: receiver_user.name,
                isGroup: false,
                users: [sender_id, receiver_id]
            }
            const newConvo = await createConversation(convoData)
            const populatedConvo = await populateConversation(newConvo._id, 'users', +-password)
            res.status(200).json(populatedConvo)
        }

    } catch (error) {
        next(error)
    }
}

const getConversations = async (req, res, next) => {
    try {
        const user_id = req.user.userId
        const conversations = await getUserConversations(user_id)
        res.status(200).json(conversations)

    } catch (error) {
        next(error)
    }
}


export { create_open_conversation, getConversations }
import createHttpError from 'http-errors'
import { ConversationModel } from '../models/index.js'
import UserModel from '../models/userModel.js'

export const doesConversationExit = async (sender_id, receiver_id) => {
    let convo = await ConversationModel.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: sender_id } } },
            { users: { $elemMatch: { $eq: receiver_id } } }
        ]

    })

        .populate('users', '-password')
        .populate("latestMessage")

    if (!convo) throw createHttpError.BadRequest("oops.... Something went wrong")
    // console.log(convo);

    // populate message model

    convo = await UserModel.populate(convo, {
        path: "latestMessage.sender",
        select: 'name email picture status'
    })

    return convo[0]


}


export const createConversation = async (data) => {
    const newConvo = await ConversationModel.create(data);
    if (!newConvo) throw createHttpError.BadRequest("Oops ... Something went wrong")
    return newConvo
}
export const populateConversation = async (id, fieldToPopulate, fieldsToRemove) => {
    const populatedConvo = await ConversationModel.findOne({ _id: id }).populate(fieldToPopulate, fieldsToRemove)
    if (!populatedConvo) throw createHttpError.BadRequest("Oops ... Something went wrong")
    return populatedConvo
}


export const getUserConversations = async (user_id) => {
    let conversations;
    await ConversationModel.find({
        users: { $elemMatch: { $eq: user_id } },
    })
        .populate("users", "-password")
        .populate("admin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            results = await UserModel.populate(results, {
                path: "latestMessage.sender",
                select: "name email picture status",
            });
            conversations = results;
        })
        .catch((err) => {
            throw createHttpError.BadRequest("Oops...Something went wrong !");
        });
    return conversations;
};
export const updateLatestMessage = async (convo_id, msg) => {
    const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
        latestMessage: msg,
    });
    if (!updatedConvo)
        throw createHttpError.BadRequest("Oops...Something went wrong !");

    return updatedConvo;
};
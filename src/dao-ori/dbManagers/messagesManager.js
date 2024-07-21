import { chatModel } from "../models/messages.models.js";

class MessageManagerMongo {

    getMessages = async () => {
        try {
            return await chatModel.find().lean()
        } catch (error) {
            error
        }
    }

    addMessages = async (message) => {
        try {
            return await chatModel.create(message)
        } catch (error) {
            return error
        }
    }

    deleteAllMessages = async ()=>{
        try{
            const result = await chatModel.deleteMany({})
            return result
        }catch(error){
            console.log(error)
        }
    }

}

export default MessageManagerMongo
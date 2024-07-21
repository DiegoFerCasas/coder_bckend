import { chatModel } from "./models/messages.models.js";

class MessageManagerMongo {

    get = async () => {
        try {
            return await chatModel.find().lean()
        } catch (error) {
            error
        }
    }

    create = async (message) => {
        try {
            return await chatModel.create(message)
        } catch (error) {
            return error
        }
    }

    delete = async ()=>{
        try{
            const result = await chatModel.deleteMany({})
            return result
        }catch(error){
            console.log(error)
        }
    }

}

export default MessageManagerMongo
import { chatModel } from "./models/messages.models";

class messageManagerMongo {

    getMessages = async () => {
        try {
            return await chatModel.find().lean()
        } catch (error) {
            error
        }
    }

    addMessages = async (message) => {
        if (message.user.trim() === '' || message.message.trim() === '') {
            return null
        }
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
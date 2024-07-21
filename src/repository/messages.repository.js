export default class MessageRepository {
    constructor(messageDao) {
        this.messageDao = messageDao
    }
    getMessages = async () => await this.messageDao.get()
    addMessages = async (data) => await this.messageDao.create(data)
    deleteMessages = async () => this.messageDao.delete()


}
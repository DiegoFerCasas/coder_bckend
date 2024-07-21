import { userModel } from "./models/user.models.js";

class UserManagerMongo {
  constructor() {
    this.userModel = userModel;
  }

  async getAll() {
    const users =  await this.userModel.find().lean()
    return users
  }

  async create(user) {
    return await this.userModel.create(user)
  }

  async getBy(value) {
    return this.userModel.findOne(value);
  }

  async getByEmail(email) {
    return this.users.find((user) => user.email === email);
  }
}


export default UserManagerMongo
import { userModel } from "../models/user.models.js";

class UserManagerMongo {
  constructor() {
    this.userModel = userModel;
  }

  async getUsers() {
    const users =  await this.userModel.find().lean()
    return users
  }

  async createUser(user) {
    return await this.userModel.create(user)
  }

  async getUserBy(value) {
    return this.userModel.findOne(value);
  }

  async getUserByEmail(email) {
    return this.users.find((user) => user.email === email);
  }
}


export default UserManagerMongo
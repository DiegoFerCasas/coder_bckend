import { ticketModel } from "./models/ticket.model.js";

class TicketDao {
  constructor() {
    this.ticketModel = ticketModel;
  }

  getAll = async () => {
    try {
      return await this.ticketModel.find();
    } catch (error) {}
  };

  getBy = async (value) => {
    try {
      await this.ticketModel.findOne(value);
    } catch (error) {}
  };

  create = async (ticket) => {
    try {
      await this.ticketModel.create(ticket);
    } catch (error) {}
  };

  delete =async (value) => {
    try{
await this.ticketModel.delete(value)
    }catch(error){

    }
  }
}

export default TicketDao
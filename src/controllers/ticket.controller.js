import { ticketService, cartService, productService } from "../service/index.js";

class TicketController {
    constructor() {
        this.ticketService = ticketService
        this.cartService =cartService
        this.productService = productService

    }

    getTickets = async (req, res) => {
        try {

        } catch (error) {
            console.log(error)
        }
    }

}
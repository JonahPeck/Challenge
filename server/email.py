import logging

def notify_admin_of_ticket_create (ticket) {
    
    logging.info(f'Would normally send email here with body: \n A new ticket has been created.\n Name:{ticket.name}')
}

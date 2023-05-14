
import cron from 'node-cron';
import { SEND_WELCOME_MAIL } from './mailingServices/welcomeMail';
// DEBUGGING | LOGGING TO CONSOLE
const log = console.log;

// CRON JOB
cron.schedule('*/2 * * * * *', async () => {
    await SEND_WELCOME_MAIL(); 
}) 
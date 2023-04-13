import Surreal from 'surrealdb.js'
import { mainLogger } from '../main';
import { ServerService } from '@/services';

export const configureDb: (db: Surreal, db_user:string, db_pass: string, servicesList: string[]) => Promise<Surreal> = async(db, db_user, db_pass) => {
    try {
        console.log("Initializing database...");
        if (!db_user || !db_pass) {
            throw new Error("DB_USERNAME or DB_PASSWORD not set")
        }
        await db.signin({
            user: db_user,
            pass: db_pass
        }).then(() => {
            console.log('Successfully signed in! 👀')
        }).catch ((err) => {
            throw new Error(`Could not sign in to db 🤕, ${err}`)
        })
        await db.use('ghorde', 'ghorde')
        ServerService.currDb = db
        mainLogger.info(`✋Logged in Service: Server`)
    } catch (err) {
        mainLogger.fatal(`❌ Fatal: exiting due to failiure in instancing critical services. \n${err}`);
        throw new Error("Fatal: exiting due to failiure in instancing critical services.")
    }
    return db
}
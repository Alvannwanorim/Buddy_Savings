import express from 'express'
import { Routes } from './interfaces/routes.interface';
import { AppDataSource } from './database';
import morgan from 'morgan';
import handleErrorMiddleware from './middleware/error-middleware';

class App {
    public app: express.Application
    public port: string | number;
    public env: string;

    constructor(routes: Routes[]){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development'

        this.env !== 'test' && this.connectToDatabase()
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling()
    }
    

    public listen(){
        this.app.listen(this.port, ()=>{
            console.info(`==================================`)
            console.info(`======== ENV: ${this.port}========`)
            console.info(`App listening on port ${this.port}`)
            console.info(`==================================`)
        })
    }

    public getServer(){
        return this.app
    }

    initializeErrorHandling() {
        this.app.use(handleErrorMiddleware)
    }
    initializeRoutes(routes: Routes[]) {
        routes.forEach((route)=>{
            this.app.use('/api', route.router)
        })
    }
    initializeMiddlewares() {
        this.app.use(morgan('tiny'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
    }

    public async connectToDatabase() {
        try {
            const connection = await AppDataSource.initialize()
            connection.runMigrations
            console.log("Database connection establish");
            
        } catch (err) {
            console.log(err.message);
        }
    }
}

export default App

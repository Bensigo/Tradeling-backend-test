
interface IMongo {
    dbUri: string;
    poolSize: number;
    debug: boolean;
}
export interface IAppConfigType {
    runtimeEnv: string;
    apiPort: number;
    mongo: IMongo


};

// setup app config
const defaultConfig: IAppConfigType = {
    runtimeEnv: 'dev',
    apiPort: parseInt(process.env.PORT, 10) || 3001,
    mongo: {
        dbUri: process.env.MONGO_URL|| 'mongodb://127.0.0.1:27017/voucher-service',
        poolSize: 5,
        debug: !(process.env.NODE_ENV === 'test'),
    }

}


export const appConfig: IAppConfigType = defaultConfig;

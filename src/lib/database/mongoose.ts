import mongoose , {Mongoose} from "mongoose";

const MONGODB_URL = process.env.MongoDB_URL

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// caching connection
let cached:MongooseConnection = (global as any).mongoose


if(!cached)[
    cached = (global as any).mongoose = {
        conn:null,
        promise:null
    }
]

export const connectToDatabase = async()=>{
    if(cached.conn)return cached.conn;

    if(!MONGODB_URL){
        throw new Error('MongoDB_Url is Not Defined...')
    }

    cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL,
        {
            dbName:'ImaginifyData',
            bufferCommands:false
        })

    cached.conn = await cached.promise;
    return cached.conn;
}
const getEnv = (key:string, deFaultValue?:string):string =>{
  const  value = process.env[key] || deFaultValue;
  if(!value){
    throw new Error(`Key ${key} not found in env`);
  }
  return value
}

//database
export const MONGO_URI = getEnv("MONGO_URI");
export const DATABASE_NAME = getEnv("DATABASE_NAME");
export const PORT = getEnv("PORT","5000");
export const NODE_ENV = getEnv("NODE_ENV","development");
export const CLIENT_URI = getEnv("CLIENT_URI");


//origin cors
export const CORS_ORIGIN = getEnv("CORS_ORIGIN");


// tokens
export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");
export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET");

// cloudinary
export const CLOUDINARY_API_NAME= getEnv("CLOUDINARY_API_NAME");
export const CLOUDINARY_API_KEY= getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET= getEnv("CLOUDINARY_API_SECRET");

//email 
export const MAILTRAP_TOKEN=getEnv("MAILTRAP_TOKEN");
export const USER_EMAIL= getEnv("USER_EMAIL")





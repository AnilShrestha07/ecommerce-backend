require("dotenv").config()
const CloudinaryConfig = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,

}

const SMTPconfig = {
    provider: process.env.SMTP_PROVIDER,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM_ADDRESS,
}
const MongodbConfig ={
    url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_DBNAME 
}

const PostgresConfig = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    port: process.env.DB_PORT
}
const AppConfig ={
    appUrl: process.env.APP_URL, 
    frontendUrl: process.env.FRONTEND_URL,
    jwtSecret: process.env.JWT_SECRET
  }
  
const UserRoles = {
    ADMIN: 'admin',
    SELLER: 'seller',
    CUSTOMER: 'customer'
}
const Status = {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
}
const Gender = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
}
const StateName = {
    STATE_1: 'Koshi',
    STATE_2: 'Madesh',
    STATE_3: 'Bagmati',
    STATE_4: 'Gandaki',
    STATE_5: 'Lumbini',
    STATE_6: 'Karnali',
    STATE_7: 'Sudur Paschim'


}
const OrderDetailStatus = {
    PENDING: "pending",
    VERIFIED: "verified",
    PROCESSED: "processed",
    COMPLETED: "completed"

}
const OrderStatus = {
    ...OrderDetailStatus,
    CANCELLED: "cancelled"
}

const PaymentMethods = {
    CASH: "cash",
    ONLINE: "online",
    BANK: "bank",
    CARD: "card",
    ESEWA: "esewa",
    KHALTI: "khalti"
}

module.exports = {
    CloudinaryConfig,
    SMTPconfig,
    MongodbConfig,
    UserRoles,
    Status,
    Gender,
    StateName,
    AppConfig,
    OrderDetailStatus,
    OrderStatus,
    PaymentMethods,
    PostgresConfig
}
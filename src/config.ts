export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  topics: {
    reportValidated: process.env.REPORT_VALIDATED_EVENT,
    offerTaked: process.env.OFFER_TAKED_EVENT,
    orderValidated: process.env.ORDER_VALIDATED_EVENT,
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672',
  },
});

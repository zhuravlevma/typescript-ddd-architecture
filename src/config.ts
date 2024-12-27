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
    sagaReceived: process.env.SAGA_RECEIVED_SAGA_EVENT,
    reportValidated: process.env.REPORT_VALIDATED_EVENT,
    cancelReport: process.env.CANCEL_REPORT_EVENT,
    offerTaked: process.env.OFFER_TAKED_EVENT,
    curierNotFound: process.env.CURIER_NOT_FOUND,
    orderValidated: process.env.ORDER_VALIDATED_EVENT,
    orderCreated: process.env.ORDER_CREATED_EVENT,
    orderCancelled: process.env.ORDER_CANCELLED_EVENT,
    extendOrderPeriod: process.env.EXTEND_ORDER_PERIOD,

    paymentCompleted: process.env.PAYMENT_COMPLETED_EVENT,
    paymentFailed: process.env.PAYMENT_FAILED_EVENT,
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672',
    exchange: process.env.EXCHANGE || 'test',
  },
});

import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER],
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();

export const consumer = kafka.consumer({ groupId: "chats" });

export const connectKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer Connected");
};

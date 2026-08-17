import { kafka } from "../config/kafka";
import { ORDER_PLACED_TOPIC, OrderPlacedEvent } from "../events/order-placed.event";


const consumer = kafka.consumer({ groupId: "notification-group" });

async function main() {
    await consumer.connect();
    console.log("Consumer connected");

    await consumer.subscribe({ topic: ORDER_PLACED_TOPIC, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const event = JSON.parse(message.value?.toString() || "{}") as OrderPlacedEvent;
            console.log(`notification | partition: ${partition} | offset: ${message.offset}`);
            console.log(`Received event from topic ${topic}:`, event);
        },
    });
}

process.on("SIGINT", async () => {
    console.log("Disconnecting consumer...");
    await consumer.disconnect();
    process.exit(0);
});

main().catch(async (error) => {
    console.error("Error in consumer:", error);
    await consumer.disconnect();
    process.exit(1);
});
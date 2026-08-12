import { kafka } from "../config/kafka";
import { ORDER_PLACED_TOPIC, OrderPlacedEvent } from "../events/order-placed.event";



const producer = kafka.producer();

let orderNumber = 1;

function createOrderPlacedEvent(): OrderPlacedEvent {
    const userId = `user-${Math.floor(Math.random() * 1000)}`;
    const amount = Math.floor(Math.random() * 1000) + 1;
    const event: OrderPlacedEvent = {
        eventId: crypto.randomUUID(),
        eventType: "ORDER_PLACED",
        orderId: `order-${orderNumber}`,
        userId,
        amount,
        createdAt: new Date().toISOString(),
    };
    return event;
}

async function main() {
    await producer.connect();
    console.log("Producer connected");

    setInterval(async () => {
        const event = createOrderPlacedEvent();

        await producer.send({
            topic: ORDER_PLACED_TOPIC,
            messages: [
                {
                    key: event.orderId,
                    value: JSON.stringify(event),
                },
            ],
        });
        console.log("Order sent:", event);
    }, 5000);
}


process.on("SIGINT", async () => {
    console.log("Disconnecting producer...");
    await producer.disconnect();
    process.exit(0);
});

main().catch(async (error) => {
    console.error("Error in producer:", error);
    await producer.disconnect();
    process.exit(1);
});
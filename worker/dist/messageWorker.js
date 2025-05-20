import { PrismaClient } from "@prisma/client";
import { Worker } from "bullmq";
import IORedis from "ioredis";
const prisma = new PrismaClient();
const connection = new IORedis({ maxRetriesPerRequest: null });
new Worker("chat-message", async (job) => {
    const { message, createdAt } = job.data;
    await prisma.messages.create({
        data: { message }
    });
    console.log(message, createdAt, "Message Saved");
}, { connection });

'use server'

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY; // Corrected variable name

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error('User is not logged in');
    if (!apiKey) throw new Error('Stream API key is missing');
    if (!apiSecret) throw new Error('Stream API secret is missing');

    const client = new StreamClient(apiKey, apiSecret);

    try {
        // Current recommended way to create tokens
        const token = client.createToken(user.id);
        return token;
    } catch (error) {
        console.error('Error generating Stream token:', error);
        throw new Error('Failed to generate token');
    }
};
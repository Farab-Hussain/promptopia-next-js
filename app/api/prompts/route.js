import {connectToDB} from "@/utils/database";
import { default as Prompt } from "@/models/prompt";

export const GET = async (request) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        console.log('Fetched prompts:', prompts); // Add this line for debugging

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.error('Error fetching prompts:', error); // Add this line for debugging
        return new Response("Failed to fetch prompts", { status: 500 })
    }
}

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
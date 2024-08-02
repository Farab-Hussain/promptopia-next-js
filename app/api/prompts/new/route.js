import {connectToDB} from "@/utils/database";
import Prompt from "@/models/prompt";

export const POST = async (req) => {
    try {
        const {userId, prompt, tag} = await req.json();
        console.log("Received data:", { userId, prompt, tag });

        await connectToDB();
        console.log("Connected to DB");

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });
        console.log("Created new prompt object:", newPrompt);

        const savedPrompt = await newPrompt.save();
        console.log("Saved new prompt:", savedPrompt);

        return new Response(JSON.stringify(savedPrompt), {status: 201});
    } catch (error) {
        console.error("Error in /api/prompts/new:", error);
        // Return detailed error information (remove in production)
        return new Response(JSON.stringify({
            message: "Failed to create a new prompt",
            error: error.message,
            stack: error.stack
        }), {status: 500});
    }
}
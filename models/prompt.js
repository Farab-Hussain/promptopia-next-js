import mongoose from "mongoose";

let Prompt;

try {
  Prompt = mongoose.model("Prompt");
} catch {
  const PromptSchema = new mongoose.Schema({
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required."]
    },
    tag: {
      type: String,
      required: [true, "Tag is required."]
    }
  }, { timestamps: true });

  Prompt = mongoose.model("Prompt", PromptSchema);
}

export default Prompt;
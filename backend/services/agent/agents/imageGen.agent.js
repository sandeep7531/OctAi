import { getModel } from "../config/llmModels.js";

export const imageGenAgent = async (state) => {
  const imageGenModel = await getModel("image");
  const systemPrompt = `You are an expert image generation assistant. Your task is to create high-quality images based on the user's description. 
    1. Analyze the user's request carefully. 
    2. Generate a detailed and creative prompt that will help produce the best possible image. 
    3. Consider aspects such as style, composition, lighting, mood, and any specific details requested by the user. 
    4. If the user's request is ambiguous or lacks detail, make intelligent assumptions to create a compelling image description. 
    5. Return the final prompt that should be used for image generation.`;

  const response = await imageGenModel.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: state.prompt,
    },
  ]);
  console.log("=====>>>>Image ren model", response);

  return {
    ...state,
    aiResponse: response.content,
  };
};

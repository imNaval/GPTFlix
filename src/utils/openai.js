import OpenAI from "openai";
import { OPENAI_KEY } from "./constant";

const openai = new OpenAI({
    apiKey: OPENAI_KEY,
    dangerouslyAllowBrowser: true
})

export default openai


///////////////
export const fetchGptResponse = async(query) => {
    try {
        const response = await fetch('https://chat-gpt-server-beta.vercel.app/', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "http-equiv": "Content-Security-Policy",
                "content": "upgrade-insecure-requests"
            },
            body: JSON.stringify({
                message: query //chat.map(message=> message.message).join(" \n")
            })
        })

        console.log(response)
        const data = await response.json()
        console.log(data)
        return data;

    } catch (error) {
        console.log(error);
    }
}
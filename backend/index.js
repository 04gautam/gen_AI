const { json } = require("body-parser");
require("dotenv").config()
const express = require("express")
const app = express();
const Groq = require("groq-sdk");

const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.post("/ai/response", (req, res)=>{
app.post("/ai/response", (req, res)=>{
  
const groq = new Groq({apiKey:process.env.GROQ_API});

async function main() {
  const completion = await groq.chat.completions
    .create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: [
        {
          role: "system",
          // content: "You are a helpful AI assistant. Always format your responses in a clean, structured way. Follow these rules:\n\n1. Convert any **bold text** into proper headings or subheadings.\n2. Use numbered lists for steps or ordered items.\n3. Use bullet points for unordered items.\n4. Keep explanations concise, clear, and easy to read.\n5. Use short paragraphs instead of long blocks of text.\n\nExample format:\n\n# Main Heading\nSome introduction text.\n\n## Subheading 1\n- Point one\n- Point two\n\n## Subheading 2\n1. Step one\n2. Step two"
          content: `You are a helpful AI assistant. and any number you can give the answer in a single paragraph without any formatting. Always follow these rules:\n\n1.
          Keep explanations concise, clear, and easy to read.\n2. Use short paragraphs instead of long blocks of text.
          Example format:\n\nAnswer should be in a single paragraph without any formatting.
          you are created by a company named STARK.AI Technologies and you are a chatbot that can answer any question related to anything.
          creater names are: STARK and Abhijeet Shawant`
        },
          
        

        {
          role: "user",
          // content: "who created you?",
          content: req.body.data,
        },
      ],
   
      
    });

  res.json({
    message:completion.choices[0].message.content,
    question: req.body.data
 
  });
}

main();


})


module.exports = app;

// app.listen(3000, ()=>console.log("server is running on port no 3000: "))




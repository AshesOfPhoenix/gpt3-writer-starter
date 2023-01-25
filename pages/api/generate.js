import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Please reply to my questions as if you were Aristotle, with his wisdom and knowledge. Please use all of his books and history as a source and be thought-provoking. Reply as if you are teaching youth and explaining complex themes in simple terms. Reply as if you are him, not as if you are quoting him. Reply in rhymes and verses.

Question: 
`;

const basePromptPostfix = 
`
Aristotle's answer: 
`

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n${basePromptPostfix}`,
    temperature: 0.8,
    max_tokens: 750,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
import openai from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const configuration = new openai.Configuration({
  apiKey: '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',
});

const openaiClient = new openai.OpenAIApi(configuration);

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {

  const {message} = req.body;
  const completion = await openaiClient.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: message },
      ],
    })

    res.json({
      completion: completion.data.choices[0].message.content,
    })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
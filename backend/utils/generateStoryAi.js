import axios from "axios";

const generateStory = async (prompt,genre) => {
  const options = {
    method: 'POST',
    url: 'https://api.edenai.run/v2/text/generation',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.STORY_KEY}`
    },
    data: {
      response_as_dict: false,
      attributes_as_list: false,
      show_original_response: false,
      temperature: 0.3,
      max_tokens: 1000,
      text:`${prompt} generate an engaging ${genre} short story out of this prompt(must be cohersive, tight-plot)`,
      providers: 'openai',
      fallback_providers: 'cohere'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Example usage:


export default generateStory

import { NextApiRequest, NextApiResponse } from 'next';
import search from '../../lib/db';

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const parsed = JSON.parse(req.body);

  const response = {
    success: false,
    noMatches: false,
    userSearches: parsed,
    results:{}
  };

  try {
    const data = await search(parsed);
    response.results = data;
    response.success = true;
    res.status(200).send(response)
  } catch (err) {
    if(err === "no matches"){
      response.noMatches = true;
      response.success = true;
      response.results = {misc:[],colors:[],sweeteners:[],unknown:[]}
      res.status(200).send(response);
      return
    }
    response.success = false;
    console.error('[API ERROR]',err)
    res.status(400).json({ statusCode: 400, message: err.message })
  }
}

export default handler
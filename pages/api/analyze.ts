import { NextApiRequest, NextApiResponse } from 'next';
import search from '../../lib/db';

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const parsed = JSON.parse(req.body);

  const response = {
    userSearches: parsed,
    results:{}
  };

  try {
    const data = await search(parsed);
    response.results = data;
    res.status(200).send(response)
  } catch (err) {
    console.error(err)
    res.status(400).json({ statusCode: 400, message: err.message })
  }
}

export default handler
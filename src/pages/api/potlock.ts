import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'



export  default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method == "GET"){
        const response = await axios.get("https://dev.potlock.io/api/v1/lists/1/registrations",{
            headers:{
                "Content-Type":"application/json"
            }
        })
        res.status(200).json(response.data.results)
    }
}
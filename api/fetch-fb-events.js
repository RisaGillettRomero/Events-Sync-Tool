// /api/fetch-fb-events.js

import fetch from "node-fetch";

export default async function handler(req, res) {
  const FB_PAGE_ID = process.env.FB_PAGE_ID;
  const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

  try {
    // Fetch upcoming and past events from Facebook
    const fbResponse = await fetch(
      `https://graph.facebook.com/v18.0/${FB_PAGE_ID}/events?fields=id,name,description,start_time,end_time,place,cover&access_token=${FB_PAGE_ACCESS_TOKEN}`
    );

    const fbData = await fbResponse.json();

    if (!fbData.data) {
      return res.status(400).json({ error: "No events found" });
    }

    // Return the events as JSON
    return res.status(200).json(fbData.data);
  } catch (error) {
    console.error("Error fetching Facebook events:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

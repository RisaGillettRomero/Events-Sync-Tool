export default async function handler(req, res) {
  const FB_PAGE_ID = process.env.FB_PAGE_ID;
  const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

  try {
    const fbResponse = await fetch(
      `https://graph.facebook.com/v18.0/${FB_PAGE_ID}/events?fields=id,name,description,start_time,end_time,place,cover&access_token=${FB_PAGE_ACCESS_TOKEN}`
    );
    const fbData = await fbResponse.json();

    if (!fbData.data || fbData.data.length === 0) {
      return res.status(200).json({ events: [] });
    }

    res.status(200).json({ events: fbData.data });
  } catch (error) {
    res.status(500).json({ error: "Error fetching Facebook events" });
  }
}

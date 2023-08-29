export default async function handler(req, res) {
  const { url } = req.body;

  try {
    console.log('Fetching from:', `${process.env.ASSET_UPLOAD_ENDPOINT}`);

    const fetchRes = await fetch(`${process.env.ASSET_UPLOAD_ENDPOINT}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(url)}`,
    });

    console.log('Fetch response status:', fetchRes.status);

    const data = await fetchRes.json();
    console.log('Fetched data:', data);

    res.status(fetchRes.status).json(data);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

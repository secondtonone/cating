export default async function request(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if(data.ok) {
      console.log('Done!', data.description);
    } else {
      throw new Error(data.description);
    }
  } catch(err) {
    console.log('ERROR', err);
  }
}

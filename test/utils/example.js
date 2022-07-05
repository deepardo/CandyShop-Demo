import axios from 'axios'

export default class example {

  async getResults() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/albums/1');
    return res.data[0].title;
  } 

 async postResults(userId, id, title) {
  let params = {
    userId: userId,
    id: id,
    title: title
  }
  const response = await axios.post('https://jsonplaceholder.typicode.com/albums', params);
  return response;
 }
}
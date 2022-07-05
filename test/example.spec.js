import example from '@/test/utils/example'
import axios from 'axios'

jest.mock("axios");

describe('API call', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns the title of the first album", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          userId: 1,
          id: 1,
          title: "My First Album",
        },
        {
          userId: 1,
          id: 2,
          title: "Album: The Sequel",
        },
      ],
    });
  
    const getRes = new example()
    const title = await getRes.getResults();
    expect(title).toEqual("My First Album");
  });

  it('post details', () => {
    const postRes = new example()
    let expectedResult = { status: 200, statusText: 'OK' }
    let [userId, id, title] = [
      '1',
      '101',
      'abc',
    ]
    jest.spyOn(axios, 'post').mockReturnValue({ status: 200, statusText: 'OK' })
    return postRes
      .postResults(userId, id, title)
      .then(data => expect(data).toStrictEqual(expectedResult))
  })
})
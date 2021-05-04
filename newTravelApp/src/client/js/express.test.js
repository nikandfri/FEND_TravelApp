"Use strict"
const axios = require('axios')

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
      const response = await axios.post("http://localhost:8080/post", ["berlin", "2021-05-09"]);
      expect(response.status).toBe(200);
    });
  });


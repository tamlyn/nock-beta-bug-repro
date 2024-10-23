import axios from "axios";

import { setupHttpRecording } from "../test/helpers";

const request = axios.create({
  headers: {
    "accept-encoding": "identity",
  },
});

it("makes some requests", async () => {
  await setupHttpRecording("test1.1");

  const response = await request("https://github.com");
  expect(response.status).toBe(200);
});

it("makes more requests", async () => {
  await setupHttpRecording("test1.3");

  const response2 = await request(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  expect(response2.status).toBe(200);
});

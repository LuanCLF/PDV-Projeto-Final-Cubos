const testServer = require("./jest.setup");

describe("a", () => {
  it("s", async () => {
    const a = await testServer.post("/login").send({
      email: "aasa",
      senha: "senha",
    });

    expect(a.body).toEqual("as");
  });
});

const { createChallenge } = require("../service/challengesService");

const mariadb = require("mariadb");

const connect = async () => {
  try {
    const pool = mariadb.createPool({
      host: "localhost",
      user: "root",
      password: "password",
      database: "gamifydb"
    });
    global.conn = await pool.getConnection();
  } catch (error) {
    throw error.message;
  }
};

test("create challenge", async () => {
  await connect();
  const response = await createChallenge("poolevents", 20);
  expect(response.type).toBe("poolevents");
});
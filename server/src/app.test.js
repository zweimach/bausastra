import { Test } from "@nestjs/testing";
import supertest from "supertest";

import { AppModule } from "./app.module";

describe("AppController", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", async () => {
    const response = await supertest(app.getHttpServer()).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});

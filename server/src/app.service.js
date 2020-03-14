import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(name = "World") {
    return `Hello ${name}!`;
  }
}

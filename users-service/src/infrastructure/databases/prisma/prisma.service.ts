import { PrismaClient } from "@db/generated/prisma/client";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL_SYMBOL } from "@/domain/constants";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(@Inject(DATABASE_URL_SYMBOL) private readonly url: string) {
    const adapter = new PrismaPg({
      connectionString: url,
    });
    super({ adapter });
  }
}

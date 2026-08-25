import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DATABASE_URL, JWT_SECRET, REDIS_URL } from "@/domain/constants";
import { DatabaseModule } from "@/infrastructure/databases/database.module";
import { AuthModule } from "@/modules/auth/domain/auth.module";
import { UserModule } from "@/modules/users/domain/domain/user.module";

@Module({
  imports: [
    DatabaseModule.forRootAsync({ dbURL: DATABASE_URL, redisURL: REDIS_URL }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: "15m",
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule, MailerOptions } from "@nestjs-modules/mailer";
import { MailService } from "@/modules/mail/application/services/mail.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): MailerOptions => {
        const emailFrom = config.getOrThrow<string>("NESTJS_EMAIL_FROM");

        return {
          transport: {
            host:
              config.get<string>("NESTJS_BIRD_SMTP_HOST") ?? "smtp.bird.com",
            port: config.get<number>("NESTJS_BIRD_SMTP_PORT") ?? 587,
            secure: false,
            auth: {
              user: config.get<string>("NESTJS_BIRD_USER"),
              pass: config.get<string>("NESTJS_BIRD_API_KEY"),
            },
          },
          defaults: {
            from: emailFrom, // ← same here
          },
        } as MailerOptions;
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

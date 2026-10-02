import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";
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
        const isProduction =
          config.get<string>("NESTJS_NODE_ENV") === "production";
        const emailFrom = config.getOrThrow<string>("NESTJS_EMAIL_FROM");

        if (isProduction) {
          const sesClient = new SESClient([
            {
              // ← object, not array
              region: config.get<string>("NESTJS_AWS_REGION") ?? "us-east-1",
              ...(config.get<string>("NESTJS_AWS_ACCESS_KEY_ID") && {
                credentials: {
                  accessKeyId: config.get<string>("NESTJS_AWS_ACCESS_KEY_ID"),
                  secretAccessKey: config.get<string>(
                    "NESTJS_AWS_SECRET_ACCESS_KEY",
                  ),
                },
              }),
            },
          ]);

          return {
            transport: {
              SES: { ses: sesClient, aws: { SendRawEmailCommand } },
            },
            defaults: {
              from: emailFrom, // ← Address object, not string
            },
          } as MailerOptions;
        }

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

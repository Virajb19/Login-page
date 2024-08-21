-- AlterTable
ALTER TABLE "User" ALTER COLUMN "resetPasswordExpiresAt" DROP NOT NULL,
ALTER COLUMN "resetPasswordToken" DROP NOT NULL,
ALTER COLUMN "verificationToken" DROP NOT NULL,
ALTER COLUMN "verificationTokenExpiresAt" DROP NOT NULL;

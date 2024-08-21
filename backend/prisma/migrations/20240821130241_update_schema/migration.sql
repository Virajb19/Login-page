/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resetPasswordExpiresAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationTokenExpiresAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastlogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resetPasswordExpiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "resetPasswordToken" TEXT NOT NULL,
ADD COLUMN     "verificationToken" TEXT NOT NULL,
ADD COLUMN     "verificationTokenExpiresAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "tester";

-- CreateEnum
CREATE TYPE "auth"."Role" AS ENUM ('GUEST', 'USER', 'MANAGER', 'ADMIN');

-- CreateTable
CREATE TABLE "auth"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "activationLink" TEXT,
    "roles" "auth"."Role"[] DEFAULT ARRAY['USER']::"auth"."Role"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."Token" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refresh" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."NewPassword" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "newPassword" TEXT NOT NULL,
    "restoreLink" TEXT NOT NULL,

    CONSTRAINT "NewPassword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tester"."Exercise" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "isMultiple" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL DEFAULT '131e1ed4-e2c3-4f74-91b2-d93dd652ec9c',

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tester"."Question" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tester"."Answer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "auth"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "auth"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "auth"."Token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NewPassword_userId_key" ON "auth"."NewPassword"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NewPassword_restoreLink_key" ON "auth"."NewPassword"("restoreLink");

-- AddForeignKey
ALTER TABLE "auth"."Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."NewPassword" ADD CONSTRAINT "NewPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tester"."Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tester"."Question" ADD CONSTRAINT "Question_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "tester"."Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tester"."Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "tester"."Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

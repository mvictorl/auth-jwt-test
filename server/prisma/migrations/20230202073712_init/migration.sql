-- CreateTable
CREATE TABLE "NewPassword" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "newPassword" TEXT NOT NULL,
    "restoreLink" TEXT NOT NULL,

    CONSTRAINT "NewPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewPassword_userId_key" ON "NewPassword"("userId");

-- AddForeignKey
ALTER TABLE "NewPassword" ADD CONSTRAINT "NewPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

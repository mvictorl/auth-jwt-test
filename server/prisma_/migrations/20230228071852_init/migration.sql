-- AlterTable
ALTER TABLE "tester"."Exercise" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '131e1ed4-e2c3-4f74-91b2-d93dd652ec9c';

-- AddForeignKey
ALTER TABLE "tester"."Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

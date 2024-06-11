/*
  Warnings:

  - Added the required column `authorId` to the `Commits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commits" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Commits" ADD CONSTRAINT "Commits_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

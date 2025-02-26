/*
  Warnings:

  - You are about to drop the column `account` on the `Code` table. All the data in the column will be lost.
  - Added the required column `username` to the `Code` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Code" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "secretKey" TEXT NOT NULL,
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    "groupId" TEXT,
    CONSTRAINT "Code_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Code_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "CodeGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Code" ("groupId", "id", "notes", "secretKey", "userId") SELECT "groupId", "id", "notes", "secretKey", "userId" FROM "Code";
DROP TABLE "Code";
ALTER TABLE "new_Code" RENAME TO "Code";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

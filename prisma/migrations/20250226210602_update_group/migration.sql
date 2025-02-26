/*
  Warnings:

  - Added the required column `ownerId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "shareable" TEXT NOT NULL
);
INSERT INTO "new_Group" ("id", "name", "shareable") SELECT "id", "name", "shareable" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
CREATE UNIQUE INDEX "Group_shareable_key" ON "Group"("shareable");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

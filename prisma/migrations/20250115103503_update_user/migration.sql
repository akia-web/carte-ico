/*
  Warnings:

  - Made the column `number` on table `player_number` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "player_number" ALTER COLUMN "number" SET NOT NULL;

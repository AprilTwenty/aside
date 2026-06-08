-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "SaveItem" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaveItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaveItem" ADD CONSTRAINT "SaveItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Change" (
    "id" SERIAL NOT NULL,
    "mutation_id" INTEGER NOT NULL,
    "client_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "table" TEXT NOT NULL,
    "row_id" TEXT NOT NULL,
    "new_value" JSONB NOT NULL,

    CONSTRAINT "Change_pkey" PRIMARY KEY ("id")
);

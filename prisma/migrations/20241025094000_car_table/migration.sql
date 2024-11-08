-- CreateTable
CREATE TABLE "Cars" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "name_en" TEXT NOT NULL,
    "name_hi" TEXT,
    "name_es" TEXT,
    "description_en" TEXT,
    "description_hi" TEXT,
    "description_es" TEXT,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

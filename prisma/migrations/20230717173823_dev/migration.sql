-- CreateTable
CREATE TABLE "_DepartmentToDoctor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DepartmentToDoctor_A_fkey" FOREIGN KEY ("A") REFERENCES "Department" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DepartmentToDoctor_B_fkey" FOREIGN KEY ("B") REFERENCES "Doctor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DoctorToHospital" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DoctorToHospital_A_fkey" FOREIGN KEY ("A") REFERENCES "Doctor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DoctorToHospital_B_fkey" FOREIGN KEY ("B") REFERENCES "Hospital" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hospital" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "doctorId" INTEGER,
    "image" TEXT,
    "address" TEXT,
    "description" TEXT
);
INSERT INTO "new_Hospital" ("address", "doctorId", "id", "image", "name") SELECT "address", "doctorId", "id", "image", "name" FROM "Hospital";
DROP TABLE "Hospital";
ALTER TABLE "new_Hospital" RENAME TO "Hospital";
CREATE TABLE "new_Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "doctorId" INTEGER,
    "image" TEXT
);
INSERT INTO "new_Department" ("doctorId", "id", "image", "name") SELECT "doctorId", "id", "image", "name" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToDoctor_AB_unique" ON "_DepartmentToDoctor"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToDoctor_B_index" ON "_DepartmentToDoctor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DoctorToHospital_AB_unique" ON "_DoctorToHospital"("A", "B");

-- CreateIndex
CREATE INDEX "_DoctorToHospital_B_index" ON "_DoctorToHospital"("B");

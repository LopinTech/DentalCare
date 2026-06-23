-- CreateEnum
CREATE TYPE "DepartmentType" AS ENUM ('dental', 'general');

-- CreateEnum
CREATE TYPE "QueueStatus" AS ENUM ('waiting', 'with_doctor', 'in_pathology', 'in_lab', 'completed', 'cancelled', 'no_show');

-- CreateTable
CREATE TABLE "ClinicDepartment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameBn" TEXT,
    "type" "DepartmentType" NOT NULL,
    "parentId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClinicDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeptDoctor" (
    "id" SERIAL NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "designation" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeptDoctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueToken" (
    "id" SERIAL NOT NULL,
    "tokenNumber" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "doctorId" INTEGER,
    "queueDate" DATE NOT NULL,
    "status" "QueueStatus" NOT NULL DEFAULT 'waiting',
    "chiefComplaint" TEXT,
    "notes" TEXT,
    "calledAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QueueToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClinicDepartment_type_idx" ON "ClinicDepartment"("type");

-- CreateIndex
CREATE INDEX "ClinicDepartment_parentId_idx" ON "ClinicDepartment"("parentId");

-- CreateIndex
CREATE INDEX "DeptDoctor_departmentId_idx" ON "DeptDoctor"("departmentId");

-- CreateIndex
CREATE INDEX "DeptDoctor_doctorId_idx" ON "DeptDoctor"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "DeptDoctor_departmentId_doctorId_key" ON "DeptDoctor"("departmentId", "doctorId");

-- CreateIndex
CREATE INDEX "QueueToken_queueDate_idx" ON "QueueToken"("queueDate");

-- CreateIndex
CREATE INDEX "QueueToken_patientId_idx" ON "QueueToken"("patientId");

-- CreateIndex
CREATE INDEX "QueueToken_departmentId_idx" ON "QueueToken"("departmentId");

-- CreateIndex
CREATE INDEX "QueueToken_status_idx" ON "QueueToken"("status");

-- CreateIndex
CREATE UNIQUE INDEX "QueueToken_departmentId_tokenNumber_queueDate_key" ON "QueueToken"("departmentId", "tokenNumber", "queueDate");

-- AddForeignKey
ALTER TABLE "ClinicDepartment" ADD CONSTRAINT "ClinicDepartment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ClinicDepartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeptDoctor" ADD CONSTRAINT "DeptDoctor_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "ClinicDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeptDoctor" ADD CONSTRAINT "DeptDoctor_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueToken" ADD CONSTRAINT "QueueToken_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueToken" ADD CONSTRAINT "QueueToken_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "ClinicDepartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueToken" ADD CONSTRAINT "QueueToken_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

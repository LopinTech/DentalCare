"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Stethoscope, Building2 } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

type DepartmentType = "dental" | "general";

export default function NewDepartmentPage() {
  const router = useRouter();

  const [nameEn, setNameEn] = useState("");
  const [nameBn, setNameBn] = useState("");
  const [type, setType] = useState<DepartmentType>("dental");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const departmentData = {
      nameEn,
      nameBn,
      type,
      description,
      sortOrder,
      isActive,
    };
    console.log("Creating department:", departmentData);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/departments")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Add Department</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Name (English) */}
            <Input
              id="nameEn"
              label="Name (English)"
              type="text"
              placeholder="e.g. Orthodontics"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              required
            />

            {/* Name (Bengali) */}
            <Input
              id="nameBn"
              label="Name (বাংলা)"
              type="text"
              placeholder="যেমন: অর্থোডন্টিক্স"
              value={nameBn}
              onChange={(e) => setNameBn(e.target.value)}
            />

            {/* Type */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">Type</span>
              <div className="flex gap-3">
                {/* Dental option */}
                <label
                  htmlFor="type-dental"
                  className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                    type === "dental"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-input bg-background text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <input
                    id="type-dental"
                    type="radio"
                    name="type"
                    value="dental"
                    checked={type === "dental"}
                    onChange={() => setType("dental")}
                    className="sr-only"
                  />
                  <Stethoscope className="size-5 shrink-0" />
                  <span className="text-sm font-medium">Dental</span>
                </label>

                {/* General option */}
                <label
                  htmlFor="type-general"
                  className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                    type === "general"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-input bg-background text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <input
                    id="type-general"
                    type="radio"
                    name="type"
                    value="general"
                    checked={type === "general"}
                    onChange={() => setType("general")}
                    className="sr-only"
                  />
                  <Building2 className="size-5 shrink-0" />
                  <span className="text-sm font-medium">General</span>
                </label>
              </div>

              {/* Parent department info — shown only when General is selected */}
              {type === "general" && (
                <p className="rounded-md bg-info px-3 py-2 text-xs text-info-foreground">
                  This will be added as a sub-department under General.
                </p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="description"
                className="text-sm font-medium text-foreground"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Brief description of this department (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors"
              />
            </div>

            {/* Sort Order */}
            <Input
              id="sortOrder"
              label="Sort Order"
              type="number"
              min={0}
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
            />

            {/* Active */}
            <div className="flex items-center gap-3">
              <input
                id="isActive"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="size-4 rounded border-input accent-primary cursor-pointer"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Active
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit">Add Department</Button>
        </div>
      </form>
    </div>
  );
}

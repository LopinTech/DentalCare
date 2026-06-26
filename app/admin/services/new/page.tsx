"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Stethoscope, Scissors } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

// ─── Types ────────────────────────────────────────────────────────────────────

type ServiceType = "service" | "procedure";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CATEGORIES = [
  { label: "General", value: "general" },
  { label: "Cosmetic", value: "cosmetic" },
  { label: "Orthodontics", value: "orthodontics" },
  { label: "Surgical", value: "surgical" },
  { label: "Emergency", value: "emergency" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewServicePage() {
  const router = useRouter();

  const [nameEn, setNameEn] = useState("");
  const [nameBn, setNameBn] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ServiceType>("service");
  const [category, setCategory] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // Auto-fill slug from English name unless the user has edited it manually.
  function handleNameEnChange(value: string) {
    setNameEn(value);
    if (!slugManual) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlugManual(true);
    setSlug(value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceData = {
      nameEn,
      nameBn,
      slug,
      description,
      type,
      category,
      basePrice: basePrice ? Number(basePrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      duration: duration ? Number(duration) : null,
      sortOrder,
      isActive,
    };
    console.log("Creating service:", serviceData);
    // TODO: send to API
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/services")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Add New Service</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Identity ──────────────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Name (English) */}
            <Input
              id="nameEn"
              label="Name (English)"
              type="text"
              placeholder="e.g. Teeth Whitening"
              value={nameEn}
              onChange={(e) => handleNameEnChange(e.target.value)}
              required
            />

            {/* Name (বাংলা) */}
            <Input
              id="nameBn"
              label="Name (বাংলা)"
              type="text"
              placeholder="যেমন: দাঁত সাদা করা"
              value={nameBn}
              onChange={(e) => setNameBn(e.target.value)}
            />

            {/* Slug */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="slug" className="text-sm font-medium text-foreground">
                Slug
              </label>
              <Input
                id="slug"
                type="text"
                placeholder="teeth-whitening"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Auto-filled from name. Edit only if you need a custom URL.
              </p>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Brief description of this service (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* ── Classification ────────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Classification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Type — radio cards */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">Type</span>
              <div className="flex gap-3">
                <label
                  htmlFor="type-service"
                  className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                    type === "service"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-input bg-background text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <input
                    id="type-service"
                    type="radio"
                    name="type"
                    value="service"
                    checked={type === "service"}
                    onChange={() => setType("service")}
                    className="sr-only"
                  />
                  <Stethoscope className="size-5 shrink-0" />
                  <span className="text-sm font-medium">Service</span>
                </label>

                <label
                  htmlFor="type-procedure"
                  className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                    type === "procedure"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-input bg-background text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <input
                    id="type-procedure"
                    type="radio"
                    name="type"
                    value="procedure"
                    checked={type === "procedure"}
                    onChange={() => setType("procedure")}
                    className="sr-only"
                  />
                  <Scissors className="size-5 shrink-0" />
                  <span className="text-sm font-medium">Procedure</span>
                </label>
              </div>
            </div>

            {/* Category */}
            <Select
              id="category"
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={CATEGORIES}
              placeholder="Select a category"
            />
          </CardContent>
        </Card>

        {/* ── Pricing & Duration ────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing &amp; Duration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Base Price */}
              <Input
                id="basePrice"
                label="Base Price (৳)"
                type="number"
                min={0}
                step="1"
                placeholder="500"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
              />

              {/* Max Price */}
              <div className="flex flex-col gap-1.5">
                <Input
                  id="maxPrice"
                  label="Max Price (৳)"
                  type="number"
                  min={0}
                  step="1"
                  placeholder="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank for a fixed price.
                </p>
              </div>
            </div>

            {/* Duration */}
            <Input
              id="duration"
              label="Duration (minutes)"
              type="number"
              min={1}
              step="1"
              placeholder="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* ── Settings ──────────────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
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
              <label htmlFor="isActive" className="text-sm font-medium text-foreground cursor-pointer">
                Active
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit">Add Service</Button>
        </div>
      </form>
    </div>
  );
}

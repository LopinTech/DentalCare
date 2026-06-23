"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";

export default function EditServicePage({
  params,
}: {
  params: { svcId: string };
}) {
  const router = useRouter();

  // ── Pre-filled placeholder state ──────────────────────────────────────────
  const [name, setName] = useState("Teeth Cleaning");
  const [type, setType] = useState("service");
  const [category, setCategory] = useState("Preventive");
  const [price, setPrice] = useState("500");
  const [duration, setDuration] = useState("30");
  const [status, setStatus] = useState("active");
  const [description, setDescription] = useState(
    "A professional teeth cleaning procedure to remove plaque and tartar buildup, helping to maintain optimal oral hygiene."
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      svcId: params.svcId,
      name,
      type,
      category,
      price: Number(price),
      duration: Number(duration),
      status,
      description,
    };
    console.log("Saving service:", payload);
    router.push("/admin/services");
  };

  const handleDelete = () => {
    console.log("Deleting service:", params.svcId);
    router.push("/admin/services");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* ── Back button ─────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-sm"
          onClick={() => router.push("/admin/services")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit Service — {name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Service ID: #{params.svcId}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Basic Info ────────────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Service ID (read-only) */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="svcId" className="text-sm font-medium">
                Service ID
              </label>
              <Input
                id="svcId"
                type="text"
                value={`#${params.svcId}`}
                readOnly
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="name" className="text-sm font-medium">
                Service Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Teeth Cleaning"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="type" className="text-sm font-medium">
                Type <span className="text-destructive">*</span>
              </label>
              <Select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="service">Service</option>
                <option value="procedure">Procedure</option>
              </Select>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="category" className="text-sm font-medium">
                Category <span className="text-destructive">*</span>
              </label>
              <Select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Preventive">Preventive</option>
                <option value="Orthodontics">Orthodontics</option>
                <option value="Endodontics">Endodontics</option>
                <option value="Cosmetic">Cosmetic</option>
                <option value="Restorative">Restorative</option>
                <option value="Oral Surgery">Oral Surgery</option>
                <option value="Periodontics">Periodontics</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* ── Pricing & Duration ────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing &amp; Duration</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="price" className="text-sm font-medium">
                Price (৳) <span className="text-destructive">*</span>
              </label>
              <Input
                id="price"
                type="number"
                min={0}
                step="1"
                placeholder="500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="duration" className="text-sm font-medium">
                Duration (min) <span className="text-destructive">*</span>
              </label>
              <Input
                id="duration"
                type="number"
                min={1}
                step="1"
                placeholder="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* ── Description ───────────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Describe the service or procedure..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* ── Action buttons ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4">
          {/* Delete section */}
          <div className="flex items-center gap-3">
            {showDeleteConfirm ? (
              <>
                <span className="text-sm text-destructive font-medium">
                  Are you sure?
                </span>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="destructive"
                className="flex items-center gap-2"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="w-4 h-4" />
                Delete Service
              </Button>
            )}
          </div>

          {/* Save button */}
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}

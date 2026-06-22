import { Tag, Plus, Edit2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryType = "billing" | "inventory";

interface CategoryItem {
  id: number;
  name: string;
  icon: string;
  itemCount: number;
  type: CategoryType;
}

// ─── Placeholder data (replace with DB queries) ───────────────────────────────

const BILLING_CATEGORIES: CategoryItem[] = [
  { id: 1, name: "Utilities",  icon: "⚡", itemCount: 12, type: "billing" },
  { id: 2, name: "Medicine",   icon: "💊", itemCount: 34, type: "billing" },
  { id: 3, name: "Equipment",  icon: "🔧", itemCount: 8,  type: "billing" },
  { id: 4, name: "General",    icon: "📋", itemCount: 21, type: "billing" },
];

const INVENTORY_CATEGORIES: CategoryItem[] = [
  { id: 5, name: "Consumables", icon: "🧤", itemCount: 47, type: "inventory" },
  { id: 6, name: "Equipment",   icon: "🔬", itemCount: 15, type: "inventory" },
  { id: 7, name: "Medications", icon: "💉", itemCount: 29, type: "inventory" },
  { id: 8, name: "Safety",      icon: "🛡️", itemCount: 11, type: "inventory" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CategoryCardProps {
  category: CategoryItem;
  /**
   * Tinted backdrop for the emoji circle:
   *   billing   → blue-info tint   oklch(0.93 0.05 220 / 0.5)
   *   inventory → green-success    oklch(0.94 0.06 162 / 0.45)
   *
   * Aesthetic risk: the oversized emoji in a pill-shaped tinted backdrop is
   * the primary identity signal for each card. Categories are taxonomy objects —
   * their icon IS their identity. Giving it primary visual weight makes the
   * grid scannable by shape and color before the reader reads a word. The
   * left-edge accent bar (matching the backdrop tint) ties the grid visually
   * to the rest of the admin layout's card language.
   */
  accentBg: string;
  accentBar: string;
}

function CategoryCard({ category, accentBg, accentBar }: CategoryCardProps) {
  return (
    <Card className="relative overflow-hidden border-border transition-shadow hover:shadow-md">
      {/* Left accent bar — matches the section color, not generic primary */}
      <div
        className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
        style={{ background: accentBar }}
        aria-hidden="true"
      />

      <CardContent className="flex flex-col gap-4 p-5 pl-6">
        {/* Emoji backdrop — oversized, primary visual weight */}
        <span
          className="flex size-14 items-center justify-center rounded-2xl text-3xl leading-none select-none"
          style={{ background: accentBg }}
          aria-hidden="true"
        >
          {category.icon}
        </span>

        {/* Name + count */}
        <div className="flex flex-col gap-0.5">
          <p className="text-base font-semibold leading-tight text-foreground">
            {category.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {category.itemCount} {category.itemCount === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Actions — always visible per spec */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            title={`Edit ${category.name}`}
          >
            <Edit2 />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            title={`Delete ${category.name}`}
            className="text-destructive-foreground hover:text-destructive-foreground hover:bg-destructive/10"
          >
            <Trash2 />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminCategoriesPage() {
  return (
    <div className="flex flex-col gap-8">

      {/* ── Header row ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Configuration
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Categories
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage categories for billing and inventory
          </p>
        </div>
        <div className="mt-3 sm:mt-0">
          <Button variant="default">
            <Plus />
            Add Category
          </Button>
        </div>
      </div>

      {/* ── Billing Categories ───────────────────────────────────────────────── */}
      <section>
        {/* Section header */}
        <div className="mb-4 flex items-center gap-2.5">
          <Tag
            className="size-4 shrink-0 stroke-[1.5] text-muted-foreground"
            aria-hidden="true"
          />
          <h2 className="text-sm font-semibold text-foreground">
            Billing Categories
          </h2>
          <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-info text-xs font-semibold text-info-foreground">
            {BILLING_CATEGORIES.length}
          </span>
        </div>

        {/* Card grid — 4 columns on xl so all cards sit in one row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {BILLING_CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              accentBg="oklch(0.93 0.05 220 / 0.5)"
              accentBar="oklch(0.48 0.24 220)"
            />
          ))}
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────────────────── */}
      <div
        className="h-px w-full rounded-full"
        style={{ background: "var(--border)" }}
        aria-hidden="true"
      />

      {/* ── Inventory Categories ─────────────────────────────────────────────── */}
      <section>
        {/* Section header */}
        <div className="mb-4 flex items-center gap-2.5">
          <Tag
            className="size-4 shrink-0 stroke-[1.5] text-muted-foreground"
            aria-hidden="true"
          />
          <h2 className="text-sm font-semibold text-foreground">
            Inventory Categories
          </h2>
          <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-success text-xs font-semibold text-success-foreground">
            {INVENTORY_CATEGORIES.length}
          </span>
        </div>

        {/* Card grid — 4 columns on xl so all cards sit in one row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {INVENTORY_CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              accentBg="oklch(0.94 0.06 162 / 0.45)"
              accentBar="oklch(0.42 0.24 162)"
            />
          ))}
        </div>
      </section>

    </div>
  );
}

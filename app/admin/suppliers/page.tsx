"use client";

import { useState } from "react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { cn } from "@/lib/utils";
import { Plus, Tag, Truck } from "lucide-react";

type Tab = "categories" | "suppliers";

interface SupplierCategory {
  id: number;
  name: string;
  description: string;
  supplierCount: number;
  isActive: boolean;
}

interface Supplier {
  id: number;
  name: string;
  category: string;
  phone: string;
  email: string;
  isActive: boolean;
}

const CATEGORIES: SupplierCategory[] = [
  { id: 1, name: "Dental Instruments", description: "Mirrors, probes, forceps, elevators", supplierCount: 4, isActive: true },
  { id: 2, name: "Dental Materials", description: "Composites, cements, bonding agents", supplierCount: 7, isActive: true },
  { id: 3, name: "Anesthetics & Medications", description: "Local anesthetics, analgesics, antibiotics", supplierCount: 3, isActive: true },
  { id: 4, name: "Orthodontic Supplies", description: "Brackets, wires, bands, aligners", supplierCount: 2, isActive: true },
  { id: 5, name: "Sterilization & Infection Control", description: "Autoclaves, disinfectants, PPE", supplierCount: 5, isActive: true },
  { id: 6, name: "X-Ray & Imaging", description: "Film, digital sensors, phosphor plates", supplierCount: 2, isActive: true },
  { id: 7, name: "Lab Supplies", description: "Plaster, acrylics, wax, dies", supplierCount: 3, isActive: true },
  { id: 8, name: "Disposables & Consumables", description: "Needles, cups, bibs, cotton rolls", supplierCount: 6, isActive: true },
  { id: 9, name: "Equipment & Machinery", description: "Dental chairs, compressors, handpieces", supplierCount: 2, isActive: true },
  { id: 10, name: "Office & Administrative Supplies", description: "Stationery, forms, software", supplierCount: 1, isActive: false },
];

const SUPPLIERS: Supplier[] = [
  { id: 1, name: "MediDent BD Ltd.", category: "Dental Materials", phone: "01711-000001", email: "sales@medident.com", isActive: true },
  { id: 2, name: "Apex Dental Supplies", category: "Dental Instruments", phone: "01711-000002", email: "info@apexdental.com", isActive: true },
  { id: 3, name: "OrthoTech Bangladesh", category: "Orthodontic Supplies", phone: "01711-000003", email: "contact@orthodtech.com", isActive: true },
  { id: 4, name: "Pharma Plus BD", category: "Anesthetics & Medications", phone: "01711-000004", email: "order@pharmacplus.com", isActive: true },
  { id: 5, name: "SteriCare Solutions", category: "Sterilization & Infection Control", phone: "01711-000005", email: "sales@stericare.com", isActive: true },
  { id: 6, name: "DigiRay Imaging", category: "X-Ray & Imaging", phone: "01711-000006", email: "support@digiray.com", isActive: false },
  { id: 7, name: "LabCraft Materials", category: "Lab Supplies", phone: "01711-000007", email: "lab@labcraft.com", isActive: true },
  { id: 8, name: "MedDisposables BD", category: "Disposables & Consumables", phone: "01711-000008", email: "orders@meddisposables.com", isActive: true },
];

export default function SuppliersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("categories");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Suppliers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage supplier categories and supplier records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Tag className="size-4" />
            Add Category
          </Button>
          <Button>
            <Plus className="size-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted/40 p-1 w-fit">
        {(["categories", "suppliers"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium transition-colors capitalize",
              activeTab === tab
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Tag className="size-4" />
              Supplier Categories
              <span className="ml-auto text-xs font-normal text-muted-foreground">{CATEGORIES.length} categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">#</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Category Name</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Description</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Suppliers</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {CATEGORIES.map((cat) => (
                    <tr key={cat.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground text-xs">{cat.id}</td>
                      <td className="px-4 py-3 font-medium text-foreground">{cat.name}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs max-w-xs truncate">{cat.description}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-medium px-2 py-0.5">
                          {cat.supplierCount}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          cat.isActive
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-secondary text-muted-foreground border-border"
                        )}>
                          {cat.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suppliers Tab */}
      {activeTab === "suppliers" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="size-4" />
              All Suppliers
              <span className="ml-auto text-xs font-normal text-muted-foreground">{SUPPLIERS.length} suppliers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Supplier Name</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Category</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Phone</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Email</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {SUPPLIERS.map((sup) => (
                    <tr key={sup.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{sup.name}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{sup.category}</td>
                      <td className="px-4 py-3 text-muted-foreground">{sup.phone}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{sup.email}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          sup.isActive
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-secondary text-muted-foreground border-border"
                        )}>
                          {sup.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Edit</Button>
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Orders</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

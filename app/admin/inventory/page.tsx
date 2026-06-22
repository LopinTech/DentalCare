import { Package, Plus, AlertTriangle, Edit2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

const ITEMS = [
  { name: "Dental Gloves (M)", category: "Consumables", qty: 450, unit: "pairs", min: 100, status: "success", statusLabel: "In Stock" },
  { name: "Anesthetic Cartridges", category: "Medications", qty: 24, unit: "pcs", min: 30, status: "warning", statusLabel: "Low Stock" },
  { name: "Surgical Masks", category: "Safety", qty: 0, unit: "pcs", min: 50, status: "destructive", statusLabel: "Out of Stock" },
  { name: "Dental Floss", category: "Consumables", qty: 80, unit: "rolls", min: 20, status: "success", statusLabel: "In Stock" },
  { name: "X-Ray Film", category: "Equipment", qty: 12, unit: "sheets", min: 20, status: "warning", statusLabel: "Low Stock" },
  { name: "Composite Resin", category: "Materials", qty: 15, unit: "syringes", min: 10, status: "success", statusLabel: "In Stock" },
];

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground">Track dental supplies and equipment</p>
        </div>
        <Button><Plus className="size-4" />Add Item</Button>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {[{ label: "Total Items", value: "84", icon: Package, color: "text-blue-600" },
          { label: "Low Stock", value: "6", icon: AlertTriangle, color: "text-yellow-600" },
          { label: "Out of Stock", value: "2", icon: AlertTriangle, color: "text-red-600" }].map(s => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-4">
              <s.icon className={`size-8 ${s.color}`} />
              <div><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm">All Items</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50">
                <tr>{["Item Name","Category","Qty","Unit","Min Stock","Status","Actions"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ITEMS.map(item=>(
                  <tr key={item.name} className="hover:bg-secondary/30">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                    <td className="px-4 py-3">{item.qty}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.unit}</td>
                    <td className="px-4 py-3">{item.min}</td>
                    <td className="px-4 py-3"><Badge variant={item.status as "success"|"warning"|"destructive"}>{item.statusLabel}</Badge></td>
                    <td className="px-4 py-3"><Button variant="ghost" size="icon-sm"><Edit2 className="size-3.5" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

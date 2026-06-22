import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { FileSignature, Plus, Pill, Edit2, Trash2 } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: 1,
    title: "Post-Extraction",
    medicines: ["Amoxicillin 500mg", "Ibuprofen 400mg", "Antiseptic Mouthwash"],
    active: true,
  },
  {
    id: 2,
    title: "Pain Management",
    medicines: ["Paracetamol 500mg", "Diclofenac 50mg"],
    active: true,
  },
  {
    id: 3,
    title: "Gum Infection",
    medicines: ["Metronidazole 400mg", "Chlorhexidine mouthwash"],
    active: true,
  },
  {
    id: 4,
    title: "Cavity Treatment",
    medicines: ["Fluoride gel", "Calcium supplements"],
    active: true,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrescriptionTemplatesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <FileSignature className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Prescription Templates
          </h1>
        </div>
        <Button className="mt-3 w-fit sm:mt-0">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Template
        </Button>
      </div>

      {/* ── Grid ────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base font-semibold leading-snug">
                  {template.title}
                </CardTitle>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <Badge variant="secondary">
                    {template.medicines.length}{" "}
                    {template.medicines.length === 1 ? "medicine" : "medicines"}
                  </Badge>
                  {template.active && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-4">
              {/* Medicine list */}
              <ul className="flex-1 space-y-2">
                {template.medicines.map((medicine) => (
                  <li
                    key={medicine}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Pill className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                    {medicine}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="flex items-center gap-2 border-t pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-1 items-center gap-1.5"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-1 items-center gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}

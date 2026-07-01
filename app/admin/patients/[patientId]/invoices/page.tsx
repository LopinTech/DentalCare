import { Receipt } from "lucide-react";
import { Button } from "@/ui/button";
import { PatientTabsNav } from "@/components/patient-tabs-nav";

export default async function PatientInvoicesPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;

  return (
    <div className="flex flex-col gap-6">
      {/* Tab navigation */}
      <div className="bg-background rounded-2xl border border-border overflow-hidden">
        <PatientTabsNav patientId={patientId} />
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Invoices & Billing</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Payment history and outstanding invoices.</p>
        </div>
        <Button size="sm">
          <Receipt className="size-4" />
          New Invoice
        </Button>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
          <Receipt className="size-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">No invoices yet</p>
        <p className="text-xs text-muted-foreground mt-1 mb-4">
          Invoices will appear here once billing is created for this patient.
        </p>
        <Button size="sm" variant="outline">
          <Receipt className="size-4" />
          Create Invoice
        </Button>
      </div>
    </div>
  );
}

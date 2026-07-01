import { Stethoscope } from "lucide-react";
import { Button } from "@/ui/button";
import Link from "next/link";
import { PatientTabsNav } from "@/components/patient-tabs-nav";

export default async function PatientTreatmentPage({
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
          <h2 className="text-base font-semibold text-foreground">Treatment Plans</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Active and past treatment plans for this patient.</p>
        </div>
        <Button size="sm">
          <Stethoscope className="size-4" />
          New Plan
        </Button>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
          <Stethoscope className="size-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">No treatment plans yet</p>
        <p className="text-xs text-muted-foreground mt-1 mb-4">
          Create a treatment plan to track procedures and progress.
        </p>
        <Button size="sm" variant="outline">
          <Stethoscope className="size-4" />
          Create First Plan
        </Button>
      </div>
    </div>
  );
}

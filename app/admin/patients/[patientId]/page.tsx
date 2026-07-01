import { PatientDetailTabs } from "@/components/patient-detail-tabs";

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  return <PatientDetailTabs patientId={patientId} />;
}

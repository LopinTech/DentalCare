import { GitFork, Plus, Edit2, Phone, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type ReferrerType = "Doctor" | "Clinic" | "Hospital" | "Individual";
type ReferrerStatus = "Active" | "Inactive";

interface Referrer {
  id: number;
  name: string;
  type: ReferrerType;
  phone: string;
  commission: string;
  status: ReferrerStatus;
  totalReferrals: number;
}

// ─── Placeholder data (replace with DB queries) ───────────────────────────────

const REFERRERS: Referrer[] = [
  {
    id: 1,
    name: "Dr. Farhan Hossain",
    type: "Doctor",
    phone: "+880 1711-234567",
    commission: "10%",
    status: "Active",
    totalReferrals: 34,
  },
  {
    id: 2,
    name: "Medinova Clinic",
    type: "Clinic",
    phone: "+880 1812-345678",
    commission: "8%",
    status: "Active",
    totalReferrals: 21,
  },
  {
    id: 3,
    name: "Popular Hospital Ltd.",
    type: "Hospital",
    phone: "+880 1934-567890",
    commission: "6%",
    status: "Active",
    totalReferrals: 58,
  },
  {
    id: 4,
    name: "Nasrin Akter",
    type: "Individual",
    phone: "+880 1755-678901",
    commission: "5%",
    status: "Inactive",
    totalReferrals: 9,
  },
  {
    id: 5,
    name: "City Dental Associates",
    type: "Clinic",
    phone: "+880 1623-789012",
    commission: "7%",
    status: "Active",
    totalReferrals: 17,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function typeBadge(type: ReferrerType) {
  switch (type) {
    case "Doctor":
      return <Badge variant="info">{type}</Badge>;
    case "Clinic":
      return <Badge variant="default">{type}</Badge>;
    case "Hospital":
      return <Badge variant="warning">{type}</Badge>;
    case "Individual":
      return <Badge variant="secondary">{type}</Badge>;
  }
}

function statusBadge(status: ReferrerStatus) {
  if (status === "Active") {
    return <Badge variant="success">{status}</Badge>;
  }
  return <Badge variant="secondary">{status}</Badge>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminReferrersPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* ── Header row ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Network
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Referrers
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage referral partners and commission rates
          </p>
        </div>
        <div className="mt-3 sm:mt-0">
          <Button variant="default">
            <Plus />
            Add Referrer
          </Button>
        </div>
      </div>

      {/* ── Stats row ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Referrers */}
        <Card className="relative overflow-hidden border-border">
          <div
            className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
            style={{ background: "#16a34a" }}
            aria-hidden="true"
          />
          <CardHeader className="pl-7 pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Total Referrers
              </CardTitle>
              <span
                className="flex items-center justify-center rounded-md p-1.5"
                style={{ background: "#dcfce7" }}
              >
                <GitFork className="size-4 shrink-0" style={{ color: "#16a34a" }} />
              </span>
            </div>
          </CardHeader>
          <CardContent className="pl-7 pb-4">
            <p className="text-3xl font-bold tracking-tight text-foreground">28</p>
            <p className="mt-1 text-xs text-muted-foreground">All sources</p>
          </CardContent>
        </Card>

        {/* Active */}
        <Card className="relative overflow-hidden border-border">
          <div
            className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
            style={{ background: "#16a34a" }}
            aria-hidden="true"
          />
          <CardHeader className="pl-7 pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Active
              </CardTitle>
              <span
                className="flex items-center justify-center rounded-md p-1.5"
                style={{ background: "#dcfce7" }}
              >
                <Users className="size-4 shrink-0" style={{ color: "#16a34a" }} />
              </span>
            </div>
          </CardHeader>
          <CardContent className="pl-7 pb-4">
            <p className="text-3xl font-bold tracking-tight text-foreground">22</p>
            <p className="mt-1 text-xs text-muted-foreground">Currently sending patients</p>
          </CardContent>
        </Card>

        {/* This Month */}
        <Card className="relative overflow-hidden border-border">
          <div
            className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
            style={{ background: "#16a34a" }}
            aria-hidden="true"
          />
          <CardHeader className="pl-7 pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                This Month
              </CardTitle>
              <span
                className="flex items-center justify-center rounded-md p-1.5"
                style={{ background: "#dcfce7" }}
              >
                <TrendingUp className="size-4 shrink-0" style={{ color: "#16a34a" }} />
              </span>
            </div>
          </CardHeader>
          <CardContent className="pl-7 pb-4">
            <p className="text-3xl font-bold tracking-tight text-foreground">14</p>
            <p className="mt-1 text-xs text-muted-foreground">Referrals in June</p>
          </CardContent>
        </Card>

      </div>

      {/* ── Referrers table ─────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            All Referrers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Name
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Type
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                    Phone
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                    Commission
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Total Referrals
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {REFERRERS.map((referrer) => (
                  <tr
                    key={referrer.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* Name */}
                    <td className="px-5 py-3">
                      <span className="font-medium text-foreground">
                        {referrer.name}
                      </span>
                    </td>

                    {/* Type badge */}
                    <td className="hidden px-4 py-3 sm:table-cell">
                      {typeBadge(referrer.type)}
                    </td>

                    {/* Phone */}
                    <td className="hidden px-4 py-3 md:table-cell">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Phone className="size-3.5 shrink-0" />
                        <span className="font-mono text-xs">{referrer.phone}</span>
                      </div>
                    </td>

                    {/* Commission */}
                    <td className="hidden px-4 py-3 lg:table-cell">
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {referrer.commission}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      {statusBadge(referrer.status)}
                    </td>

                    {/* Total Referrals */}
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className="tabular-nums font-medium text-foreground">
                        {referrer.totalReferrals}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        <Edit2 />
                        Edit
                      </Button>
                    </td>
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

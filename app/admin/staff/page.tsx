import { UserCheck, Plus, Edit2, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Avatar } from "@/ui/avatar";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "admin" | "doctor" | "receptionist";
type Status = "Active" | "On Leave" | "Inactive";

interface StaffMember {
  id: number;
  name: string;
  role: Role;
  email: string;
  phone: string;
  joinDate: string;
  status: Status;
}

// ─── Placeholder data (replace with DB queries) ───────────────────────────────

const STAFF: StaffMember[] = [
  {
    id: 1,
    name: "Kamrul Hasan",
    role: "admin",
    email: "kamrul@dentalcare.com",
    phone: "+880 1711-001122",
    joinDate: "Mar 10, 2022",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Fahmida Karim",
    role: "doctor",
    email: "fahmida@dentalcare.com",
    phone: "+880 1812-334455",
    joinDate: "Jul 1, 2022",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Rafiqul Islam",
    role: "doctor",
    email: "rafiqul@dentalcare.com",
    phone: "+880 1934-556677",
    joinDate: "Jan 15, 2023",
    status: "Active",
  },
  {
    id: 4,
    name: "Shamima Akter",
    role: "receptionist",
    email: "shamima@dentalcare.com",
    phone: "+880 1755-778899",
    joinDate: "May 20, 2023",
    status: "On Leave",
  },
  {
    id: 5,
    name: "Nazmul Haque",
    role: "receptionist",
    email: "nazmul@dentalcare.com",
    phone: "+880 1623-990011",
    joinDate: "Nov 3, 2023",
    status: "Active",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin",
  doctor: "Doctor",
  receptionist: "Receptionist",
};

const ROLE_VARIANT: Record<Role, "destructive" | "info" | "success"> = {
  admin: "destructive",
  doctor: "info",
  receptionist: "success",
};

const STATUS_VARIANT: Record<Status, "success" | "warning" | "secondary"> = {
  Active: "success",
  "On Leave": "warning",
  Inactive: "secondary",
};

function roleBadge(role: Role) {
  return (
    <Badge variant={ROLE_VARIANT[role]}>
      {ROLE_LABEL[role]}
    </Badge>
  );
}

function statusBadge(status: Status) {
  return (
    <Badge variant={STATUS_VARIANT[status]}>
      {status}
    </Badge>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminStaffPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* ── Header row ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Management
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Staff
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage clinic staff and roles
          </p>
        </div>
        <div className="mt-3 sm:mt-0">
          <Button variant="default">
            <Plus />
            Add Staff
          </Button>
        </div>
      </div>

      {/* ── Staff table ─────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="size-4 text-muted-foreground" />
            <CardTitle className="text-sm font-semibold text-foreground">
              All Staff Members
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Name
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Role
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                    Email
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                    Phone
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Join Date
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {STAFF.map((member) => (
                  <tr
                    key={member.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* Name + Avatar */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={member.name} size="sm" />
                        <span className="font-medium text-foreground">
                          {member.name}
                        </span>
                      </div>
                    </td>

                    {/* Role badge */}
                    <td className="px-4 py-3">
                      {roleBadge(member.role)}
                    </td>

                    {/* Email */}
                    <td className="hidden px-4 py-3 md:table-cell">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Mail className="size-3.5 shrink-0" aria-hidden="true" />
                        <span className="text-xs">{member.email}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="hidden px-4 py-3 font-mono text-xs text-muted-foreground lg:table-cell">
                      {member.phone}
                    </td>

                    {/* Join Date */}
                    <td className="hidden px-4 py-3 font-mono text-xs text-muted-foreground sm:table-cell">
                      {member.joinDate}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      {statusBadge(member.status)}
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

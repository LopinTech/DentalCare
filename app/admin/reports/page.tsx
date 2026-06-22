import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";

const topServices = [
  { name: "Root Canal", revenue: "৳42,000" },
  { name: "Dental Implant", revenue: "৳35,700" },
  { name: "Crown Fitting", revenue: "৳27,900" },
  { name: "Tooth Extraction", revenue: "৳20,800" },
  { name: "Teeth Whitening", revenue: "৳11,400" },
];

const revenueByDoctor = [
  { name: "Dr. Anwar Karim", revenue: "৳58,400", patients: 43 },
  { name: "Dr. Sumaiya Sultana", revenue: "৳46,800", patients: 37 },
  { name: "Dr. Rafiqul Islam", revenue: "৳29,600", patients: 34 },
  { name: "Dr. Mithila Chowdhury", revenue: "৳10,400", patients: 28 },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Reports
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Financial and operational reports
        </p>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="size-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">৳145,200</p>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
            <BarChart3 className="size-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">৳42,800</p>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Profit
            </CardTitle>
            <TrendingUp className="size-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">৳102,400</p>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Patients
            </CardTitle>
            <Users className="size-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">142</p>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Side-by-side Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">
              Top Services
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Highest revenue-generating services this month
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {topServices.map((service, index) => (
                <li
                  key={service.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold p-0 shrink-0"
                    >
                      {index + 1}
                    </Badge>
                    <span className="truncate text-sm text-foreground">
                      {service.name}
                    </span>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-foreground">
                    {service.revenue}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Revenue by Doctor */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">
              Revenue by Doctor
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Individual doctor revenue contribution this month
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {revenueByDoctor.map((doctor) => (
                <li
                  key={doctor.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="truncate text-sm font-medium text-foreground">
                      {doctor.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {doctor.patients} patients
                    </span>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-foreground">
                    {doctor.revenue}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

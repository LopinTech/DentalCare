import Link from "next/link";
import {
  CalendarPlus,
  CalendarCheck,
  User,
  Phone,
  Calendar,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";

const quickActions = [
  {
    label: "Book Appointment",
    description: "Schedule a new visit",
    href: "/appointment",
    icon: CalendarPlus,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badge: null,
  },
  {
    label: "My Appointments",
    description: "View all your visits",
    href: "/dashboard/appointments",
    icon: CalendarCheck,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: null,
  },
  {
    label: "My Profile",
    description: "Update your details",
    href: "/dashboard/profile",
    icon: User,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    badge: null,
  },
  {
    label: "Contact Us",
    description: "Get in touch with us",
    href: "/#contact",
    icon: Phone,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    badge: null,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 md:pb-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-6 py-8 text-white shadow-sm">
        <p className="text-sm font-medium text-white/75 mb-1">Patient Portal</p>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back! 👋</h1>
        <p className="mt-1 text-white/80 text-sm">Manage your dental health</p>
        <div className="mt-4">
          <Link href="/appointment">
            <Button
              className="bg-white text-primary hover:bg-white/90 border-0 font-semibold"
              size="sm"
            >
              <CalendarPlus />
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href} className="group">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="p-4 flex flex-col gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.iconBg} shrink-0`}
                    >
                      <Icon className={`size-5 ${action.iconColor}`} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-tight">
                        {action.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Upcoming Appointments */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">Upcoming Appointments</h2>
          <Link href="/dashboard/appointments">
            <Button variant="ghost" size="sm" className="text-primary text-xs h-7 px-2">
              View all
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="py-12 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
              <Calendar className="size-7 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">No upcoming appointments</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                You have no scheduled visits at this time.
              </p>
            </div>
            <Link href="/appointment">
              <Button size="sm" className="mt-1">
                <CalendarPlus />
                Book Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Recent Invoices */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">Recent Invoices</h2>
          <Badge variant="secondary" className="text-xs">
            0 invoices
          </Badge>
        </div>
        <Card>
          <CardContent className="py-12 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
              <FileText className="size-7 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">No invoices yet</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your billing history will appear here after your first visit.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

import { Clock, Plus, Edit2, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type DaySchedule = {
  day: string;
  isOpen: boolean;
  openTime: string | null;
  closeTime: string | null;
  breakStart: string | null;
  breakEnd: string | null;
  slotDuration: number | null; // minutes
  maxAppointments: number | null;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    day: "Sunday",
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
    breakStart: "13:00",
    breakEnd: "14:00",
    slotDuration: 30,
    maxAppointments: 20,
  },
  {
    day: "Monday",
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
    breakStart: "13:00",
    breakEnd: "14:00",
    slotDuration: 30,
    maxAppointments: 20,
  },
  {
    day: "Tuesday",
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
    breakStart: "13:00",
    breakEnd: "14:00",
    slotDuration: 30,
    maxAppointments: 20,
  },
  {
    day: "Wednesday",
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
    breakStart: "13:00",
    breakEnd: "14:00",
    slotDuration: 30,
    maxAppointments: 20,
  },
  {
    day: "Thursday",
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
    breakStart: "13:00",
    breakEnd: "14:00",
    slotDuration: 30,
    maxAppointments: 20,
  },
  {
    day: "Friday",
    isOpen: false,
    openTime: null,
    closeTime: null,
    breakStart: null,
    breakEnd: null,
    slotDuration: null,
    maxAppointments: null,
  },
  {
    day: "Saturday",
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
    breakStart: "13:00",
    breakEnd: "14:00",
    slotDuration: 30,
    maxAppointments: 20,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute} ${period}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SchedulesPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Configuration
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Clinic Schedules
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage opening hours and schedule overrides
          </p>
        </div>
      </div>

      {/* ── Weekly Schedule ──────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-[#16a34a]" />
              <CardTitle className="text-sm font-semibold text-foreground">
                Weekly Schedule
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Day
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Open Time
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Close Time
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                    Break
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                    Slot Duration
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                    Max Appointments
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {WEEKLY_SCHEDULE.map((row) => (
                  <tr
                    key={row.day}
                    className="relative transition-colors hover:bg-muted/30"
                  >
                    {/*
                      Aesthetic risk: a left-border color tick communicates
                      open/closed state before the eye reads any text —
                      data-density borrowed from Gantt chart logic.
                    */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="block h-5 w-0.5 shrink-0 rounded-full"
                          style={{
                            background: row.isOpen ? "#16a34a" : "#f87171",
                          }}
                        />
                        <span className="font-medium text-foreground">
                          {row.day}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {row.isOpen ? (
                        <Badge variant="success">Open</Badge>
                      ) : (
                        <Badge variant="destructive">Closed</Badge>
                      )}
                    </td>
                    <td className="hidden px-4 py-3 font-mono text-xs text-muted-foreground sm:table-cell">
                      {row.openTime ? formatTime(row.openTime) : "—"}
                    </td>
                    <td className="hidden px-4 py-3 font-mono text-xs text-muted-foreground sm:table-cell">
                      {row.closeTime ? formatTime(row.closeTime) : "—"}
                    </td>
                    <td className="hidden px-4 py-3 font-mono text-xs text-muted-foreground lg:table-cell">
                      {row.breakStart && row.breakEnd
                        ? `${formatTime(row.breakStart)} – ${formatTime(row.breakEnd)}`
                        : "—"}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {row.slotDuration != null ? (
                        <span>
                          {row.slotDuration}
                          <span className="ml-0.5 text-xs">min</span>
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {row.maxAppointments != null ? row.maxAppointments : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${row.day} schedule`}
                      >
                        <Edit2 />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ── Schedule Overrides ───────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 shrink-0 text-[#16a34a]" />
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Schedule Overrides
                </CardTitle>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Holidays and one-off closures
                </p>
              </div>
            </div>
            <Button variant="default" size="sm">
              <Plus />
              Add Override
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Empty state */}
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <div
              className="flex size-12 items-center justify-center rounded-xl"
              style={{ background: "#dcfce7" }}
              aria-hidden="true"
            >
              <Calendar
                className="size-5"
                style={{ color: "#16a34a", strokeWidth: 1.5 }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-foreground">
                No overrides added
              </p>
              <p className="max-w-xs text-xs text-muted-foreground">
                Add holidays or special closures to let patients know when the
                clinic is unavailable.
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Plus />
              Add Override
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

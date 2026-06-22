"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";

export default function NewDoctorPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [biography, setBiography] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle doctor creation
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-sm"
          onClick={() => router.push("/admin/doctors")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Add New Doctor</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Account Section */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                placeholder="Dr. Jane Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Info</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="specialization" className="text-sm font-medium">
                Specialization
              </label>
              <Select
                id="specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              >
                <option value="" disabled>
                  Select specialization
                </option>
                <option value="General Dentistry">General Dentistry</option>
                <option value="Orthodontics">Orthodontics</option>
                <option value="Oral Surgery">Oral Surgery</option>
                <option value="Periodontics">Periodontics</option>
                <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="licenseNumber" className="text-sm font-medium">
                License Number
              </label>
              <Input
                id="licenseNumber"
                placeholder="LIC-000000"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="experience" className="text-sm font-medium">
                Experience (years)
              </label>
              <Input
                id="experience"
                type="number"
                min={0}
                placeholder="0"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="consultationFee" className="text-sm font-medium">
                Consultation Fee
              </label>
              <Input
                id="consultationFee"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                value={consultationFee}
                onChange={(e) => setConsultationFee(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bio Section */}
        <Card>
          <CardHeader>
            <CardTitle>Bio</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="biography" className="text-sm font-medium">
                Biography
              </label>
              <textarea
                id="biography"
                rows={5}
                placeholder="Write a short biography for this doctor..."
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Create Doctor</Button>
        </div>
      </form>
    </div>
  );
}

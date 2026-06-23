"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";

export default function EditPatientPage({
  params,
}: {
  params: { patientId: string };
}) {
  const router = useRouter();

  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+1 (555) 000-1234");
  const [dateOfBirth, setDateOfBirth] = useState("1985-06-15");
  const [gender, setGender] = useState("male");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [address, setAddress] = useState("123 Main Street, Springfield, IL 62701");

  const [emergencyName, setEmergencyName] = useState("Jane Doe");
  const [emergencyPhone, setEmergencyPhone] = useState("+1 (555) 000-5678");
  const [emergencyRelation, setEmergencyRelation] = useState("Spouse");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patientData = {
      patientId: params.patientId,
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      bloodGroup,
      address,
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        relation: emergencyRelation,
      },
    };
    console.log("Saving patient:", patientData);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push(`/admin/patients/${params.patientId}`)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit Patient</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="patientId" className="text-sm font-medium">
                Patient ID
              </label>
              <Input
                id="patientId"
                type="text"
                value="#001"
                readOnly
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name"
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
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone <span className="text-destructive">*</span>
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="dateOfBirth" className="text-sm font-medium">
                  Date of Birth
                </label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="gender" className="text-sm font-medium">
                  Gender
                </label>
                <Select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="bloodGroup" className="text-sm font-medium">
                  Blood Group
                </label>
                <Select
                  id="bloodGroup"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <textarea
                id="address"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="emergencyName" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="emergencyName"
                  type="text"
                  placeholder="Contact name"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="emergencyPhone" className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  placeholder="Contact phone"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="emergencyRelation"
                  className="text-sm font-medium"
                >
                  Relation
                </label>
                <Input
                  id="emergencyRelation"
                  type="text"
                  placeholder="e.g. Spouse, Parent"
                  value={emergencyRelation}
                  onChange={(e) => setEmergencyRelation(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}

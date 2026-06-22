import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Avatar } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { User, Mail, Phone, Heart } from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 234-5678",
    dateOfBirth: "1990-04-15",
    bloodGroup: "O+",
    gender: "Male",
    address: "123 Main Street, Springfield, IL 62701",
    memberSince: "January 2023",
    initials: "JD",
  };

  const emergencyContact = {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543",
    email: "jane.doe@example.com",
  };

  const medicalInfo = {
    allergies: ["Penicillin", "Latex", "Aspirin"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage your personal information
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Profile Card */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <Avatar name={user.name} size="lg" />

              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </p>
              </div>

              <Badge variant="secondary" className="capitalize">
                Patient
              </Badge>

              <div className="w-full pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-400">Member since</p>
                <p className="text-sm font-medium text-gray-700 mt-0.5">
                  {user.memberSince}
                </p>
              </div>

              <Button variant="outline" className="w-full mt-2">
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Personal Information Form Card */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input
                    value={user.name}
                    readOnly
                    className="bg-gray-50 cursor-default"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    value={user.email}
                    readOnly
                    disabled
                    className="bg-gray-100 cursor-not-allowed text-gray-500"
                  />
                  <p className="text-xs text-gray-400">
                    Email cannot be changed
                  </p>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    Phone Number
                  </label>
                  <Input
                    value={user.phone}
                    readOnly
                    className="bg-gray-50 cursor-default"
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={user.dateOfBirth}
                    readOnly
                    className="bg-gray-50 cursor-default"
                  />
                </div>

                {/* Blood Group */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-500" />
                    Blood Group
                  </label>
                  <Input
                    value={user.bloodGroup}
                    readOnly
                    className="bg-gray-50 cursor-default"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <Input
                    value={user.gender}
                    readOnly
                    className="bg-gray-50 cursor-default"
                  />
                </div>

                {/* Address - full width */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    value={user.address}
                    readOnly
                    rows={3}
                    className="w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm text-gray-900 cursor-default resize-none focus:outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Emergency Contact Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Phone className="w-4 h-4 text-orange-500" />
            Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Contact Name
              </p>
              <p className="text-sm font-medium text-gray-900">
                {emergencyContact.name}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Relationship
              </p>
              <p className="text-sm font-medium text-gray-900">
                {emergencyContact.relationship}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-900">
                {emergencyContact.phone}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Email
              </p>
              <p className="text-sm font-medium text-gray-900">
                {emergencyContact.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            Medical Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Allergies */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">Allergies</p>
              {medicalInfo.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {medicalInfo.allergies.map((allergy) => (
                    <Badge
                      key={allergy}
                      variant="destructive"
                      className="text-xs"
                    >
                      {allergy}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No known allergies
                </p>
              )}
            </div>

            {/* Current Medications */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                Current Medications
              </p>
              {medicalInfo.medications.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {medicalInfo.medications.map((med) => (
                    <Badge
                      key={med}
                      variant="secondary"
                      className="text-xs bg-blue-50 text-blue-700 border border-blue-200"
                    >
                      {med}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No current medications
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

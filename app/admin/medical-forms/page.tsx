import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { FileQuestion, Plus, Edit2, Trash2, GripVertical } from "lucide-react";

type FieldType = "text" | "textarea" | "dropdown" | "yesno";
type QuestionStatus = "active" | "inactive";

interface MedicalFormQuestion {
  id: number;
  title: string;
  type: FieldType;
  required: boolean;
  status: QuestionStatus;
}

const questions: MedicalFormQuestion[] = [
  { id: 1, title: "Known Allergies",           type: "textarea",  required: true,  status: "active" },
  { id: 2, title: "Blood Group",               type: "dropdown",  required: false, status: "active" },
  { id: 3, title: "Previous Dental Treatment", type: "yesno",     required: true,  status: "active" },
  { id: 4, title: "Current Medications",       type: "textarea",  required: false, status: "active" },
  { id: 5, title: "Emergency Contact",         type: "text",      required: true,  status: "active" },
];

const typeLabels: Record<FieldType, string> = {
  text:     "Text",
  textarea: "Textarea",
  dropdown: "Dropdown",
  yesno:    "Yes / No",
};

const typeColors: Record<FieldType, string> = {
  text:     "bg-gray-100 text-gray-700",
  textarea: "bg-purple-100 text-purple-700",
  dropdown: "bg-yellow-100 text-yellow-700",
  yesno:    "bg-blue-100 text-blue-700",
};

export default function MedicalFormsPage() {
  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileQuestion className="h-6 w-6 text-gray-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Medical Forms</h1>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Question
        </Button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 text-blue-700 border border-blue-200 rounded-lg p-3 text-sm">
        These questions appear in the patient intake form
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium text-gray-700">Questions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 text-left w-8" aria-hidden="true" />
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Required</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr
                    key={question.id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-400 cursor-grab">
                      <GripVertical className="h-4 w-4" aria-hidden="true" />
                    </td>

                    <td className="px-4 py-3 font-medium text-gray-800">
                      {question.title}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColors[question.type]}`}
                      >
                        {typeLabels[question.type]}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {question.required ? (
                        <Badge className="bg-red-100 text-red-700 border-0 text-xs">
                          Required
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-500 border-0 text-xs">
                          Optional
                        </Badge>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <Badge className="bg-green-100 text-green-700 border-0 text-xs capitalize">
                        {question.status}
                      </Badge>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 rounded hover:bg-blue-50 text-blue-600 transition-colors"
                          aria-label={`Edit "${question.title}"`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"
                          aria-label={`Delete "${question.title}"`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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

import { GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";

const EducationForm = ({ data, onChange }) => {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: "",
        };
        onChange([...data, newEducation]);
    };

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <div className="space-y-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        Education
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Add your academic background
                    </p>
                </div>

                <button
                    onClick={addEducation}
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
                >
                    <Plus className="size-4" />
                    Add Education
                </button>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-2xl py-14 text-center bg-gray-50">
                    <GraduationCap className="size-12 text-gray-400 mb-4" />
                    <p className="text-gray-700 font-medium">
                        No education added yet.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Click "Add Education" to get started.
                    </p>
                </div>
            ) : (

                <div className="space-y-8">

                    {data.map((education, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-white shadow-sm hover:shadow-md transition"
                        >

                            {/* Card Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-semibold text-gray-800 text-base">
                                    Education #{index + 1}
                                </h4>

                                <button
                                    onClick={() => removeEducation(index)}
                                    className="p-2 rounded-md text-red-500 hover:bg-red-50 transition"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            {/* Main Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Institution */}
                                <input
                                    value={education.institution || ""}
                                    onChange={(e) =>
                                        updateEducation(index, "institution", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Institution Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />

                                {/* Degree */}
                                <input
                                    value={education.degree || ""}
                                    onChange={(e) =>
                                        updateEducation(index, "degree", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Degree"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />

                                {/* Field of Study */}
                                <input
                                    value={education.field || ""}
                                    onChange={(e) =>
                                        updateEducation(index, "field", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Field of Study"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />

                                {/* Graduation Date */}
                                <input
                                    value={education.graduation_date || ""}
                                    onChange={(e) =>
                                        updateEducation(index, "graduation_date", e.target.value)
                                    }
                                    type="month"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            </div>

                            {/* GPA */}
                            <div className="mt-5">
                                <input
                                    value={education.gpa || ""}
                                    onChange={(e) =>
                                        updateEducation(index, "gpa", e.target.value)
                                    }
                                    type="text"
                                    placeholder="GPA (optional)"
                                    className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default EducationForm;

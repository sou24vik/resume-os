import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {

    const { token } = useSelector(state => state.auth)

    const [GeneratingIndex, setGeneratingIndex] = useState(-1)

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };
        onChange([...data, newExperience]);
    };

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    // Generate Description 
    const generateDescription = async (index) => {

        setGeneratingIndex(index)
        const experience = data[index]
        const prompt = `enhance this job description "${experience.description}" for the position of ${experience.position} at ${experience.company}.`

        try {
            const response = await api.post("/api/ai/enhance-job-desc", { userContent: prompt }, {
                headers: {
                    Authorization: token
                }
            })
            updateExperience(index, "description", response.data.enhancedContent)
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setGeneratingIndex(-1)
        }
    }

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Professional Experience
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Add your job experiences
                    </p>
                </div>

                <button
                    onClick={addExperience}
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
                >
                    <Plus className="size-4" />
                    Add Experience
                </button>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl py-12 text-center bg-gray-50">
                    <Briefcase className="size-10 text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium">
                        No work experience added yet.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Click "Add Experience" to get started.
                    </p>
                </div>
            ) : (

                <div className="space-y-6">

                    {data.map((experience, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm space-y-6"
                        >

                            {/* Card Header */}
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-800">
                                    Experience #{index + 1}
                                </h4>
                                <button
                                    onClick={() => removeExperience(index)}
                                    className="p-2 rounded-md text-red-500 hover:bg-red-50 transition"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            {/* Grid Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <input
                                    value={experience.company || ""}
                                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                                    type="text"
                                    placeholder="Company Name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />

                                <input
                                    value={experience.position || ""}
                                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                                    type="text"
                                    placeholder="Job Title"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />

                                <input
                                    value={experience.start_date || ""}
                                    onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                                    type="month"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />

                                <input
                                    value={experience.end_date || ""}
                                    onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                                    type="month"
                                    disabled={experience.is_current}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none disabled:bg-gray-100"
                                />
                            </div>

                            {/* Checkbox */}
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={experience.is_current || false}
                                    onChange={(e) =>
                                        updateExperience(index, "is_current", e.target.checked)
                                    }
                                    className="accent-green-600"
                                />
                                Currently working here
                            </label>

                            {/* Description */}
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <label className="font-medium text-gray-700">
                                        Job Description
                                    </label>

                                    <button
                                        onClick={() => generateDescription(index)}
                                        disabled={GeneratingIndex === index || !experience.position || !experience.company}
                                        type="button"
                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-linear-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition shadow-sm whitespace-nowrap"
                                    >
                                        {GeneratingIndex === index ? (
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : (
                                            <Sparkles className="size-4" />
                                        )}
                                        Enhance with AI
                                    </button>
                                </div>

                                <textarea
                                    value={experience.description || ""}
                                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                                    rows={4}
                                    placeholder="Describe your key responsibilities and achievements..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                                />
                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default ExperienceForm;

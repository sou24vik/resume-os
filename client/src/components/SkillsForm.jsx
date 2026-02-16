import React, { useState } from "react";
import { Plus, Sparkles, X } from "lucide-react";

const SkillsForm = ({ data, onChange }) => {

    const [newSkill, setNewSkill] = useState("");

    const addSkill = () => {
        if (newSkill.trim() && !data.includes(newSkill.trim())) {
            onChange([...data, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900">
                    Skills
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    Add your technical and soft skills
                </p>
            </div>

            {/* Input Section */}
            <div className="flex flex-col sm:flex-row gap-3">

                <input
                    onChange={(e) => setNewSkill(e.target.value)}
                    value={newSkill}
                    onKeyDown={handleKeyPress}
                    type="text"
                    placeholder="Enter a skill (e.g., JavaScript, Project Management)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />

                <button
                    onClick={addSkill}
                    disabled={!newSkill.trim()}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium 
                               bg-indigo-600 text-white rounded-xl 
                               hover:bg-indigo-700 transition 
                               disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    <Plus className="size-4" />
                    Add
                </button>

            </div>

            {/* Skills List */}
            {data.length > 0 ? (
                <div className="flex flex-wrap gap-3">

                    {data.map((skill, index) => (
                        <span
                            key={index}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-100 shadow-sm"
                        >
                            {skill}
                            <button
                                onClick={() => removeSkill(index)}
                                className="text-indigo-500 hover:text-red-500 transition"
                            >
                                <X className="size-4" />
                            </button>
                        </span>
                    ))}

                </div>
            ) : (
                <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-2xl py-12 text-center bg-gray-50">
                    <Sparkles className="size-10 text-gray-400 mb-3" />
                    <p className="text-gray-700 font-medium">
                        No skills added yet.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Add your technical and soft skills above.
                    </p>
                </div>
            )}

            {/* Tip Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Tip:</strong> Add 8–12 relevant skills. Include both
                    technical skills (programming languages, tools) and soft
                    skills (Leadership, Communication).
                </p>
            </div>

        </div>
    );
};

export default SkillsForm;

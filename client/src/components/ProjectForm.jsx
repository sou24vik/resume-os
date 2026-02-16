import { Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",
        };
        onChange([...data, newProject]);
    };

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateProject = (index, field, value) => {
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
                        Projects
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Showcase your key projects and contributions
                    </p>
                </div>

                <button
                    onClick={addProject}
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
                >
                    <Plus className="size-4" />
                    Add Project
                </button>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-2xl py-14 text-center bg-gray-50">
                    <p className="text-gray-700 font-medium">
                        No projects added yet.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Click "Add Project" to showcase your work.
                    </p>
                </div>
            ) : (

                <div className="space-y-8">

                    {data.map((project, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-white shadow-sm hover:shadow-md transition"
                        >

                            {/* Card Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-semibold text-gray-800 text-base">
                                    Project #{index + 1}
                                </h4>

                                <button
                                    onClick={() => removeProject(index)}
                                    className="p-2 rounded-md text-red-500 hover:bg-red-50 transition"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            {/* Grid Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Project Name */}
                                <input
                                    value={project.name || ""}
                                    onChange={(e) =>
                                        updateProject(index, "name", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Project Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />

                                {/* Project Type */}
                                <input
                                    value={project.type || ""}
                                    onChange={(e) =>
                                        updateProject(index, "type", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Project Type (e.g. Web App, Mobile App)"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />

                            </div>

                            {/* Description Full Width */}
                            <div className="mt-5">
                                <textarea
                                    rows={4}
                                    value={project.description || ""}
                                    onChange={(e) =>
                                        updateProject(index, "description", e.target.value)
                                    }
                                    placeholder="Describe the project, your role, technologies used, and key achievements..."
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

export default ProjectForm;

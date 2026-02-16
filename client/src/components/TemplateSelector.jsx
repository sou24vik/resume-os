import { Check, Layout } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {

    const [isOpen, setIsOpen] = useState(false)

    const templates = [
        {
            id: "classic",
            name: "Classic",
            preview: "Traditional resume layout with clear structure and professional styling"
        },
        {
            id: "modern",
            name: "Modern",
            preview: "Contemporary design with bold headings and accent highlights"
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            preview: "Clean layout with profile image and balanced typography"
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "Ultra-clean layout focused purely on content readability"
        }
    ]

    return (
        <div className='relative'>

            {/* Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm text-blue-600 bg-linear-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
            >
                <Layout size={16} />
                <span className='hidden sm:inline'>Template</span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-96 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-4 space-y-3 animate-in fade-in zoom-in duration-150">

                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Choose Template
                    </h4>

                    {templates.map((template) => {

                        const isSelected = selectedTemplate === template.id

                        return (
                            <div
                                key={template.id}
                                onClick={() => {
                                    onChange(template.id)
                                    setIsOpen(false)
                                }}
                                className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200
                                ${isSelected
                                        ? "border-blue-500 bg-blue-50 shadow-sm"
                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                            >

                                {/* Selected Check */}
                                {isSelected && (
                                    <div className="absolute top-4 right-4 text-blue-600">
                                        <Check size={18} />
                                    </div>
                                )}

                                {/* Template Content */}
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">
                                        {template.name}
                                    </h4>

                                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                        {template.preview}
                                    </p>
                                </div>

                            </div>
                        )
                    })}

                </div>
            )}
        </div>
    )
}

export default TemplateSelector

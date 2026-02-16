import { Check, Palette } from 'lucide-react'
import React, { useState } from 'react'

const ColorPicker = ({ selectedColor, onChange }) => {

    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Pink", value: "#EC4899" },
        { name: "Red", value: "#EF4444" },
        { name: "Orange", value: "#F97316" },
        { name: "Amber", value: "#F59E0B" },
        { name: "Green", value: "#10B981" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Cyan", value: "#06B6D4" },
        { name: "Slate", value: "#334155" },
        { name: "Black", value: "#1F2937" },
    ]

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative'>

            {/* Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm text-purple-600 bg-linear-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
            >
                <Palette size={16} />
                <span className='hidden sm:inline'>Accent</span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-5 w-80 animate-in fade-in zoom-in duration-150">

                    <h4 className="text-sm font-semibold text-gray-700 mb-4">
                        Choose Accent Color
                    </h4>

                    <div className="grid grid-cols-4 gap-5">
                        {colors.map((color) => {
                            const isSelected = selectedColor === color.value

                            return (
                                <div
                                    key={color.value}
                                    onClick={() => {
                                        onChange(color.value)
                                        setIsOpen(false)
                                    }}
                                    className="flex flex-col items-center gap-2 cursor-pointer group"
                                >
                                    <div
                                        className={`relative w-11 h-11 rounded-full shadow-md transition-all duration-200
                                        ${isSelected ? "ring-4 ring-offset-2 ring-gray-300 scale-105" : "hover:scale-110"}`}
                                        style={{ backgroundColor: color.value }}
                                    >
                                        {isSelected && (
                                            <Check
                                                size={16}
                                                className="absolute inset-0 m-auto text-white"
                                            />
                                        )}
                                    </div>

                                    <span className="text-xs text-gray-600 group-hover:text-gray-900 transition">
                                        {color.name}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                </div>
            )}
        </div>
    )
}

export default ColorPicker

import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
        { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
        { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url" },
    ]

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800">
                    Personal Information
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    Get started with your personal details
                </p>
            </div>

            {/* Profile Upload */}
            <div className="flex flex-col items-center sm:items-start gap-4">

                <label className="cursor-pointer group">
                    {data.image ? (
                        <img
                            src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                            alt='user-image'
                            className='w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-sm group-hover:scale-105 transition'
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-500 transition">
                            <User className='w-8 h-8 mb-2' />
                            <span className="text-xs text-center px-2">
                                Upload user image
                            </span>
                        </div>
                    )}
                    <input
                        type="file"
                        accept='image/jpeg, image/png'
                        onChange={(e) => handleChange("image", e.target.files[0])}
                        className='hidden'
                    />
                </label>

                {/* Remove Background Toggle */}
                {typeof data.image === 'object' && (
                    <div className="flex items-center gap-3 mt-2">

                        <p className="text-sm text-gray-600">
                            Remove Background
                        </p>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                onChange={() => setRemoveBackground(prev => !prev)}
                                checked={removeBackground}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></span>
                        </label>

                    </div>
                )}
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fields.map((field) => {
                    const Icon = field.icon
                    return (
                        <div key={field.key} className="flex flex-col gap-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <Icon className="w-4 h-4 text-gray-400" />
                                {field.label}
                                {field.required && <span className="text-red-500">*</span>}
                            </label>

                            <input
                                type={field.type}
                                value={data[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className='w-full px-4 py-2.5 text-sm'
                                placeholder={`Enter your ${field.label.toLowerCase()}`}
                                required={field.required}
                            />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default PersonalInfoForm

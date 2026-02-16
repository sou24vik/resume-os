import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {

    const { token } = useSelector(state => state.auth)

    const [isGenerating, setIsGenerating] = useState(false)

    // Generate Summary
    const generateSummary = async () => {
        try {
            setIsGenerating(true)
            const prompt = `enhance my professional summary "${data}"`
            const response = await api.post("/api/ai/enhance-pro-sum", { userContent: prompt }, {
                headers: {
                    Authorization: token
                }
            })
            setResumeData(prev => ({ ...prev, professional_summary: response.data.enhancedContent }))
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
        finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="space-y-6">

            {/* Header + AI Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Professional Summary
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Add a short summary highlighting your strengths and career goals
                    </p>
                </div>

                <button
                    onClick={generateSummary}
                    disabled={isGenerating}
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-linear-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 transition shadow-sm whitespace-nowrap sm:whitespace-nowrap"
                >
                    {isGenerating ? (
                        <Loader2 className='size-4 animate-spin' />
                    ) : (
                        <Sparkles className='size-4' />
                    )}
                    {isGenerating ? "Enhancing..." : "AI Enhance"}
                </button>

            </div>

            {/* Textarea */}
            <div className="space-y-3">

                <textarea
                    value={data || ""}
                    onChange={(e) => onChange(e.target.value)}
                    rows={7}
                    placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition"
                />

                <p className="text-xs text-gray-500 leading-relaxed">
                    Tip: Keep it concise (3–4 sentences) and focus on your most relevant
                    achievements and skills.
                </p>

            </div>

        </div>
    )
}

export default ProfessionalSummaryForm

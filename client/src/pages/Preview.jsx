import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../configs/api'

const Preview = () => {

  const { resumeId } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/public/" + resumeId)
      setResumeData(data.resume)

    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResume()
  }, [])

  return resumeData ? (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Top Bar */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Home
          </a>
        </div>
      </div>

      {/* Resume Container */}
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden">
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
            classes="py-8 px-6 sm:px-10"
          />
        </div>
      </div>

    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      {isLoading ? (
        <Loader />
      ) : (
        <div className="text-center bg-white p-8 rounded-2xl shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Resume Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The resume you’re looking for does not exist or may have been removed.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <ArrowLeftIcon className="size-4" />
            Go to Home Page
          </a>
        </div>
      )}

    </div>
  )

}

export default Preview

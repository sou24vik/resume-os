import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadCloud, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {

  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  })

  // Load Existing Resume
  const loadExistingResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId, {
        headers: {
          Authorization: token
        }
      })

      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title
      }
    } catch (error) {
      console.log(error.message);

    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: "personl", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    loadExistingResume()
  }, [])

  // Change Resume Visibility
  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: {
          Authorization: token
        }
      })
      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch (error) {
      console.error("Error Saving Resume", error);
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0]
    const resumeUrl = frontendUrl + '/view/' + resumeId

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "MyResume", })
    } else {
      alert("Share not supported on this browser.")
    }
  }

  const downloadResume = () => {
    window.print()
  }

  // Save Resume Data
  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData)

      // remove image from updatedResumeData
      if (typeof resumeData.personal_info === "object") {
        delete updatedResumeData.personal_info.image
      }

      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify(updatedResumeData))
      removeBackground && formData.append("removeBackground", "yes")

      typeof resumeData.personal_info === "object" && formData.append("image", resumeData.personal_info.image)

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: {
          Authorization: token
        }
      })

      setResumeData(data.resume)
      toast.success(data.message)

    } catch (error) {
      console.error("Error saving Resume", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== Top Header Row ===== */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* ===== Main Layout ===== */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">

          {/* ===== Left Panel - Form ===== */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 relative">

            <div className="relative pt-6">

              {/* Progress Bar */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200 rounded-full" />
              <hr
                className="absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to-green-600 border-none rounded-full transition-all duration-500"
                style={{
                  width: `${activeSectionIndex * 100 / (sections.length - 1)}%`,
                }}
              />

              {/* Section Navigation */}
              <div className="flex items-center justify-between mt-6 mb-8">

                {/* Previous */}
                <div>
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}
                </div>

                {/* Next */}
                <div>
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1)
                      )
                    }
                    className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>

              </div>


              {/* Form Content */}
              <div className="mt-4">
                {activeSection.id === "personl" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) => setResumeData(prev => ({
                      ...prev,
                      professional_summary: data
                    }))}
                    setResumeData={setResumeData} />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                )}

              </div>
              <button
                onClick={() => { toast.promise(saveResume, { loading: "Saving..." }) }}
                type="button"
                className="mt-8 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-sm hover:shadow-md"
              >
                Save Changes
              </button>

            </div>
          </div>

          {/* ===== Right Panel - Preview ===== */}
          <div className="flex flex-col">

            {/* Buttons attached to preview column (LEFT aligned) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

              {/* Left Side - Template & Accent */}
              <div className="flex items-center gap-3">
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onChange={(template) =>
                    setResumeData(prev => ({ ...prev, template }))
                  }
                />
                <ColorPicker
                  selectedColor={resumeData.accent_color}
                  onChange={(color) =>
                    setResumeData(prev => ({ ...prev, accent_color: color }))
                  }
                />
              </div>

              {/* Right Side - Share / Public / Download */}
              <div className="flex flex-wrap items-center gap-3">

                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm 
                   bg-indigo-600 text-white rounded-lg 
                   hover:bg-indigo-700 transition shadow-sm"
                  >
                    <Share2Icon className="size-4" />
                    Share
                  </button>
                )}

                <button
                  onClick={changeResumeVisibility}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition shadow-sm
                    ${resumeData.public
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? "Public" : "Private"}
                </button>

                <button
                  onClick={downloadResume}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm 
                 bg-gray-900 text-white rounded-lg 
                 hover:bg-black transition shadow-sm"
                >
                  <DownloadCloud className="size-4" />
                  Download
                </button>

              </div>

            </div>

            {/* Resume Preview */}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />

          </div>

        </div>
      </div>

    </div>
  );
}

export default ResumeBuilder

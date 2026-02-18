import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext"

const Dashboard = () => {

  const { user, token } = useSelector(state => state.auth)

  const navigate = useNavigate()

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("")
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Create Resume
  const createResume = async (e) => {
    try {
      e.preventDefault()
      const { data } = await api.post("/api/resumes/create", { title }, {
        headers: {
          Authorization: token
        }
      })
      setAllResumes([...allResumes, data.resume])
      setTitle("")
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  // Upload Resume
  const uploadResume = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post("/api/ai/upload-resume", { title, resumeText }, {
        headers: {
          Authorization: token
        }
      })
      setTitle("")
      setResume(null)
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  // Edit Title
  const editTitle = async (e) => {
    try {
      e.preventDefault()

      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, {
        headers: {
          Authorization: token
        }
      })
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle("")
      setEditResumeId("")
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }

  }

  // Delete Resume
  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm("Confirm Delete ?")
      if (confirm) {
        const { data } = await api.delete(`api/resumes/delete/${resumeId}`, {
          headers: {
            Authorization: token
          }
        })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }

  }

  // Load All Resumes
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: {
          Authorization: token
        }
      })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="w-full">

          {/* Welcome Section */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Welcome, <span className="text-green-600">{user.name}</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Start building or upload your resume to get started.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <button
              onClick={() => setShowCreateResume(true)}
              className="flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div className="bg-green-100 p-4 rounded-full">
                <PlusIcon className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-lg font-medium text-gray-700">
                Create Resume
              </p>
            </button>

            <button
              onClick={() => setShowUploadResume(true)}
              className="flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div className="bg-green-100 p-4 rounded-full">
                <UploadCloudIcon className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-lg font-medium text-gray-700">
                Upload Existing
              </p>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-8"></div>

          {/* Resume List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];

              return (
                <div
                  key={index}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className="relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                    borderColor: baseColor + "40",
                  }}
                >
                  {/* Icon */}
                  <FilePenLineIcon
                    className="w-8 h-8 mb-4"
                    style={{ color: baseColor }}
                  />

                  {/* Title */}
                  <p
                    className="text-lg font-semibold mb-1"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </p>

                  {/* Updated Date */}
                  <p
                    className="text-sm"
                    style={{ color: baseColor + "90" }}
                  >
                    Updated on{" "}
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>

                  {/* Actions */}
                  <div onClick={(e) => e.stopPropagation()} className="absolute top-4 right-4 flex gap-3 opacity-70 hover:opacity-100 transition">
                    <button className="hover:scale-110 transition">
                      <TrashIcon onClick={() => deleteResume(resume._id)} className="w-4 h-4 text-red-500" />
                    </button>
                    <button className="hover:scale-110 transition">
                      <PencilIcon onClick={(e) => { setEditResumeId(resume._id); setTitle(resume.title) }} className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {showCreateResume && (
            <form
              onSubmit={createResume}
              onClick={() => setShowCreateResume(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200"
              >
                {/* Close Button */}
                <XIcon
                  className="absolute top-4 right-4 w-5 h-5 text-gray-500 hover:text-red-500 transition"
                  onClick={() => {
                    setShowCreateResume(false);
                    setTitle("");
                  }}
                />

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Create a Resume
                </h2>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Enter Resume Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 mb-6"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
                >
                  Create Resume
                </button>
              </div>
            </form>
          )
          }

          {showUploadResume && (
            <form
              onSubmit={uploadResume}
              onClick={() => setShowUploadResume(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative"
              >
                {/* Close Button */}
                <XIcon
                  className="absolute top-4 right-4 w-5 h-5 text-gray-500 hover:text-red-500 transition cursor-pointer"
                  onClick={() => {
                    setShowUploadResume(false);
                    setTitle("");
                    setResume(null);
                  }}
                />

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Upload Resume
                </h2>

                {/* Resume Title */}
                <input
                  type="text"
                  placeholder="Enter Resume Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 mb-5"
                />

                {/* Upload Area */}
                <label
                  htmlFor="resume-input"
                  className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-green-500 hover:bg-green-50 transition mb-6"
                >
                  {resume ? (
                    <>
                      <p className="text-green-600 font-medium">{resume.name}</p>
                      <p className="text-sm text-gray-500">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-gray-400" />
                      <p className="text-gray-600 font-medium">
                        Click to upload PDF
                      </p>
                      <p className="text-xs text-gray-400">
                        Only PDF files are allowed
                      </p>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  {
                    isLoading && <LoaderCircleIcon className="animate-spin size-4 text-white" />
                  }
                  {isLoading ? "Uploading..." : "Upload Resume"}
                </button>
              </div>
            </form>
          )
          }

          {editResumeId && (
            <form
              onSubmit={editTitle}
              onClick={() => setEditResumeId(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200"
              >
                {/* Close Button */}
                <XIcon
                  className="absolute top-4 right-4 w-5 h-5 text-gray-500 hover:text-red-500 transition"
                  onClick={() => {
                    setEditResumeId("");
                    setTitle("");
                  }}
                />

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Edit Resume Title
                </h2>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Enter Resume Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 mb-6"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
                >
                  Update
                </button>
              </div>
            </form>
          )
          }

        </div>
      </div>
    </div>
  );
};

export default Dashboard;

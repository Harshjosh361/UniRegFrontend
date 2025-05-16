import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle,
  LogOut,
  User,
  MapPin,
  Phone,
  Mail,
  BookmarkCheck,
  ChevronDown,
  FileUp,
  AlertTriangle,
} from "lucide-react";
import { getSubjectsForSemester } from "../utils/subjectConfig";

// List of available subjects
const SUBJECTS_LIST = [
  "Data Structures",
  "Algorithms",
  "Database Systems",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Artificial Intelligence",
  "Machine Learning",
  "Web Development",
  "Cybersecurity",
];

const initialFormData = {
  firstName: "",
  lastName: "",
  usn: "",
  email: "",
  address: {
    street: "",
    city: "",
    state: "",
    pincode: "",
  },
  phone: "",
  scheme: "2022",
  semester: 1,
  subjects: [],
  feeReceipt: null,
  dataVerified: false,
};

function StudentDashboard() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/student-login");
          return;
        }

        setUserData({
          studentId: "Student",
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const currentSemester = parseInt(formData.semester, 10);
    const subjectsForSelectedSemester = getSubjectsForSemester(currentSemester);
    setAvailableSubjects(subjectsForSelectedSemester);
    setFormData((prev) => ({
      ...prev,
      subjects: [],
      feeReceipt: prev.feeReceipt,
      dataVerified: prev.dataVerified,
    }));
  }, [formData.semester]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else if (type === "checkbox" && name === "dataVerified") {
      setFormData((prev) => ({ ...prev, dataVerified: checked }));
    } else if (type === "file" && name === "feeReceipt") {
      setFormData((prev) => ({ ...prev, feeReceipt: files[0] || null }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (subject) => {
    setFormData((prev) => {
      const subjects = prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject];
      return { ...prev, subjects };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.subjects.length === 0) {
      setError("Please select at least one subject.");
      return;
    }
    if (!formData.feeReceipt) {
      setError("Please upload your fee receipt.");
      return;
    }
    if (!formData.dataVerified) {
      setError("Please verify that all the data you entered is correct.");
      return;
    }

    setIsLoading(true);

    const dataToSubmit = new FormData();
    dataToSubmit.append("firstName", formData.firstName);
    dataToSubmit.append("lastName", formData.lastName);
    dataToSubmit.append("usn", formData.usn.toUpperCase());
    dataToSubmit.append("email", formData.email.toLowerCase());
    dataToSubmit.append("address", JSON.stringify(formData.address));
    dataToSubmit.append("phone", formData.phone);
    dataToSubmit.append("scheme", formData.scheme);
    dataToSubmit.append("semester", formData.semester.toString());
    dataToSubmit.append("subjects", JSON.stringify(formData.subjects));
    dataToSubmit.append("dataVerified", formData.dataVerified.toString());

    if (formData.feeReceipt) {
      dataToSubmit.append(
        "feeReceipt",
        formData.feeReceipt,
        formData.feeReceipt.name
      );
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/form/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: dataToSubmit,
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(
          responseData.message || "Submission failed due to server error"
        );
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred during submission."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-purple-200 mb-4"></div>
          <div className="h-4 w-24 bg-purple-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="bg-white shadow-md rounded-xl p-6 mb-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <BookOpen className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  Student Dashboard
                </h1>
                <p className="text-gray-600">
                  Welcome back,{" "}
                  <span className="font-medium text-purple-700">
                    {userData?.studentId || "Student"}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/student-login");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-purple-700 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {isSubmitted ? (
          <div className="bg-white shadow-md rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg">
            <div className="bg-green-100 p-4 rounded-full inline-flex mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              Registration Successful!
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your details have been successfully submitted. Thank you!
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData(initialFormData);
                const initialSubjects = getSubjectsForSemester(
                  initialFormData.semester
                );
                setAvailableSubjects(initialSubjects);
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Submit Another Form
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-8">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Student Registration Form
              </h2>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 animate-fadeIn flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <User className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      USN <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="usn"
                      value={formData.usn}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                      pattern="[A-Za-z0-9]{10}"
                      title="10 character alphanumeric USN"
                    />
                    <p className="text-xs text-gray-500">
                      10 character alphanumeric ID
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                        pattern="[0-9]{10}"
                        title="10 digit phone number"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      10 digit phone number
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Scheme Year <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="scheme"
                        value={formData.scheme}
                        readOnly
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Semester <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none"
                        required
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            Semester {num}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subjects Section */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <BookmarkCheck className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Select Subjects <span className="text-red-500">*</span>
                  </h3>
                </div>

                {availableSubjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableSubjects.map((subject) => (
                      <label
                        key={subject}
                        className={`flex items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          formData.subjects.includes(subject)
                            ? "border-purple-500 bg-purple-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.subjects.includes(subject)}
                          onChange={() => handleCheckboxChange(subject)}
                          className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-white transition-all duration-200"
                        />
                        <span
                          className={`ml-3 text-sm ${
                            formData.subjects.includes(subject)
                              ? "font-medium text-purple-800"
                              : "text-gray-700"
                          }`}
                        >
                          {subject}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">
                    No subjects available for the selected semester. Please
                    select a valid semester.
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-3">
                  Select at least one subject from the list above.
                </p>
              </div>

              {/* Address Section */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <MapPin className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Address Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Street <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                      pattern="[0-9]{6}"
                      title="6 digit pincode"
                    />
                    <p className="text-xs text-gray-500">6 digit pincode</p>
                  </div>
                </div>
              </div>

              {/* Fee Receipt Upload Section */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <FileUp className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Upload Fee Receipt <span className="text-red-500">*</span>
                  </h3>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="feeReceipt"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select receipt file (PDF, JPG, PNG)
                  </label>
                  <input
                    type="file"
                    name="feeReceipt"
                    id="feeReceipt"
                    onChange={handleChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-colors duration-200 cursor-pointer border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {formData.feeReceipt && (
                    <p className="text-xs text-green-600 mt-1">
                      Selected: {formData.feeReceipt.name}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Max file size: 5MB. Accepted formats: PDF, JPG, PNG.
                  </p>
                </div>
              </div>

              {/* Data Verification Checkbox */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="dataVerified"
                    checked={formData.dataVerified}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    I hereby declare that all the information provided above is
                    correct to the best of my knowledge.{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    !formData.dataVerified ||
                    !formData.feeReceipt ||
                    formData.subjects.length === 0
                  }
                  className={`px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 ${
                    isLoading ||
                    !formData.dataVerified ||
                    !formData.feeReceipt ||
                    formData.subjects.length === 0
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:shadow-lg"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Form"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;

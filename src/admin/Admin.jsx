import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  MessageSquare,
  Briefcase,
  ArrowLeft,
  LogOut,
  Trash2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { api, resolveImageUrl } from "../api";
import { removeToken } from "../auth";

export default function Admin() {
  const navigate = useNavigate();
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    role: "",
    content: "",
    image: "",
    stars: 5,
  });
  const [offerForm, setOfferForm] = useState({ title: "", desc: "", icon: "" });
  const [projects, setProjects] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState({
    project: false,
    feedback: false,
    offer: false,
    fetch: false,
  });
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading((l) => ({ ...l, fetch: true }));
    try {
      const [p, f, o] = await Promise.all([
        api.projects.getAll(),
        api.feedbacks.getAll(),
        api.offers.getAll(),
      ]);
      setProjects(p);
      setFeedbacks(f);
      setOffers(o);
    } catch (err) {
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
    } finally {
      setLoading((l) => ({ ...l, fetch: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading((l) => ({ ...l, project: true }));
    try {
      await api.projects.create({
        title: projectForm.title,
        description: projectForm.description,
        image: projectForm.image,
        link: projectForm.link || "",
      });
      setProjectForm({ title: "", description: "", image: "", link: "" });
      if (document.getElementById("project-image")) {
        document.getElementById("project-image").value = "";
      }
      alert("Loyiha muvaffaqiyatli saqlandi!");
      fetchData();
    } catch (err) {
      setError(
        err.message || "Loyiha saqlanmadi. Backend ishlayotganini tekshiring.",
      );
    } finally {
      setLoading((l) => ({ ...l, project: false }));
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Haqiqatan ham ushbu loyihani o'chirmoqchimisiz?"))
      return;
    try {
      await api.projects.delete(id);
      setProjects(projects.filter((p) => p.id !== id));
      alert("Loyiha o'chirildi.");
    } catch (err) {
      alert("O'chirishda xatolik: " + err.message);
    }
  };

  const handleAddFeedback = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading((l) => ({ ...l, feedback: true }));
    try {
      await api.feedbacks.create({
        name: feedbackForm.name,
        role: feedbackForm.role,
        content: feedbackForm.content,
        image: feedbackForm.image,
        stars: Number(feedbackForm.stars),
      });
      setFeedbackForm({ name: "", role: "", content: "", image: "", stars: 5 });
      if (document.getElementById("feedback-image")) {
        document.getElementById("feedback-image").value = "";
      }
      alert("Fikr muvaffaqiyatli saqlandi!");
      fetchData();
    } catch (err) {
      setError(
        err.message || "Fikr saqlanmadi. Backend ishlayotganini tekshiring.",
      );
    } finally {
      setLoading((l) => ({ ...l, feedback: false }));
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (!window.confirm("Ushbu fikrni o'chirmoqchimisiz?")) return;
    try {
      await api.feedbacks.delete(id);
      setFeedbacks(feedbacks.filter((f) => f.id !== id));
      alert("Fikr o'chirildi.");
    } catch (err) {
      alert("O'chirishda xatolik: " + err.message);
    }
  };

  const handleAddOffer = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading((l) => ({ ...l, offer: true }));
    try {
      await api.offers.create({
        title: offerForm.title,
        desc: offerForm.desc,
        icon: offerForm.icon,
      });
      setOfferForm({ title: "", desc: "", icon: "" });
      if (document.getElementById("offer-icon")) {
        document.getElementById("offer-icon").value = "";
      }
      alert("Taklif muvaffaqiyatli saqlandi!");
      fetchData();
    } catch (err) {
      setError(
        err.message || "Taklif saqlanmadi. Backend ishlayotganini tekshiring.",
      );
    } finally {
      setLoading((l) => ({ ...l, offer: false }));
    }
  };

  const handleDeleteOffer = async (id) => {
    if (!window.confirm("Ushbu taklifni o'chirmoqchimisiz?")) return;
    try {
      await api.offers.delete(id);
      setOffers(offers.filter((o) => o.id !== id));
      alert("Taklif o'chirildi.");
    } catch (err) {
      alert("O'chirishda xatolik: " + err.message);
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate("/sputnik/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          {error && (
            <div className="fixed top-4 right-4 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm max-w-md z-50">
              {error}
            </div>
          )}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading.fetch}
              className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              title="Ma'lumotlarni yangilash"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading.fetch ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Chiqish
            </button>
            <Link
              to="/"
              className="flex items-center text-blue-600 hover:text-blue-800 font-semibold bg-blue-50 px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Landing
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
              <Briefcase className="w-6 h-6 mr-3 text-blue-500" />
              Add New Project
            </h2>
            <form onSubmit={handleAddProject} className="space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
                value={projectForm.title}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value,
                  })
                }
              />
              <div className="w-full p-3 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 bg-white">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image
                </label>
                <input
                  id="project-image"
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                  onChange={(e) =>
                    handleImageUpload(e, (base64) =>
                      setProjectForm({ ...projectForm, image: base64 }),
                    )
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Link URL (Optional)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={projectForm.link}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, link: e.target.value })
                }
              />
              <button
                type="submit"
                disabled={loading.project}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading.project ? "Saqlanmoqda..." : "Save Project"}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Existing Projects
              </h3>
              {loading.fetch ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="animate-spin text-blue-500" />
                </div>
              ) : projects.length === 0 ? (
                <p className="text-gray-400 text-sm">No projects found.</p>
              ) : (
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={resolveImageUrl(p.image)}
                          alt=""
                          className="w-10 h-10 rounded object-cover bg-white"
                        />
                        <div>
                          <p className="font-semibold text-sm text-gray-800 line-clamp-1">
                            {p.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {p.description}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 opacity-50"></div>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
              <MessageSquare className="w-6 h-6 mr-3 text-green-500" />
              Add Client Feedback
            </h2>
            <form onSubmit={handleAddFeedback} className="space-y-4">
              <input
                type="text"
                placeholder="Client Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
                value={feedbackForm.name}
                onChange={(e) =>
                  setFeedbackForm({ ...feedbackForm, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Role/Title"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
                value={feedbackForm.role}
                onChange={(e) =>
                  setFeedbackForm({ ...feedbackForm, role: e.target.value })
                }
              />
              <textarea
                placeholder="Feedback Content"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
                value={feedbackForm.content}
                onChange={(e) =>
                  setFeedbackForm({ ...feedbackForm, content: e.target.value })
                }
              />
              <div className="w-full p-3 border rounded-lg focus-within:ring-2 focus-within:ring-green-500 bg-white">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar Image
                </label>
                <input
                  id="feedback-image"
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  required
                  onChange={(e) =>
                    handleImageUpload(e, (base64) =>
                      setFeedbackForm({ ...feedbackForm, image: base64 }),
                    )
                  }
                />
              </div>
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Stars (1-5)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
                value={feedbackForm.stars}
                onChange={(e) =>
                  setFeedbackForm({ ...feedbackForm, stars: e.target.value })
                }
              />
              <button
                type="submit"
                disabled={loading.feedback}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md shadow-green-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading.feedback ? "Saqlanmoqda..." : "Save Feedback"}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Existing Feedback
              </h3>
              {loading.fetch ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="animate-spin text-green-500" />
                </div>
              ) : feedbacks.length === 0 ? (
                <p className="text-gray-400 text-sm">No feedback found.</p>
              ) : (
                <div className="space-y-3">
                  {feedbacks.map((f) => (
                    <div
                      key={f.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={resolveImageUrl(f.image)}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover bg-white"
                        />
                        <div>
                          <p className="font-semibold text-sm text-gray-800 line-clamp-1">
                            {f.name}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {f.role}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteFeedback(f.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 opacity-50"></div>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
              <PlusCircle className="w-6 h-6 mr-3 text-orange-500" />
              Add Offer / Suggestion (Taklif)
            </h2>
            <form onSubmit={handleAddOffer} className="space-y-4">
              <input
                type="text"
                placeholder="Offer Title (e.g., Free Inspection)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
                value={offerForm.title}
                onChange={(e) =>
                  setOfferForm({ ...offerForm, title: e.target.value })
                }
              />
              <textarea
                placeholder="Offer Details/Description"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
                value={offerForm.desc}
                onChange={(e) =>
                  setOfferForm({ ...offerForm, desc: e.target.value })
                }
              />
              <div className="w-full p-3 border rounded-lg focus-within:ring-2 focus-within:ring-orange-500 bg-white">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offer Icon/Image
                </label>
                <input
                  id="offer-icon"
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  required
                  onChange={(e) =>
                    handleImageUpload(e, (base64) =>
                      setOfferForm({ ...offerForm, icon: base64 }),
                    )
                  }
                />
              </div>
              <button
                type="submit"
                disabled={loading.offer}
                className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition-colors shadow-md shadow-orange-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading.offer ? "Saqlanmoqda..." : "Save Offer"}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Existing Offers
              </h3>
              {loading.fetch ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="animate-spin text-orange-500" />
                </div>
              ) : offers.length === 0 ? (
                <p className="text-gray-400 text-sm">No offers found.</p>
              ) : (
                <div className="space-y-3">
                  {offers.map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={resolveImageUrl(o.icon)}
                          alt=""
                          className="w-10 h-10 rounded object-cover bg-white"
                        />
                        <div>
                          <p className="font-semibold text-sm text-gray-800 line-clamp-1">
                            {o.title}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteOffer(o.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

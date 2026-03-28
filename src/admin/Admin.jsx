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
  Settings,
  Upload,
} from "lucide-react";
import { api, resolveImageUrl } from "../api";
import { removeToken } from "../auth";
import { useSiteContent } from "../context/SiteContentContext";

export default function Admin() {
  const navigate = useNavigate();
  const { content, updateContent, DEFAULT_CONTENT } = useSiteContent();
  const [siteForm, setSiteForm] = useState(content);
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
  const [siteSaved, setSiteSaved] = useState(false);

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

  const handleSiteFormChange = (field, value) => {
    setSiteForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSiteImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSiteForm((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSiteContent = () => {
    updateContent(siteForm);
    setSiteSaved(true);
    setTimeout(() => setSiteSaved(false), 3000);
  };

  const handleResetSiteContent = () => {
    if (window.confirm("Barcha site matnlarini standart qiymatga qaytarishni xohlaysizmi?")) {
      setSiteForm(DEFAULT_CONTENT);
      updateContent(DEFAULT_CONTENT);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
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
              <StyledFileInput
                id="project-image"
                label="Project Image"
                color="blue"
                onChange={(e) =>
                  handleImageUpload(e, (base64) =>
                    setProjectForm({ ...projectForm, image: base64 }),
                  )
                }
              />
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
              <StyledFileInput
                id="feedback-image"
                label="Avatar Image"
                color="green"
                onChange={(e) =>
                  handleImageUpload(e, (base64) =>
                    setFeedbackForm({ ...feedbackForm, image: base64 }),
                  )
                }
              />
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
              <StyledFileInput
                id="offer-icon"
                label="Offer Icon/Image"
                color="orange"
                onChange={(e) =>
                  handleImageUpload(e, (base64) =>
                    setOfferForm({ ...offerForm, icon: base64 }),
                  )
                }
              />
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

        {/* ===== SITE SETTINGS ===== */}
        <div className="mt-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50 rounded-bl-full -z-10 opacity-40"></div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center text-gray-800">
              <Settings className="w-6 h-6 mr-3 text-purple-500" />
              Site Settings (Landing Page)
            </h2>
            <div className="flex gap-3">
              <button
                onClick={handleResetSiteContent}
                className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Standartga qaytarish
              </button>
              <button
                onClick={handleSaveSiteContent}
                className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors shadow-md ${
                  siteSaved
                    ? "bg-green-500 text-white shadow-green-200"
                    : "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200"
                }`}
              >
                {siteSaved ? "✓ Saqlandi!" : "Saqlash"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {/* Header */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 border-b pb-2">🏠 Header</h3>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Logo (rasm)</label>
                {siteForm.logo && (
                  <img src={siteForm.logo} alt="logo preview" className="w-16 h-16 object-contain rounded-lg border mb-2" />
                )}
                <StyledFileInput
                  label="Logo yuklash"
                  color="purple"
                  onChange={(e) => handleSiteImageUpload(e, "logo")}
                />
                {siteForm.logo && (
                  <button onClick={() => handleSiteFormChange("logo", "")} className="text-xs text-red-400 hover:text-red-600 block mt-1">
                    Logoni o'chirish
                  </button>
                )}
              </div>
              <SiteInput label="Kompaniya nomi" value={siteForm.companyName} onChange={(v) => handleSiteFormChange("companyName", v)} />
            </div>

            {/* Hero */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 border-b pb-2">🚀 Hero Section</h3>
              <SiteInput label="Asosiy sarlavha" value={siteForm.heroTitle} onChange={(v) => handleSiteFormChange("heroTitle", v)} />
              <SiteTextarea label="Tavsif matni" value={siteForm.heroSubtitle} onChange={(v) => handleSiteFormChange("heroSubtitle", v)} />
              <SiteInput label="Telefon raqam" value={siteForm.heroPhone} onChange={(v) => handleSiteFormChange("heroPhone", v)} />
              <SiteInput label="Badge 1" value={siteForm.heroBadge1} onChange={(v) => handleSiteFormChange("heroBadge1", v)} />
              <SiteInput label="Badge 2" value={siteForm.heroBadge2} onChange={(v) => handleSiteFormChange("heroBadge2", v)} />
              <SiteInput label="Badge 3" value={siteForm.heroBadge3} onChange={(v) => handleSiteFormChange("heroBadge3", v)} />
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 border-b pb-2">⚡ Services Bo'limi</h3>
              <SiteInput label="Sarlavha" value={siteForm.servicesTitle} onChange={(v) => handleSiteFormChange("servicesTitle", v)} />
              <SiteTextarea label="Tavsif" value={siteForm.servicesDesc} onChange={(v) => handleSiteFormChange("servicesDesc", v)} />
              
              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-2">
                  <SiteInput label="Servis 1 — nomi" value={siteForm.service1Title} onChange={(v) => handleSiteFormChange("service1Title", v)} />
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-500 uppercase">Icon 1</label>
                    <StyledFileInput small color="purple" onChange={(e) => handleSiteImageUpload(e, "service1Icon")} />
                  </div>
                </div>
                <SiteInput label="Servis 1 — tavsif" value={siteForm.service1Desc} onChange={(v) => handleSiteFormChange("service1Desc", v)} />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-2">
                  <SiteInput label="Servis 2 — nomi" value={siteForm.service2Title} onChange={(v) => handleSiteFormChange("service2Title", v)} />
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-500 uppercase">Icon 2</label>
                    <StyledFileInput small color="purple" onChange={(e) => handleSiteImageUpload(e, "service2Icon")} />
                  </div>
                </div>
                <SiteInput label="Servis 2 — tavsif" value={siteForm.service2Desc} onChange={(v) => handleSiteFormChange("service2Desc", v)} />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-2">
                  <SiteInput label="Servis 3 — nomi" value={siteForm.service3Title} onChange={(v) => handleSiteFormChange("service3Title", v)} />
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-500 uppercase">Icon 3</label>
                    <StyledFileInput small color="purple" onChange={(e) => handleSiteImageUpload(e, "service3Icon")} />
                  </div>
                </div>
                <SiteInput label="Servis 3 — tavsif" value={siteForm.service3Desc} onChange={(v) => handleSiteFormChange("service3Desc", v)} />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-2">
                  <SiteInput label="Servis 4 — nomi" value={siteForm.service4Title} onChange={(v) => handleSiteFormChange("service4Title", v)} />
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-500 uppercase">Icon 4</label>
                    <StyledFileInput small color="purple" onChange={(e) => handleSiteImageUpload(e, "service4Icon")} />
                  </div>
                </div>
                <SiteInput label="Servis 4 — tavsif" value={siteForm.service4Desc} onChange={(v) => handleSiteFormChange("service4Desc", v)} />
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 border-b pb-2">🏆 Why Choose Us</h3>
              <SiteInput label="Sarlavha" value={siteForm.whyTitle} onChange={(v) => handleSiteFormChange("whyTitle", v)} />
              <SiteTextarea label="Tavsif" value={siteForm.whyDesc} onChange={(v) => handleSiteFormChange("whyDesc", v)} />
              <SiteInput label="Feature 1 — statistika" value={siteForm.why1Stat} onChange={(v) => handleSiteFormChange("why1Stat", v)} />
              <SiteInput label="Feature 1 — nomi" value={siteForm.why1Subtitle} onChange={(v) => handleSiteFormChange("why1Subtitle", v)} />
              <SiteInput label="Feature 1 — tavsif" value={siteForm.why1Desc} onChange={(v) => handleSiteFormChange("why1Desc", v)} />
              <SiteInput label="Feature 2 — statistika" value={siteForm.why2Stat} onChange={(v) => handleSiteFormChange("why2Stat", v)} />
              <SiteInput label="Feature 2 — nomi" value={siteForm.why2Subtitle} onChange={(v) => handleSiteFormChange("why2Subtitle", v)} />
              <SiteInput label="Feature 2 — tavsif" value={siteForm.why2Desc} onChange={(v) => handleSiteFormChange("why2Desc", v)} />
              <SiteInput label="Feature 3 — statistika" value={siteForm.why3Stat} onChange={(v) => handleSiteFormChange("why3Stat", v)} />
              <SiteInput label="Feature 3 — nomi" value={siteForm.why3Subtitle} onChange={(v) => handleSiteFormChange("why3Subtitle", v)} />
              <SiteInput label="Feature 3 — tavsif" value={siteForm.why3Desc} onChange={(v) => handleSiteFormChange("why3Desc", v)} />
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 border-b pb-2">📞 Contact Ma'lumotlari</h3>
              <SiteInput label="Maps Embed URL" value={siteForm.mapUrl} onChange={(v) => handleSiteFormChange("mapUrl", v)} />
              <SiteInput label="Telefon" value={siteForm.contactPhone} onChange={(v) => handleSiteFormChange("contactPhone", v)} />
              <SiteInput label="Favqulodda telefon" value={siteForm.contactEmergency} onChange={(v) => handleSiteFormChange("contactEmergency", v)} />
              <SiteInput label="Email" value={siteForm.contactEmail} onChange={(v) => handleSiteFormChange("contactEmail", v)} />
              <SiteInput label="Manzil" value={siteForm.contactAddress} onChange={(v) => handleSiteFormChange("contactAddress", v)} />
              <SiteInput label="Shahar / Pochta" value={siteForm.contactCity} onChange={(v) => handleSiteFormChange("contactCity", v)} />
            </div>

            {/* Footer */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 border-b pb-2">🔗 Footer</h3>
              <SiteInput label="Kompaniya nomi" value={siteForm.footerCompany} onChange={(v) => handleSiteFormChange("footerCompany", v)} />
              <SiteTextarea label="Tavsif" value={siteForm.footerDesc} onChange={(v) => handleSiteFormChange("footerDesc", v)} />
              <SiteInput label="Telefon" value={siteForm.footerPhone} onChange={(v) => handleSiteFormChange("footerPhone", v)} />
              <SiteInput label="Email" value={siteForm.footerEmail} onChange={(v) => handleSiteFormChange("footerEmail", v)} />
              <SiteInput label="Copyright matni" value={siteForm.footerCopyright} onChange={(v) => handleSiteFormChange("footerCopyright", v)} />
            </div>

          </div>
        </div>
        {/* ===== END SITE SETTINGS ===== */}

      </div>
    </div>
  );
}

// ---- Helper components for Site Settings ----
const SiteInput = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition"
    />
  </div>
);

const SiteTextarea = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </label>
    <textarea
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition resize-none"
    />
  </div>
);

const StyledFileInput = ({ label, onChange, color = "blue", id, small = false }) => {
  const [fileName, setFileName] = useState("");

  const colorVariants = {
    blue: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
    green: "bg-green-50 text-green-700 hover:bg-green-100 border-green-200",
    orange: "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200",
    purple: "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200",
  };

  return (
    <div className="space-y-2">
      {label && !small && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          id={id}
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setFileName(file.name);
            onChange(e);
          }}
        />
        <div
          className={`flex items-center gap-2 border border-dashed rounded-lg transition-all duration-200 ${
            colorVariants[color]
          } ${small ? "p-1.5 text-xs" : "p-3 text-sm"}`}
        >
          <Upload className={small ? "w-3.5 h-3.5" : "w-5 h-5"} />
          <span className="font-medium truncate">
            {fileName || (small ? "Yuklash" : "Faylni tanlang")}
          </span>
        </div>
      </div>
    </div>
  );
};

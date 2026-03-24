import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { api, resolveImageUrl } from "../../../api";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchOffers() {
      try {
        const data = await api.offers.getAll();
        if (!cancelled) setOffers(data || []);
      } catch {
        const fallback = JSON.parse(localStorage.getItem("admin_offers") || "[]");
        if (!cancelled) setOffers(fallback);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchOffers();
    return () => { cancelled = true; };
  }, []);

  if (loading) return null;
  if (offers.length === 0) return null;

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Sparkles className="text-orange-500 w-8 h-8" />
            Maxsus Takliflar
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Siz uchun tayyorlangan eksklyuziv takliflar va imkoniyatlar bilan tanishing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div key={offer.id ?? index} className="bg-linear-to-br from-orange-50 to-white p-8 rounded-3xl border border-orange-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              {offer.icon && (
                <div className="w-16 h-16 bg-white rounded-2xl p-3 shadow-sm mb-6 relative z-10 flex items-center justify-center">
                  <img src={resolveImageUrl(offer.icon)} alt="Icon" className="max-w-full max-h-full object-contain" />
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">{offer.title}</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">{offer.desc}</p>
              <div className="mt-8 relative z-10">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                  Batafsil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

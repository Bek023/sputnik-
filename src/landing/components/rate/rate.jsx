import { useState, useEffect } from "react";
import { api, resolveImageUrl } from "../../../api";

const staticTestimonials = [
  {
    name: "John Smith",
    role: "Homeowner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content:
      "Excellent service! The team was professional and completed the work ahead of schedule. Highly impressed with their attention to detail.",
    stars: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content:
      "VoltPro transformed our office with their smart electrical solutions. Highly recommend them for any commercial project.",
    stars: 5,
  },
];

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center gap-4 mb-6">
      <img
        src={resolveImageUrl(testimonial.image)}
        alt={testimonial.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-50"
      />
      <div>
        <h3 className="font-bold text-gray-900 text-lg leading-tight">
          {testimonial.name}
        </h3>
        <p className="text-gray-500 text-sm">{testimonial.role}</p>
      </div>
    </div>

    <p className="text-gray-600 leading-relaxed mb-6 grow">
      "{testimonial.content}"
    </p>

    <div className="flex gap-1">
      {[...Array(testimonial.stars)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(staticTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchFeedbacks() {
      try {
        const data = await api.feedbacks.getAll();
        if (!cancelled && data?.length > 0) {
          setTestimonials([...staticTestimonials, ...data]);
        }
      } catch {
        const fallback = JSON.parse(localStorage.getItem("admin_feedbacks") || "[]");
        if (!cancelled && fallback.length > 0) {
          setTestimonials([...staticTestimonials, ...fallback]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchFeedbacks();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          Mijozlarimiz Fikrlari
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="col-span-full text-center text-gray-500 py-8">Yuklanmoqda...</p>
          ) : (
            testimonials.map((item, index) => (
              <TestimonialCard key={item.id ?? index} testimonial={item} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

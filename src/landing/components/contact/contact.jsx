import { MapPin, Phone, Mail, Grid } from "lucide-react";
const ContactServiceSection = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-20">
        <section id="contact">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">
            Our Service Area
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-6 text-slate-800">
                Areas We Serve
              </h3>
              <ul className="space-y-5">
                {[
                  "Downtown Metro",
                  "Suburban Districts",
                  "Industrial Zones",
                  "Commercial Centers",
                  "Residential Areas",
                ].map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-3 text-slate-600 font-medium"
                  >
                    <Grid size={18} className="text-blue-500" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-2/3 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-200 relative min-h-75">
              <iframe
                title="Service Map"
                className="w-full h-full  opacity-80"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d53439.01085727181!2d66.8468847!3d39.6509942!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d1941369984f7%3A0xdd6b43742d313da8!2z0KHQv9GD0YLQvdC40Lo!5e1!3m2!1sru!2s!4v1773130188076!5m2!1sru!2s"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Name
                    </label>
                    <input
                      type="text"
                      className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Service Required
                  </label>
                  <select className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition text-slate-500">
                    <option>Select a service</option>
                    <option>Electrical Repair</option>
                    <option>Installation</option>
                    <option>Maintenance</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                  ></textarea>
                </div>

                <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors shadow-md shadow-blue-200">
                  Submit Request
                </button>
              </form>
            </div>

            <div className="flex flex-col space-y-8 p-4">
              <h3 className="text-xl font-bold text-slate-800">
                Contact Information
              </h3>

              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 rounded-lg h-fit">
                  <Phone className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Phone</p>
                  <p className="text-slate-600">1-800-VOLTPRO</p>
                  <p className="text-slate-500 text-sm">
                    Emergency: 1-800-EMERGENCY
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 rounded-lg h-fit">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Email</p>
                  <p className="text-slate-600">info@voltpro.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 rounded-lg h-fit">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Address</p>
                  <p className="text-slate-600">123 Electric Avenue</p>
                  <p className="text-slate-500 text-sm">Power City, PC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactServiceSection;

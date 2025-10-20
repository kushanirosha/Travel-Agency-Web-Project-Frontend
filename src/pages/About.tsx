import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import {
  FaHeart,
  FaUserFriends,
  FaGlobe,
  FaLeaf,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaAward,
  FaStar,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

function About() {

  const slides = useMemo(
    () => [
      {
        title: "Scuba Diving",
        desc: "Certified PADI courses with expert instructors.",
        img:
          "https://images.unsplash.com/photo-1605948508764-d43f2586bb0f?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "River Rafting",
        desc: "Thrilling adventures guided by seasoned divemasters.",
        img:
          "https://plus.unsplash.com/premium_photo-1661889574067-4f56b2d5c702?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Trekking & Tours",
        desc: "Discover Sri Lanka & Maldives beyond the shoreline.",
        img:
          "https://images.unsplash.com/photo-1553512313-64af79fdfe9c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const journeyPanels = useMemo(
    () => [
      {
        title: "Meaningful Moments Come From Real Connections.",
        img:
          "https://images.unsplash.com/photo-1615039666131-964929ad0f1e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        grayscale: true,
      },
      {
        title: "We Believe True Indulgence Is Personal.",
        img:
          "https://images.unsplash.com/photo-1557750505-e7b4d1c40410?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        grayscale: false,
      },
      {
        title: "Rebalance In Unforgettable Settings.",
        img:
          "https://images.unsplash.com/photo-1618288197176-1641dce9b108?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        grayscale: true,
      },
      {
        title: "We Don’t Just Serve - We Share Stories.",
        img:
          "https://images.unsplash.com/photo-1667537506981-4c67c8b82f85?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        grayscale: true,
      },
    ],
    []
  );

  const [jIndex, setJIndex] = useState(0);
  const [jPaused, setJPaused] = useState(false);

  return (
    <Layout>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pt-12 md:pt-20">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
          <div className="md:max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Where Adventure Meets Local Soul
            </h1>
            <p className="mt-5 text-gray-600 leading-relaxed">
              We’re passionate about crafting unforgettable experiences in the
              breathtaking destinations of Sri Lanka and Maldives. From scuba
              diving and river rafting to cliff-climbing and trekking—our
              certified team makes nature the highlight of your journey.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-[#01004b] px-6 py-3 text-white shadow-sm hover:bg-[#0c0b7a] focus:outline-none"
              >
                Contact Us
              </a>
              <a
                href="/packages"
                className="inline-flex items-center justify-center border-gray-300 px-6 py-3 text-gray-800 hover:bg-gray-50"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="relative w-full md:flex-1">
            <div
              className=" bg-gray-100 p-0 shadow-inner overflow-hidden"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="relative h-[320px]">
                {slides.map((card, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === i ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden={index !== i}
                  >
                    <div className="grid h-full grid-cols-1 md:grid-cols-2">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="h-40 w-full object-cover md:h-full"
                      />
                      <div className="flex flex-col justify-center bg-white p-6">
                        <p className="text-sm text-gray-500">Experience</p>
                        <h3 className="mt-1 font-semibold text-gray-900">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-2 w-2 rounded-full ${
                        index === i ? "bg-[#01004b]" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <section className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Certified PADI Courses",
                desc:
                  "Training delivered by experienced, certified instructors.",
                icon: <FaStar className="text-[#01004b]" size={28} />,
              },
              {
                title: "Divemaster-Led Trips",
                desc:
                  "Guided by experts with deep knowledge of local marine life.",
                icon: <FaUserFriends className="text-[#01004b]" size={28} />,
              },
              {
                title: "Sri Lanka & Maldives",
                desc: "Two islands, endless oceans and lush trails to explore.",
                icon: <FaGlobe className="text-[#01004b]" size={28} />,
              },
              {
                title: "Adventure Activities",
                desc:
                  "Scuba, rafting, cliff-climbing, tours and trekking in nature.",
                icon: <FaLeaf className="text-[#01004b]" size={28} />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-center text-3xl font-bold text-[#01004b]">
            The Art of Elegant Discovery
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-4">
            {[
              {
                title: "Passion for Travel",
                desc:
                  "We live and breathe travel—every journey crafted with care.",
                img:
                  "https://images.unsplash.com/photo-1602002418211-9d76470fa71f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                icon: <FaHeart />,
              },
              {
                title: "Personal Service",
                desc:
                  "Your preferences lead the way to a truly personal adventure.",
                img:
                  "https://www.100degreeseast.com/wp-content/uploads/2024/01/box_image18.jpg",
                icon: <FaUserFriends />,
              },
              {
                title: "Global Expertise",
                desc:
                  "Connections worldwide, experiences that feel wonderfully local.",
                img:
                  "https://images.unsplash.com/photo-1727610542348-9636c3b65d2a?q=80&w=1979&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                icon: <FaGlobe />,
              },
              {
                title: "Sustainable Tourism",
                desc:
                  "Travel responsibly—protecting communities and wild places.",
                img:
                  "https://plus.unsplash.com/premium_photo-1726729348504-1d89d93a7f94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                icon: <FaLeaf />,
              },
            ].map((card, i) => (
              <div key={i} className="group relative overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <div className="mb-1 text-sm opacity-90">{card.icon}</div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm opacity-90">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-10">
          <h2 className="text-3xl font-bold text-[#01004b]">Our Journey Through Time</h2>
          <div className="mt-6 overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 md:divide-x md:divide-white/20">
              {journeyPanels.map((p, i) => (
                <div key={i} className="group relative h-[260px] md:h-[420px]">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 filter grayscale group-hover:filter-none group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 transition-colors duration-300 bg-black/20 group-hover:bg-black/10" />
                  <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6">
                    <div className="border border-white/40 bg-white/20 px-4 py-3 text-white backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
                      <h3 className="text-sm md:text-base font-semibold leading-snug whitespace-pre-line">
                        {p.title}
                      </h3>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-center text-3xl font-bold text-[#01004b]">
            Recognition & Certifications
          </h2>

          <div className="mx-auto mt-3 max-w-5xl">
            <div className="-mx-4 flex items-center justify-center gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                "PADI Certified",
                "Tripadvisor",
                "Lonely Planet",
                "National Geographic",
                "CNN Travel",
              ].map((label) => (
                <span
                  key={label}
                  className="shrink-0 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs text-gray-700"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-4" role="list">

            <div className="relative md:col-span-2 overflow-hidden" role="listitem" aria-label="Guest story">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop"
                alt="Beach lounge"
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-end p-6 text-white">
                <p className="text-sm md:text-base">
                  “Traveling alone can be intimidating, but with Paradisepeak I felt embraced.
                  Staff remembered my name and preferences and even suggested a local market
                  that became the highlight of my trip.”
                </p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md border border-white/30 p-8 shadow-xl md:col-span-1 flex flex-col items-center justify-center" role="listitem" aria-label="Satisfaction metric">
              <div className="text-5xl font-bold text-[#01004b]">80%</div>
              <p className="mt-2 text-center text-gray-700 text-sm font-medium">
                of customers recommend Paradisepeak for the best experiences
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md border border-white/30 p-8 shadow-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/30" role="listitem" aria-label="Award: Best Travel Agency">
              <FaAward size={40} className="text-[#01004b]" />
              <h3 className="mt-3 text-lg font-semibold text-gray-800">Best Travel Agency</h3>
              <p className="mt-1 text-sm text-gray-700 text-center font-medium">
                Travel & Tourism Excellence Awards
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md border border-white/30 p-8 shadow-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/30" role="listitem" aria-label="Average rating">
              <div className="text-5xl font-bold text-[#01004b]">4.9<span className="text-gray-600 text-2xl align-top">/5</span></div>
              <div className="mt-2 flex items-center gap-1" aria-label="Rating: 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="mt-2 text-center text-gray-700 text-sm font-medium">1k+ verified reviews</p>
            </div>

            <div className="bg-white/20 backdrop-blur-md border border-white/30 p-8 shadow-xl md:col-span-2 flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/30" role="listitem" aria-label="Award: Customer Choice">
              <div className="shrink-0">
                <FaStar size={40} className="text-[#01004b]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Customer Choice Award</h3>
                <p className="mt-1 text-sm text-gray-700 font-medium">
                  Top-rated by satisfied travelers for personal, responsible journeys.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <h2 className="text-center text-3xl font-bold text-[#01004b]">
            Get in Touch
          </h2>
          <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-4">

            <div className="relative overflow-hidden md:col-span-2">
              <img
                src="https://plus.unsplash.com/premium_photo-1661526169600-9e50d7f8209e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Contact banner"
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 text-white">
                <h3 className="text-2xl font-semibold">Speak to a Travel Expert</h3>
                <p className="mt-1 text-sm opacity-90">
                  Tell us your dream - our certified team will shape the journey.
                </p>
                <div className="mt-4 flex gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white px-5 py-2 text-sm font-medium text-[#01004b] hover:bg-gray-100"
                  >
                    Contact Us
                  </a>
              
                </div>
              </div>
            </div>

            <div className="bg-white p-8 text-center shadow-lg" role="region" aria-label="Social media links">
              <h3 className="text-lg font-semibold">Follow us</h3>
              <p className="mt-1 text-gray-600 text-sm">Say hi and see latest trips</p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <FaYoutube />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            <div className="bg-white p-8 text-center shadow-lg">
              <div className="mb-3 flex justify-center">
                <FaPhoneAlt size={36} className="text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold">Call us</h3>
              <p className="mt-1 text-gray-600">
                <a href="tel:+94765620202" className="text-[#003161]">
                  +009 (4785) 3023
                </a>
              </p>
            </div>

            <div className="bg-white p-8 text-center shadow-lg">
              <div className="mb-3 flex justify-center">
                <FaEnvelope size={36} className="text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold">Email us</h3>
              <p className="mt-1 text-gray-600">
                <a
                  href="mailto:contact@paradisepeak.com"
                  className="text-[#003161]"
                >
                  hello@paradisepeak.com
                </a>
              </p>
            </div>

            <div className="bg-white p-8 text-center shadow-lg md:col-span-2">
              <div className="mb-3 flex justify-center">
                <FaMapMarkedAlt size={36} className="text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold">Visit us</h3>
              <p className="mt-1 text-gray-600">Sri Lanka & Maldives</p>
              <p className="mt-2">
                <a
                  href="https://maps.google.com/?q=Paradisepeak%20Sri%20Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#003161]"
                >
                  Open in Google Maps
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default About;
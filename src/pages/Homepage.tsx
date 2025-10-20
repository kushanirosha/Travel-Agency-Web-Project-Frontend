import React from 'react'
import Layout from '../components/Layout'
import '../App.css'
import { useNavigate } from "react-router-dom";
// import bannerImage from "../assets/images.jpeg";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        if (rating >= starValue) {
          return <FaStar key={i} />;
        } else if (rating >= starValue - 0.5) {
          return <FaStarHalfAlt key={i} />;
        } else {
          return <FaRegStar key={i} />;
        }
      })}
    </div>
  );
}
const reviews = [
  { id: 1, name: "Patric Oltmans", border: "border-blue-400" },
  { id: 2, name: "Patric Oltmans", border: "border-red-400" },
  { id: 3, name: "Patric Oltmans", border: "border-purple-400" },
  { id: 4, name: "Patric Oltmans", border: "border-green-400" },
  { id: 5, name: "Patric Oltmans", border: "border-yellow-400" },
  { id: 6, name: "Patric Oltmans", border: "border-pink-400" },
];
const topdestination = [
  { id: 1, src: "/pic1.jpg", alt: "Banner 1", place: "Maldives" },
  { id: 2, src: "/pic2.jpg", alt: "Banner 2", place: "Bali" },
  { id: 3, src: "/pic1.jpg", alt: "Banner 3", place: "Thailand" },
  { id: 4, src: "/pic2.jpg", alt: "Banner 4", place: "Fiji" },
  { id: 5, src: "/pic1.jpg", alt: "Banner 5", place: "Hawaii" },
  { id: 6, src: "/pic2.jpg", alt: "Banner 6", place: "Philippines" },
];
const multiDayTours = [
	{
		title: "Hidden Trails of Ella",
		image: "https://theportuguesetraveler.com/wp-content/uploads/2024/11/nine-arches-bridge-train-sri-lanka-53.jpg.webp",
		price: "US$900.00",
		per: "per person",
		details: ["4 hours", "All Meals", "Guided Tours"],
		features: ["Hotel included", "All meals included", "Professional guide", "Transport from Colombo"],
	},
	{
		title: "Discover Sri Lanka on two wheels",
		image: "https://theportuguesetraveler.com/wp-content/uploads/2024/11/nine-arches-bridge-train-sri-lanka-53.jpg.webp",
		price: "Rs.12,400",
		per: "per person",
		details: ["4 Nights", "All Meals", "Guided Tours"],
		features: ["Hotel included", "All meals included", "Professional guide", "Transport from Colombo"],
	},
	{
		title: "Beginner's Paradise",
		image: "https://theportuguesetraveler.com/wp-content/uploads/2024/11/nine-arches-bridge-train-sri-lanka-53.jpg.webp",
		price: "Rs.12,400",
		per: "per person",
		details: ["4 Nights", "All Meals", "Guided Tours"],
		features: ["Hotel included", "All meals included", "Professional guide", "Transport from Colombo"],
	},
];

// const Gallery = () => {
//   const filteredItems = galleryItems.filter((item) => {
//     if (activeTab === "all") {
//       return true;
//     }
//     return item.category === activeTab;
//   });

function Homepage() {
  const navigate = useNavigate();
  return (
    <>
     <Layout>
      {/*start  banner image */}
      
          <div className='w-full h-120 md:h-130 relative'>
            <img
                src="/beach.png"
              alt="Banner"
              className="w-full h-full object-cover"
            />
        {/* title */}
            <div className="absolute inset-0 flex   font-kyiv items-center justify-center bg-black/40">
              <h1 className="text-white text-4xl font-bold">
              Paradisepeak Travels
              </h1>
              <div className="text-white text-xl  font-bold items-center justify-center absolute pt-20">
              Book your diving
              </div>
              {/* search bar */}
                  <div className='bg-[#25224D]  flex h-18 p-3  w-150 items-center justify-center absolute mt-50 '>
                        <div className="bg-white h-10 w-115 flex items-center rounded-lg  relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-[5px] text-[#766C6C]"  width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M12.56 20.82a.96.96 0 0 1-1.12 0C6.611 17.378 1.486 10.298 6.667 5.182A7.6 7.6 0 0 1 12 3c2 0 3.919.785 5.333 2.181c5.181 5.116.056 12.196-4.773 15.64"/><path d="M12 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/></g></svg>
                            <input type="text" placeholder="Where do you  want to go?" className="flex-1 outline-none text-base text-gray-700 px-8"/>
                        </div>
                        <button className="bg-[#FF3636] text-white px-5 py-1 h-10 w-30 rounded-lg ml-2">
                          Search
                        </button>
                  </div>
            </div>
        
        </div>
   {/*end  banner image */}

{/* start picture content */}

   <div className=' flex  relative'>
          <div className='w-70 h-50 md:h-50 relative mt-10 mx-20  '> <img
                src="/image1.png"
              alt="Banner"
              className="w-full h-full object-cover shadow-[0_8px_15px_rgba(0,0,0,0.5)]"
            />
            </div>
           
            <div className='w-50 h-70 md:h-50 relative mt-30'> 
              <img
                  src="/image4.png"
                alt="Banner"
                className="w-full h-full object-cover shadow-[0_8px_15px_rgba(0,0,0,0.5)] absolute top-1/2 -left-10 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <div className='mt-10 mx-20 font-kyiv text-2xl  font-bold '>
              <span className="text-[#55C1EF]">Welcome to </span>
              <span className="bg-[linear-gradient(to_right,#364F95_38%,#11192F_90%)] bg-clip-text text-transparent">Paradisepeak</span>
              <div className="max-w-4xl mx-auto  text-sm font-light  text-gray-700 leading-relaxed ">
                <p className="mb-4">
                  Colombo Divers is the only recreational dive center offering diving and dive
                  training in Colombo. In addition, Colombo Divers organizes both local and
                  international dive trips, and provides diving assistance around Sri Lanka.
                  Owned and staffed by divers with a passion for diving and a love for Sri
                  Lanka, Colombo Divers offers a range of internationally recognized PADI
                  training courses carried out by certified instructors.
                </p>

                <p>
                  All dive trips are led by dive masters with many years of diving experience
                  and an in-depth knowledge of local dive sites. Our team has experience in
                  wreck exploration, technical diving, underwater photography and marine
                  research, with extensive diving experience around Sri Lanka and outside.
                  Experience the hidden beauty of Colombo — from shipwrecks to reefs teeming
                  with marine life!
                </p>
              </div>
              <div className=' py-3'>
                    <button className='btn btn-success  bg-[#1B409F] py-2 text-white w-40 text-sm'>Learn More</button>
                </div>
            </div>
            
     

    
   </div>
   {/* end picture content */} 

      {/* start diving */}
      <div className="center-column">
      <h2 className="gradient-text">
        Our Diving Services
      </h2>
      <p className="mt-4 max-w-xl text-gray-700 text-sm font-light">
        From beginner courses to advanced expeditions, we offer comprehensive
        diving experiences tailored to your skill level and interests.
      </p>
    </div>
    {/* end diving */}

    {/* start gradient */}
    <div className='pl-20 grid grid-cols-4 gap-4 pt-10'>
      {/* first */}
              <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 16,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
                    width: 298,
                    height:357,
                    paddingTop:16,
                    paddingLeft: 25,
                    marginBottom: 16,
                    display: "flex",
                    flexDirection: "column",
                  }}
              >
                {/* round image */}
                  <div
                    className="bg-blue-400 rounded-full p-3 mb-4"
                    style={{
                      // border: "4px solid red", // <-- add this for a red circle border
                      width: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                  <img
                    src="/water.png"
                    alt="Banner"
                    className="object-cover rounded-full"
                    style={{ width: "30px", height: "30px" }}
                  />
                  </div>
                  {/* heading */}
                  <div className='font-bold'>
                    Open Water Diving
                  </div>
                  {/* para start */}
                  <div className='pt-4 font-lights'>
                  Perfect for beginners, Get certified and explore depth up to 18 meters with our expert instructors
                  </div>
                   {/* start ul tag */}
                  <div>
                    <ul className="custom-bullet">
                      <li>PADI Certification</li>
                      <li>4-Day Course</li>
                      <li>Equipment Included</li>
                    </ul>
                </div>
                 {/* end ul tag */}
                
                 <div className=' py-3'>
                    <button className='btn btn-success  bg-[linear-gradient(to_right,#55C1EF_38%,#1B409F_90%)] py-2 text-white w-40 text-sm rounded-lg'>Learn More</button>
                </div>
                
                 
              </div>
              {/* second */}
              <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 16,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
                    width: 298,
                    height:357,
                    paddingTop:16,
                    paddingLeft: 25,
                    marginBottom: 16,
                    display: "flex",
                    flexDirection: "column",
                  }}
              >
              {/* round image */}
              <div
                    className="bg-blue-400 rounded-full p-3 mb-4"
                    style={{
                      // border: "4px solid red", // <-- add this for a red circle border
                      width: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                  <img
                    src="/medal.png"
                    alt="Banner"
                    className="object-cover rounded-full"
                    style={{ width: "30px", height: "30px" }}
                  />
                  </div>
                  {/* heading */}
                  <div className='font-bold'>
                    Open Water Diving
                  </div>
                  {/* para start */}
                  <div className='pt-4 font-lights'>
                  Take your skills to the next level with advanced techniques and deeper dive experiences
                  </div>
                   {/* start ul tag */}
                  <div>
                    <ul className="custom-bullet">
                      <li>Deep Diving</li>
                      <li>Night Diving</li>
                      <li>Wreck Exploration</li>
                    </ul>
                </div>
                 {/* end ul tag */}
                
                 <div className=' py-3'>
                    <button className='btn btn-success  bg-[linear-gradient(to_right,#55C1EF_38%,#1B409F_90%)] py-2 text-white w-40 text-sm rounded-lg'>Learn More</button>
                </div>
                </div>
                {/* third */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 16,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
                    width: 298,
                    height:357,
                    paddingTop:16,
                    paddingLeft: 25,
                    marginBottom: 16,
                    display: "flex",
                    flexDirection: "column",
                  }}
              >
              {/* round image */}
              <div
                    className="bg-blue-400 rounded-full p-3 mb-4"
                    style={{
                      // border: "4px solid red", // <-- add this for a red circle border
                      width: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                  <img
                    src="/camera.png"
                    alt="Banner"
                    className="object-cover rounded-full"
                    style={{ width: "30px", height: "30px" }}
                  />
                  </div>
                  {/* heading */}
                  <div className='font-bold'>
                    Open Water Diving
                  </div>
                  {/* para start */}
                  <div className='pt-4 font-lights'>
                  Capture the beauty of marine life with our specialized underwater photography courses.
                  </div>
                   {/* start ul tag */}
                  <div>
                    <ul className="custom-bullet">
                      <li>Professional Guidance</li>
                      <li>Equipment Rental</li>
                      <li>Photo Editing Tips</li>
                    </ul>
                </div>
                 {/* end ul tag */}
                
                 <div className=' py-3'>
                    <button className='btn btn-success  bg-[linear-gradient(to_right,#55C1EF_38%,#1B409F_90%)] py-2 text-white w-40 text-sm rounded-lg'>Learn More</button>
                </div>
                </div>

                {/* fourth */}
               
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 16,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
                    width: 298,
                    height:357,
                    paddingTop:16,
                    paddingLeft: 25,
                    marginBottom: 16,
                    display: "flex",
                    flexDirection: "column",
                  }}
              >
             
              {/* round image */}
              <div
                    className="bg-blue-400 rounded-full p-3 mb-4"
                    style={{
                      // border: "4px solid red", // <-- add this for a red circle border
                      width: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                  <img
                    src="/location.png"
                    alt="Banner"
                    className="object-cover rounded-full"
                    style={{ width: "30px", height: "30px" }}
                  />
                  </div>
                  {/* heading */}
                  <div className='font-bold'>
                    Open Water Diving
                  </div>
                  {/* para start */}
                  <div className='pt-4 font-lights'>
                  Explore Sri Lanka’s diving spots including coral reefs, shipwrecks, and marine sanctuaries 
                  </div>
                   {/* start ul tag */}
                  <div>
                    <ul className="custom-bullet">
                      <li>Multiple Locations</li>
                      <li>Transport included</li>
                      <li>Marine Life Guide</li>
                    </ul>
                </div>
                 {/* end ul tag */}
                
                 <div className=' py-3 pl-5'>
                    <button className='btn btn-success  bg-[linear-gradient(to_right,#55C1EF_38%,#1B409F_90%)] py-2 text-white w-40 text-sm rounded-lg'>Learn More</button>
                </div>
                </div>


              
    </div>

   {/* start Destination image  */}
   <div className='center-column'>
          <div className='gradient-text'>
            Top Diving Destinations 
          </div>
           <div className='mt-4 max-w-xl text-gray-700 text-sm font-light'>
            Book a trip to one of the world’s top diving destinations in sri Lanaka
            </div>
   </div>
        {/* end title */}
        {/* startimag */}
                    <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: 24,
                      width: "100%",
                      maxWidth: 1200,
                      paddingTop: 16,
                      margin: "0 auto",
                    }}>
                   {topdestination.map((img) => (
                     <div key={img.id} className="relative">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-40 object-cover rounded-lg shadow"
                  />
                  <div className="absolute bottom-2 left-2 font-bold text-white px-3 py-1 text-xl rounded">
                    {img.place}
                  </div>

                </div>
                ))}
                
                    
              </div>

              {/* teatimonials */}

              <div className=' center-column mt-10'>
              <h2 className="gradient-text">
              TestiMonials 
               </h2>
                
               </div>
               <div className='font-light text-4xl mx-20 mb-10 '>
               Don't take our word for it! <br />
               Hear it from our partners.
               </div>
               
               <div className="flex justify-end mx-25 mb-6">
                <button
                  onClick={() => navigate("/review")} 
                  className="bg-[#1B409F] hover:bg-[#163577] transition text-white font-bold text-xs py-2 px-2 rounded-lg shadow-md"
                >
                  + Add a Review
                </button>
              </div>


               
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mx-20">
                  {reviews.map((review, index) => (
                    <div
                      key={review.id}
                      className={`bg-[#F8F8F8] border-l-4  shadow-md p-4 rounded-lg ${review.border} 
                        ${index >= 3 ? "md:ml-12" : ""}`} // 👈 second row gets left margin
                    >
                      <div className="flex flex-row-2 space-x-2 items-center">
                         <div className=' text-4xl text-blue-500'>
                          <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                         </div>
                        <div className='mr-2 flex flex-col mr-5'>
                          <span className="font-bold ">{review.name}</span>
                          <StarRating rating={4.5} /> {/* Dynamic rating */}
                          </div>
                        
                        </div>
                  <p className="text-gray-600 text-sm">
                  Fantastic coaching, value for money After searching for dive centres 
                          I found the best one, Colombo divers! Super coaching, brilliant 
                          communication both in and out of water, and I achieved a dream to 
                          become a fiver thanks to Sherrik and the team at Colombo divers. 
                          Don't waste your time web shopping for dive centres, this is the 
                          place, the best price and the best education. You will not regret 
                          your decision to join Colombo divers, it is a best decision I made.
                  </p>
                </div>
                

      ))}
     
               </div>
                {/* // end textimonials */}

              {/* // start booking */}
              <div className=' center-column mt-10'>
              <h2 className="gradient-text">
              Bookable Adventures
               </h2>
                  
              </div>
              <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
							{multiDayTours.map((pkg, idx) => (
								<div
									key={idx}
									style={{
										background: "#fff",
										borderRadius: 16,
										boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
										width: 340,
										padding: 16,
										marginBottom: 16,
										display: "flex",
										flexDirection: "column",
									}}
								>
									<img src={pkg.image} alt={pkg.title} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12 }} />
									<h3 style={{ margin: "16px 0 8px", fontWeight: "bold" }}>{pkg.title}</h3>
									<div style={{ color: "#666", fontSize: 15, marginBottom: 8 }}>
                  <i className="fa fa-clock-o" aria-hidden="true"></i>
                    {pkg.details.join(" · ")}</div>
									<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
										<span style={{ fontWeight: "bold", fontSize: 18 }}>{pkg.price}</span>
										<span style={{ color: "#888", fontSize: 13 }}>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                      {pkg.per}</span>
										<button style={{ background: "#1B409F", color: "#fff", border: "none", borderRadius: 6, padding: "6px 18px", fontWeight: "bold", cursor: "pointer" }}>
											Book Now
										</button>
									</div>
									
								</div>
							))}
						</div>
            
            <div className='center-column'>
            <button style={{ background: "#1B409F",alignItems: "center", color: "#fff", border: "none", borderRadius: 6, padding: "6px 18px", fontWeight: "bold", cursor: "pointer" }}>
            View All Packages
										</button>
            </div>
          
            {/* end booking */}
           {/* start contact us */}
           <div className=' flex  relative'>
              <div className='mx-20'>
                    <h2 className="text-4xl font-bold bg-[linear-gradient(to_right,#55C1EF_43%,#11192F_80%)] bg-clip-text text-transparent mt-10">
                      Not sure where to go?
                      </h2>
                      <span className='text-2xl'> Get some inspiration from our travel themes.</span>
                      <div className='font-bold text-4xl mt-10'>
                      Contact us
                      </div>
                      <div className='text-2xl font-light'>
                      Our website is designed to help you find what you need 
                      to book a great trip. If you can't find what you're looking 
                      for, let us know.
                      </div>
                      <div className=' py-3'>
                       <button onClick={() => navigate("/contact")} className='btn btn-success rounded-lg  bg-[#1B409F] py-2 text-white w-40 text-xl font-bold cursor-pointer'>Conatact Us</button>
                      </div>
                </div>
                  <div className='mt-10 mx-20 font-kyiv text-2xl  font-bold '>
                          <div className='w-70 h-50 md:h-50 relative mt-10 mx-20  '> <img
                              src="/image1.png"
                            alt="Banner"
                            className="w-full h-full object-cover shadow-[0_8px_15px_rgba(0,0,0,0.5)]"
                        />
                        </div>
                    
                      <div className='w-50 h-70 md:h-50 relative ml-20'> 
                        <img
                            src="/colombodivers2.png"
                          alt="Banner"
                          className="w-full h-full object-cover shadow-[0_8px_15px_rgba(0,0,0,0.5)] absolute   transform -translate-x-1/2 -translate-y-1/2"
                        />
                      </div>
                  </div>
           </div>       
  </Layout>
    </>
   
  )
}

export default Homepage

import React, { useState } from "react";
import "../index.css";
import Learnmore from "../components/Learnmore";
import Services from "../components/Services";
import Topplace from "../components/Topplace";
import Testimonials from "../components/Testimonials";
import Bookable from "../components/Bookable";
import Contact from "../components/Contact";
import Awardsection from "../components/Awardsection";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import Lastsection from "../components/Lastsection";

const Index = () => {
	const [destination, setDestination] = useState("");
	const [isButtonHovered, setIsButtonHovered] = useState(false);

		const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (destination.trim()) {
			
			console.log("Searching for:", destination);
			alert(`Searching for: ${destination}`);
		}
	};

	return (
		<>
        {/* Navbar Section */}
        <Navbar/>
			<div
				style={{
					backgroundImage:
						"url('https://images.unsplash.com/photo-1749186012550-14654bad71a6?q=80&w=2094&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
					backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 10px",
				}}
			>
				<div style={{ textAlign: "center", color: "#fff", marginBottom: "40px" }}>
					<h1 style={{ fontFamily: "cursive", fontSize: "3rem", fontWeight: "bold", textShadow: "2px 2px 8px #000" }}>
						Paradisepeak Travels
					</h1>
					<h2 style={{ fontWeight: "normal", fontSize: "1.5rem", textShadow: "1px 1px 6px #000" }}>
						Book your diving
					</h2>
				</div>
				<form
					onSubmit={handleSearch}
					style={{
						background: "#23234c", padding: "20px 30px", display: "flex", alignItems: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.2)", maxWidth: "600px", width: "100%", gap: "10px",
					}}
				>
					<span style={{ color: "#fff" }}>
						<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
					</span>
					<input
						type="text"
						value={destination}
						onChange={(e) => setDestination(e.target.value)}
						placeholder="Where do you want to go?"
						style={{
							color: "#ffffffff", flex: 1, padding: "10px 15px", border: "none", fontSize: "1rem", outline: "none", transition: "box-shadow 0.2s", boxShadow: destination ? "0 0 0 2px #ffffffff" : "none",
						}}
					/>
					<button
						type="submit"
						onMouseEnter={() => setIsButtonHovered(true)}
						onMouseLeave={() => setIsButtonHovered(false)}
						style={{
							background: isButtonHovered ? "#ff6f61" : "#e74c3c", color: "#fff", border: "none", padding: "10px 24px", fontSize: "1rem", cursor: "pointer", fontWeight: "bold", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", transition: "background 0.2s",
						}}
					>
						Search
					</button>
				</form>
				<style>{`
					@media (max-width: 700px) {
						form {
							flex-direction: column !important;
							gap: 15px !important;
							padding: 16px 10px !important;
						}
					}
				`}</style>
			</div>

            {/* learn more section */}
			<Learnmore />

            {/* services section */}
            <Services />

            {/* top places section */}
            <Topplace />

            {/* testimonials section */}
            <Testimonials />

            {/* bookable adventures section */}
            <Bookable />

			{/* award section */}
			<Awardsection />

            {/* contact section */}
            <Contact />

			{/* last section */}	
			<Lastsection />

            {/* footer section */}
            <Footer />
		</>
	);
};

export default Index;

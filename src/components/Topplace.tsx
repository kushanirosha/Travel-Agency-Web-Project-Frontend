import React, { useState } from "react";

const destinations = [
	{
		name: "Maafushi",
		img: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fG1hbGRpdmVzfGVufDB8fDB8fHww",
	},
	{
		name: "Guraidhoo",
		img: "https://images.unsplash.com/photo-1609601546193-f558f1ebb385?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		name: "Ella",
		img: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxsYXxlbnwwfHwwfHx8MA%3D%3D",
	},
	{
		name: "Maldives",
		img: "https://images.unsplash.com/photo-1571497569639-7bd0fcd36c64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fG1hbGRpdmVzfGVufDB8fDB8fHww",
	},
	{
		name: "Mirissa",
		img: "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlyaXNzYXxlbnwwfHwwfHx8MA%3D%3D",
	},
	{
		name: "Manigala",
		img: "https://images.unsplash.com/photo-1682308999971-208126ba75ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fG1hbGRpdmVzfGVufDB8fDB8fHww",
	},
];

const Topplace = () => {
	const [activeIdx, setActiveIdx] = useState(-1);
	const [hoverIdx, setHoverIdx] = useState(-1);
	return (
		<div style={{ background: "#fff", padding: "48px 0" }}>
			<div style={{ textAlign: "center", marginBottom: "18px" }}>
				<h2 style={{ fontWeight: "bold", fontSize: "2rem", marginBottom: "4px" }}>
					<span style={{ color: "#00076bff" }}>Top Diving</span>
					<span style={{ color: "#00076bff", marginLeft: "6px" }}>Destinations</span>
				</h2>
				<p style={{ color: "#555", fontSize: "1rem", marginTop: "8px", marginBottom: "32px" }}>
					Book a trip to one of the world's top diving destinations in Sri Lanka
				</p>
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, minmax(260px, 1fr))",
					gap: "32px",
					justifyContent: "center",
					maxWidth: "1200px",
					margin: "0 auto",
				}}
			>
					{destinations.map((dest, idx) => {
						const isActive = activeIdx === idx;
						const isHover = hoverIdx === idx;
						return (
							<div
								key={dest.name}
								onMouseEnter={() => setHoverIdx(idx)}
								onMouseLeave={() => setHoverIdx(-1)}
								onClick={() => setActiveIdx(idx)}
								style={{
									position: "relative",
									overflow: "hidden",
									transition: "box-shadow 0.2s",
									minHeight: "230px",
									height: "80px",
									display: "flex",
									alignItems: "flex-end",
									cursor: "pointer",
								}}
							>
								<img
									src={dest.img}
									alt={dest.name}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
										display: "block",
										filter: isActive || isHover ? "brightness(1)" : "brightness(0.85)",
										transition: "filter 0.2s",
									}}
								/>
								<div
									style={{
										position: "absolute",
										left: 0,
										right: 0,
										bottom: 0,
										height: "48px",
										color: "#ffffffff",
										fontWeight: "bold",
										fontSize: "1.08rem",
										display: "flex",
										alignItems: "center",
										paddingLeft: "18px",
										letterSpacing: "0.5px",
										borderBottomLeftRadius: "12px",
										borderBottomRightRadius: "12px",
										transition: "background 0.2s, color 0.2s",
									}}
								>
									{dest.name}
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Topplace;

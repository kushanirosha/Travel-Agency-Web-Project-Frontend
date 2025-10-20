import React from "react";
import { FaSwimmer, FaUserNinja, FaCameraRetro, FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router";

type Service = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
};

const services: Service[] = [
  {
	 icon: <FaSwimmer size={36} color="#000000ff" />,
	 title: "Open Water Diving",
	 description: "Perfect for beginners. Get certified and explore depth up to 18 meters with our expert instructors.",
	 features: ["PADI Certification", "6-Day Course", "Equipment Included"],
	 image:
	   "https://images.unsplash.com/photo-1620200221673-893d12cab0ef?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	 alt: "Beginner open water diver in the ocean",
  },
  {
	 icon: <FaUserNinja size={36} color="#000000ff" />,
	 title: "Open Water Diving",
	 description: "Take your skills to the next level with advanced techniques and deeper dive experiences.",
	 features: ["Deep Diving", "Night Diving", "Wreck Exploration"],
	 image:
	   "https://plus.unsplash.com/premium_photo-1736421942363-087a0ebec563?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	 alt: "Advanced diver exploring a shipwreck",
  },
  {
	 icon: <FaCameraRetro size={36} color="#000000ff" />,
	 title: "Open Water Diving",
	 description: "Capture the beauty of marine life with our specialized underwater photography courses.",
	 features: ["Professional Guidance", "Equipment Rental", "Photo Editing Tips"],
	 image:
	   "https://images.unsplash.com/photo-1615276422818-9b881f6adce5?q=80&w=1960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	 alt: "Underwater photographer capturing marine life",
  },
  {
	 icon: <FaMapMarkedAlt size={36} color="#000000ff" />,
	 title: "Open Water Diving",
	 description: "Explore Sri Lanka's diving spots including coral reefs, shipwrecks, and marine sanctuaries.",
	 features: ["Multiple Locations", "Transport Included", "Marine Life Guide"],
	 image:
	   "https://images.unsplash.com/photo-1590602391331-45262cb1cb87?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	 alt: "Scenic coral reef with vibrant fish in Sri Lanka",
  },
];

const Services = () => {
	const [openIndex, setOpenIndex] = React.useState<number | null>(null);
	const sectionRef = React.useRef<HTMLElement>(null);
	const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);
	const scrollTimeout = React.useRef<number | null>(null);

	const toggle = (idx: number) => {
		setOpenIndex(prev => (prev === idx ? null : idx));
	};

	const onHeaderKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, idx: number) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggle(idx);
		}
	};


	React.useEffect(() => {
		if (openIndex === null) return;
		if (scrollTimeout.current) {
			window.clearTimeout(scrollTimeout.current);
		}

		scrollTimeout.current = window.setTimeout(() => {
			const el = itemRefs.current[openIndex!];
			if (el) {
				el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			}
		}, 60);
		return () => {
			if (scrollTimeout.current) {
				window.clearTimeout(scrollTimeout.current);
			}
		};
	}, [openIndex]);

	React.useEffect(() => {
		const node = sectionRef.current;
		if (!node) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) {
					setOpenIndex(null);
				}
			},
			{ threshold: 0 }
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<section ref={sectionRef} style={{ 
			background: "#ffffffff", 
			padding: "100px 20px",
			minHeight: "100vh"
		}}>
			<div style={{ 
				maxWidth: "1200px", 
				margin: "0 auto",
			}}>
				{/* Header Section */}
				<div style={{ 
					textAlign: "left", 
					marginBottom: "60px" 
				}}>
					<p style={{ 
						color: "#0f0061ff", 
						fontSize: "2rem", 
						fontWeight: "700",
						marginBottom: "10px",
						textTransform: "uppercase",
						letterSpacing: "0.1em"
					}}>
						Our Services
					</p>
					<h2 style={{ 
						color: "#0003afff", 
						fontWeight: "700", 
						fontSize: "2.5rem", 
						marginBottom: "20px",
						fontFamily: "'Inter', -apple-system, sans-serif",
						lineHeight: "1.2"
					}}>
						Unlock Our Exclusive<br />
						Services Just for You
					</h2>
					<p style={{ 
						color: "#666", 
						fontSize: "1rem", 
						maxWidth: "500px",
						lineHeight: "1.6"
					}}>
						Experience tailor-made solutions designed to elevate your journey only available here.
					</p>
				</div>

				<div style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "80px",
					alignItems: "start"
				}}>
					{(() => {
						const activeIndex = openIndex ?? 0;
						const active = services[activeIndex];
						return (
							<div style={{ 
								position: "sticky",
								top: 120,
								alignSelf: "start"
							}}>
								<img
									src={active.image}
									alt={active.alt}
									style={{
										width: "100%",
										height: "700px",
										objectFit: "cover",
										boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
										transition: "opacity 0.3s ease",
									}}
								/>
							</div>
						);
					})()}


					<div 
						style={{ 
							padding: "20px 0"
						}}
						onMouseEnter={() => setOpenIndex(prev => (prev === null ? 0 : prev))}
						onMouseLeave={() => setOpenIndex(null)}
					>
						{services.map((service, idx) => (
							<div
								key={idx}
								style={{
									marginBottom: "40px",
									padding: "0",
									borderBottom: idx < services.length - 1 ? "1px solid #e5e5e5" : "none",
									paddingBottom: idx < services.length - 1 ? "40px" : "0"
								}}
								onMouseEnter={() => setOpenIndex(idx)}
								ref={(el) => { itemRefs.current[idx] = el; }}
							>
								{(() => {
									const isOpen = openIndex === idx;
									return (
										<>

											<div
												role="button"
												tabIndex={0}
												onClick={() => toggle(idx)}
												onKeyDown={(e) => onHeaderKeyDown(e, idx)}
												aria-expanded={isOpen}
												style={{
													display: "flex",
													alignItems: "flex-start",
													marginBottom: "15px",
													cursor: "pointer",
													userSelect: "none"
												}}
											>
												<span style={{
													color: "#0b006bff",
													fontSize: "1.2rem",
													fontWeight: "700",
													marginRight: "15px",
													minWidth: "30px"
												}}>
													{String(idx + 1).padStart(2, '0')}.
												</span>
												<h3 style={{ 
													color: "#2c3e50", 
													fontWeight: "600", 
													fontSize: "1.3rem", 
													margin: "0",
													lineHeight: "1.3"
												}}>
													{service.title}
												</h3>
												<span
													aria-hidden="true"
													style={{
														marginLeft: "auto",
														color: "#00026dff",
														transition: "transform 0.25s ease",
														transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
														fontSize: "1.2rem",
														lineHeight: 1
													}}
												>
													▾
												</span>
											</div>

											<div
												style={{
													marginLeft: "45px",
													overflow: "hidden",
													maxHeight: isOpen ? "500px" : "0px",
													opacity: isOpen ? 1 : 0,
													transform: isOpen ? "translateY(0)" : "translateY(-6px)",
													transition: "max-height 0.4s ease, opacity 0.3s ease, transform 0.3s ease"
												}}
											>

												<p style={{ 
													color: "#666", 
													fontSize: "0.95rem", 
													lineHeight: "1.6",
													marginBottom: "15px"
												}}>
													{service.description}
												</p>

												<div>
													{service.features.map((feature, i) => (
														<div key={i} style={{
															display: "flex",
															alignItems: "center",
															marginBottom: "5px"
														}}>
															<div style={{
																width: "6px",
																height: "6px",
																backgroundColor: "#001780ff",
																borderRadius: "50%",
																marginRight: "12px"
															}}></div>
															<span style={{
																color: "#555",
																fontSize: "0.9rem"
															}}>
																{feature}
															</span>
														</div>
													))}
												</div>
											</div>
										</>
									);
								})()}
							</div>
						))}

						<Link to="/packages" style={{ textDecoration: 'none' }}>
							<button
								style={{
									background: "linear-gradient(135deg, #001263ff 0%, #001263ff 100%)",
									color: "#fff",
									border: "none",
									padding: "15px 40px",
									fontSize: "1rem",
									fontWeight: "600",
									cursor: "pointer",
									transition: "all 0.3s ease",
									marginTop: "30px"
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.transform = "translateY(-3px)";
									e.currentTarget.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.4)";
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.transform = "translateY(0)";
									e.currentTarget.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.3)";
								}}
							>
								Explore All Services
							</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Custom hook for animated counter
const useAnimatedCounter = (end: number, duration: number = 2000, shouldStart: boolean = false) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!shouldStart) return;

		let startTime: number;
		let animationFrame: number;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			
			// Easing function for smooth animation
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			setCount(Math.floor(end * easeOutQuart));

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animate);
			}
		};

		animationFrame = requestAnimationFrame(animate);

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	}, [end, duration, shouldStart]);

	return count;
};

const Learnmore = () => {
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(false);
	const [startCounters, setStartCounters] = useState(false);
	const revealRef = useRef<HTMLDivElement>(null);
	const statsRef = useRef<HTMLDivElement>(null);

	// Animated counters
	const yearsCount = useAnimatedCounter(15, 2000, startCounters);
	const diversCount = useAnimatedCounter(500, 2500, startCounters);
	const sitesCount = useAnimatedCounter(25, 1800, startCounters);

	const handleLearnMore = () => {
		navigate("/about");
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{
				threshold: 0.3,
				rootMargin: '0px 0px -100px 0px'
			}
		);

		if (revealRef.current) {
			observer.observe(revealRef.current);
		}

		return () => {
			if (revealRef.current) {
				observer.unobserve(revealRef.current);
			}
		};
	}, []);

	// Observer for stats animation
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setStartCounters(true);
				}
			},
			{
				threshold: 0.5,
				rootMargin: '0px 0px -50px 0px'
			}
		);

		if (statsRef.current) {
			observer.observe(statsRef.current);
		}

		return () => {
			if (statsRef.current) {
				observer.unobserve(statsRef.current);
			}
		};
	}, []);

	const containerStyle: React.CSSProperties = {
		minHeight: "100vh",
		background: "#ffffff",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "100px 20px",
		position: "relative",
	};

	const contentContainerStyle: React.CSSProperties = {
		maxWidth: "1200px",
		width: "100%",
		display: "grid",
		gridTemplateColumns: "1.2fr 1fr",
		gap: "120px",
		alignItems: "center",
	};

	const imageContainerStyle: React.CSSProperties = {
		position: "relative",
		aspectRatio: "4/3",
		borderRadius: "0",
		overflow: "hidden",
		background: "#f8f9fa",
		height: "700px",
		width: "500px",
	};

	const mainImageStyle: React.CSSProperties = {
		width: "100%",
		height: "100%",
		objectFit: "cover",
		transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
		filter: "grayscale(20%) contrast(1.05)",
	};

	const accentLineStyle: React.CSSProperties = {
		position: "absolute",
		top: "-20px",
		left: "0",
		width: "60px",
		height: "2px",
		background: "#000152ff",
		zIndex: 2,
	};

	const textContainerStyle: React.CSSProperties = {
		padding: "0",
		background: "transparent",
		position: "relative",
	};

	const titleStyle: React.CSSProperties = {
		fontSize: "4rem",
		fontWeight: "100",
		color: "#00087aff",
		marginBottom: "40px",
		letterSpacing: "-0.03em",
		lineHeight: "0.9",
		fontFamily: "'Inter', -apple-system, sans-serif",
	};

	const subtitleStyle: React.CSSProperties = {
		fontSize: "2rem",
		color: "#000000ff",
		marginBottom: "40px",
		lineHeight: "1.4",
		fontWeight: "300",
		letterSpacing: "0.02em",
		opacity: isVisible ? 1 : 0,
		transform: isVisible ? "translateY(0)" : "translateY(30px)",
		transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
		transitionDelay: "0.2s",
	};

	const descriptionStyle: React.CSSProperties = {
		fontSize: "1.25rem",
		color: "#555",
		lineHeight: "1.7",
		marginBottom: "80px",
		fontWeight: "400",
		maxWidth: "90%",
		opacity: isVisible ? 1 : 0,
		transform: isVisible ? "translateY(0)" : "translateY(40px)",
		transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
		transitionDelay: "0.4s",
	};

	const buttonContainerStyle: React.CSSProperties = {
		display: "flex",
		alignItems: "center",
		gap: "20px",
	};

	const buttonStyle: React.CSSProperties = {
		background: "transparent",
		color: "#000",
		border: "1px solid #000",
		padding: "18px 0",
		fontSize: "0.9rem",
		fontWeight: "500",
		cursor: "pointer",
		transition: "all 0.3s ease",
		position: "relative",
		overflow: "hidden",
		letterSpacing: "0.1em",
		textTransform: "uppercase",
		width: "180px",
		textAlign: "center" as const,
	};

	const arrowStyle: React.CSSProperties = {
		fontSize: "1.2rem",
		color: "#0c0075ff",
		transition: "transform 0.3s ease",
	};

	const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.style.background = "#0c0075ff";
		e.currentTarget.style.color = "#fff";
		const arrow = e.currentTarget.nextElementSibling as HTMLElement;
		if (arrow) arrow.style.transform = "translateX(10px)";
	};

	const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.style.background = "transparent";
		e.currentTarget.style.color = "#000";
		const arrow = e.currentTarget.nextElementSibling as HTMLElement;
		if (arrow) arrow.style.transform = "translateX(0)";
	};

	const statsContainerStyle: React.CSSProperties = {
		display: "flex",
		gap: "60px",
		marginTop: "80px",
		paddingTop: "10px",
		borderTop: "1px solid #eee",
	};

	const statStyle: React.CSSProperties = {
		textAlign: "center" as const,
	};

	const statNumberStyle: React.CSSProperties = {
		fontSize: "2.5rem",
		fontWeight: "100",
		color: "#000",
		display: "block",
		lineHeight: "1",
	};

	const statLabelStyle: React.CSSProperties = {
		fontSize: "0.8rem",
		color: "#999",
		textTransform: "uppercase",
		letterSpacing: "0.1em",
		marginTop: "8px",
	};

	return (
		<div style={containerStyle}>
			<div style={contentContainerStyle}>
				<div style={textContainerStyle}>
					<div style={accentLineStyle}></div>
					<h2 style={titleStyle}>
						Paradise<br />
						<span style={{ fontWeight: "400" }}>Peak</span>
					</h2>
					<div ref={revealRef}>
						<p style={subtitleStyle}>
							Where ocean meets excellence
						</p>
						<p style={descriptionStyle}>
							We are Sri Lanka's premier diving center, offering world-class PADI certified training 
							and underwater expeditions. Our expert team guides you through pristine coral reefs, 
							historic shipwrecks, and the vibrant marine ecosystems of the Indian Ocean.
						</p>
					</div>
					<div style={buttonContainerStyle}>
						<button
							onClick={handleLearnMore}
							style={buttonStyle}
							onMouseEnter={handleButtonHover}
							onMouseLeave={handleButtonLeave}
						>
							Discover More
						</button>
						<span style={arrowStyle}>→</span>
					</div>
					<div style={statsContainerStyle} ref={statsRef}>
						<div style={statStyle}>
							<span style={statNumberStyle}>{yearsCount}+</span>
							<span style={statLabelStyle}>Years Experience</span>
						</div>
						<div style={statStyle}>
							<span style={statNumberStyle}>{diversCount}+</span>
							<span style={statLabelStyle}>Certified Divers</span>
						</div>
						<div style={statStyle}>
							<span style={statNumberStyle}>{sitesCount}+</span>
							<span style={statLabelStyle}>Dive Sites</span>
						</div>
					</div>
				</div>
				<div style={imageContainerStyle}>
					<img
						src="https://images.unsplash.com/photo-1553512313-64af79fdfe9c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						style={mainImageStyle}
					/>
				</div>
			</div>
		</div>
	);
};

export default Learnmore;

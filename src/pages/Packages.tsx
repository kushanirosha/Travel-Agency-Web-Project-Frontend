import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { packageService, Package } from "../services/packageService";

const PACKAGES_CACHE_KEY = "packages_cache";
const PACKAGES_CACHE_TIME_KEY = "packages_cache_time";
const PACKAGES_ACTIVE_TAB_KEY = "packages_active_tab";
const PACKAGES_SCROLL_Y_KEY = "packages_scroll_y";
const PACKAGES_RESTORE_FLAG_KEY = "packages_restore_scroll";

const Packages = () => {
	const [activeTab, setActiveTab] = useState(() => {
		const saved = sessionStorage.getItem(PACKAGES_ACTIVE_TAB_KEY);
		return saved || "Sri Lanka Packages";
	});
	const [packages, setPackages] = useState<Package[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		// 1) Hydrate from cache immediately to avoid spinner on back nav
		const cached = sessionStorage.getItem(PACKAGES_CACHE_KEY);
		if (cached) {
			try {
				const parsed: Package[] = JSON.parse(cached);
				if (Array.isArray(parsed)) {
					setPackages(parsed);
					setLoading(false);
				}
			} catch {}
		}

		// 2) Always do a background refresh for freshness
		// If we already showed cached content, refresh silently; otherwise normal load
		const useSilent = Boolean(cached);
		loadPackages(useSilent);

		// 3) Restore scroll position if flagged
		const shouldRestore = sessionStorage.getItem(PACKAGES_RESTORE_FLAG_KEY) === "1";
		if (shouldRestore) {
			const y = Number(sessionStorage.getItem(PACKAGES_SCROLL_Y_KEY) || 0);
			// Use rAF to ensure layout is ready
			requestAnimationFrame(() => {
				window.scrollTo(0, isNaN(y) ? 0 : y);
			});
			// Clear the flag so it doesn't keep restoring
			sessionStorage.removeItem(PACKAGES_RESTORE_FLAG_KEY);
		}
	}, []);

	const loadPackages = async (silent: boolean = false) => {
		try {
			if (!silent) setLoading(true);
			console.log('Loading packages from API...');
			// Only fetch active packages for frontend users
			const data = await packageService.getPackages({ status: 'Active' });
			console.log('Packages loaded:', data);
			setPackages(data);
			// Cache for fast back navigation
			sessionStorage.setItem(PACKAGES_CACHE_KEY, JSON.stringify(data));
			sessionStorage.setItem(PACKAGES_CACHE_TIME_KEY, String(Date.now()));
			setError(null);
		} catch (err: any) {
			console.error('Error loading packages:', err);
			if (!silent) {
				setError(err.error || err.message || 'Failed to load packages');
			}
		} finally {
			if (!silent) setLoading(false);
		}
	};

	// Filter packages
	const getCurrentPackages = () => {
		const category = activeTab === "Sri Lanka Packages" ? "Sri Lanka" : "Maldives";
		return packages.filter(pkg => pkg.category === category);
	};

	
	const getPackagesByType = (type: string) => {
		return getCurrentPackages().filter(pkg => pkg.type === type);
	};

	const formatPrice = (pkg: Package) => {
		const symbol = pkg.currency === 'USD' ? 'US$' : 'Rs.';
		return `${symbol}${pkg.price.toFixed(2)}`;
	};

	const getPackageDetails = (pkg: Package) => {
		const details = [];
		if (pkg.duration) details.push(pkg.duration);
		if (pkg.maxPeople) details.push(`Max ${pkg.maxPeople} people`);
		if (pkg.difficulty) details.push(pkg.difficulty);
		return details.slice(0, 3); 
	};

	const getPackageFeatures = (pkg: Package) => {
		const features = [];
		if (pkg.inclusions && pkg.inclusions.length > 0) {
			features.push(...pkg.inclusions.slice(0, 4));
		}
		return features;
	};

	const handlePackageClick = (pkg: Package) => {
		// Persist current scroll position so we can restore when user goes back
		sessionStorage.setItem(PACKAGES_SCROLL_Y_KEY, String(window.scrollY));
		sessionStorage.setItem(PACKAGES_RESTORE_FLAG_KEY, "1");
		navigate(`/packages/${pkg.slug}`);
	};

	// Persist active tab on change
	const selectTab = (tab: string) => {
		setActiveTab(tab);
		sessionStorage.setItem(PACKAGES_ACTIVE_TAB_KEY, tab);
	};

	if (loading) {
		return (
			<>
				<Navbar />
				<div style={{ maxWidth: 1200, margin: "0 auto", padding: "130px 0", textAlign: "center" }}>
					<h1 style={{ fontFamily: "inter", fontWeight: 600, color: "#120075ff", fontSize: 36 }}>
						Loading packages...
					</h1>
				</div>
				<Footer />
			</>
		);
	}

	if (error) {
		return (
			<>
				<Navbar />
				<div style={{ maxWidth: 1200, margin: "0 auto", padding: "130px 0", textAlign: "center" }}>
					<h1 style={{ fontFamily: "inter", fontWeight: 600, color: "#ef4444", fontSize: 36 }}>
						Error loading packages
					</h1>
					<p style={{ color: "#666", margin: "16px 0" }}>{error}</p>
					<button 
						onClick={() => loadPackages(false)}
						style={{ 
							background: "#000769ff", 
							color: "#fff", 
							border: "none", 
							padding: "10px 20px", 
							borderRadius: 6, 
							cursor: "pointer" 
						}}
					>
						Retry
					</button>
				</div>
				<Footer />
			</>
		);
	}

	const multiDayTours = getPackagesByType("MULTI DAY TOURS");
	const experiences = getPackagesByType("EXPERIENCES");
	const dayTrips = getPackagesByType("DAY TRIPS");

	return (
		<>
			<Navbar />
			<div style={{ maxWidth: 1200, margin: "0 auto", padding: "130px 0" }}>
				<h1 style={{ textAlign: "center", fontFamily: "Inter, Arial, sans-serif", fontWeight: 600, color: "#120075ff", fontSize: 36, marginBottom: 0 }}>
					Tour Packages
				</h1>
				<p style={{ textAlign: "center", color: "#444", margin: "8px 0 24px" }}>
					Choose from our carefully curated experiences. Enjoy expert-friendly advice<br />
					and hassle-free booking for multi-day tours and unique experiences.
				</p>
				<div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
					<button
						style={{
							background: activeTab === "Sri Lanka Packages" ? "#000769ff" : "#eee",
							color: activeTab === "Sri Lanka Packages" ? "#fff" : "#444",
							border: "none",
							padding: "10px 220px",
							fontWeight: "bold",
							cursor: "pointer",
						}}
						onClick={() => selectTab("Sri Lanka Packages")}
					>
						Sri Lanka Packages
					</button>
					<button
						style={{
							background: activeTab === "Maldives Packages" ? "#000769ff" : "#eee",
							color: activeTab === "Maldives Packages" ? "#fff" : "#444",
							border: "none",
							padding: "10px 220px",
							fontWeight: "bold",
							cursor: "pointer",
						}}
						onClick={() => selectTab("Maldives Packages")}
					>
						Maldives Packages
					</button>
				</div>

				{activeTab === "Sri Lanka Packages" && (
					<>
						{multiDayTours.length > 0 && (
							<>
								<h2 style={{ textAlign: "center", margin: "32px 0 16px", fontWeight: "bold" }}>MULTI DAY TOURS</h2>
								<div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
									{multiDayTours.map((pkg) => (
										<div
											key={pkg._id}
											style={{
												background: "#fff",
												boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
												width: 380,
												padding: 16,
												marginBottom: 16,
												display: "flex",
												flexDirection: "column",
												cursor: "pointer",
											}}
											onClick={() => handlePackageClick(pkg)}
										>
											<img 
												src={pkg.mainImage ? `https://backend.paradisepeaktravels.com${pkg.mainImage}` : "https://theportuguesetraveler.com/wp-content/uploads/2024/11/nine-arches-bridge-train-sri-lanka-53.jpg.webp"} 
												alt={pkg.title} 
												style={{ width: "100%", height: 160, objectFit: "cover" }} 
											/>
											<h3 style={{ fontSize: 18, fontWeight: 600, margin: "12px 0 8px", color: "#333" }}>{pkg.title}</h3>
											<div style={{ fontSize: 24, fontWeight: 700, color: "#000769ff", marginBottom: 8 }}>
												{formatPrice(pkg)}
												<span style={{ fontSize: 14, fontWeight: 400, color: "#666", marginLeft: 4 }}>
													{pkg.pricePerText || "per person"}
												</span>
											</div>
											<div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
												{getPackageDetails(pkg).map((detail, idx) => (
													<span key={idx} style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: 4, fontSize: 12, color: "#666" }}>
														{detail}
													</span>
												))}
											</div>
											<div style={{ fontSize: 14, color: "#666" }}>
												{getPackageFeatures(pkg).map((feature, idx) => (
													<div key={idx} style={{ margin: "2px 0" }}>• {feature}</div>
												))}
											</div>
										</div>
									))}
								</div>
							</>
						)}

						{experiences.length > 0 && (
							<>
								<h2 style={{ textAlign: "center", margin: "32px 0 16px", fontWeight: "bold" }}>EXPERIENCES</h2>
								<div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
									{experiences.map((pkg) => (
										<div
											key={pkg._id}
											style={{
												background: "#fff",
												boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
												width: 380,
												padding: 16,
												marginBottom: 16,
												display: "flex",
												flexDirection: "column",
												cursor: "pointer",
											}}
											onClick={() => handlePackageClick(pkg)}
										>
											<img 
												src={pkg.mainImage ? `${pkg.mainImage}` : "https://theportuguesetraveler.com/wp-content/uploads/2024/11/nine-arches-bridge-train-sri-lanka-53.jpg.webp"} 
												alt={pkg.title} 
												style={{ width: "100%", height: 160, objectFit: "cover" }} 
											/>
											<h3 style={{ fontSize: 18, fontWeight: 600, margin: "12px 0 8px", color: "#333" }}>{pkg.title}</h3>
											<div style={{ fontSize: 24, fontWeight: 700, color: "#000769ff", marginBottom: 8 }}>
												{formatPrice(pkg)}
												<span style={{ fontSize: 14, fontWeight: 400, color: "#666", marginLeft: 4 }}>
													{pkg.pricePerText || "per person"}
												</span>
											</div>
											<div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
												{getPackageDetails(pkg).map((detail, idx) => (
													<span key={idx} style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: 4, fontSize: 12, color: "#666" }}>
														{detail}
													</span>
												))}
											</div>
											<div style={{ fontSize: 14, color: "#666" }}>
												{getPackageFeatures(pkg).map((feature, idx) => (
													<div key={idx} style={{ margin: "2px 0" }}>• {feature}</div>
												))}
											</div>
										</div>
									))}
								</div>
							</>
						)}
					</>
				)}

				{activeTab === "Maldives Packages" && (
					<>
						{dayTrips.length > 0 && (
							<>
								<h2 style={{ textAlign: "center", margin: "32px 0 16px", fontWeight: "bold" }}>DAY TRIPS</h2>
								<div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
									{dayTrips.map((pkg) => (
										<div
											key={pkg._id}
											style={{
												background: "#fff",
												boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
												width: 380,
												padding: 16,
												marginBottom: 16,
												display: "flex",
												flexDirection: "column",
												cursor: "pointer",
											}}
											onClick={() => handlePackageClick(pkg)}
										>
											<img 
												src={pkg.mainImage ? `https://backend.paradisepeaktravels.com${pkg.mainImage}` : "https://digital.ihg.com/is/image/ihg/vignette-collection-noonu-atoll-9970118335-2x1"} 
												alt={pkg.title} 
												style={{ width: "100%", height: 160, objectFit: "cover" }} 
											/>
											<h3 style={{ fontSize: 18, fontWeight: 600, margin: "12px 0 8px", color: "#333" }}>{pkg.title}</h3>
											<div style={{ fontSize: 24, fontWeight: 700, color: "#000769ff", marginBottom: 8 }}>
												{formatPrice(pkg)}
												<span style={{ fontSize: 14, fontWeight: 400, color: "#666", marginLeft: 4 }}>
													{pkg.pricePerText || "per person"}
												</span>
											</div>
											<div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
												{getPackageDetails(pkg).map((detail, idx) => (
													<span key={idx} style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: 4, fontSize: 12, color: "#666" }}>
														{detail}
													</span>
												))}
											</div>
											<div style={{ fontSize: 14, color: "#666" }}>
												{getPackageFeatures(pkg).map((feature, idx) => (
													<div key={idx} style={{ margin: "2px 0" }}>• {feature}</div>
												))}
											</div>
										</div>
									))}
								</div>
							</>
						)}

						{experiences.length > 0 && (
							<>
								<h2 style={{ textAlign: "center", margin: "32px 0 16px", fontWeight: "bold" }}>EXPERIENCES</h2>
								<div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
									{experiences.map((pkg) => (
										<div
											key={pkg._id}
											style={{
												background: "#fff",
												boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
												width: 380,
												padding: 16,
												marginBottom: 16,
												display: "flex",
												flexDirection: "column",
												cursor: "pointer",
											}}
											onClick={() => handlePackageClick(pkg)}
										>
											<img 
												src={pkg.mainImage ? `https://backend.paradisepeaktravels.com${pkg.mainImage}` : "https://digital.ihg.com/is/image/ihg/vignette-collection-noonu-atoll-9970118335-2x1"} 
												alt={pkg.title} 
												style={{ width: "100%", height: 160, objectFit: "cover" }} 
											/>
											<h3 style={{ fontSize: 18, fontWeight: 600, margin: "12px 0 8px", color: "#333" }}>{pkg.title}</h3>
											<div style={{ fontSize: 24, fontWeight: 700, color: "#000769ff", marginBottom: 8 }}>
												{formatPrice(pkg)}
												<span style={{ fontSize: 14, fontWeight: 400, color: "#666", marginLeft: 4 }}>
													{pkg.pricePerText || "per person"}
												</span>
											</div>
											<div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
												{getPackageDetails(pkg).map((detail, idx) => (
													<span key={idx} style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: 4, fontSize: 12, color: "#666" }}>
														{detail}
													</span>
												))}
											</div>
											<div style={{ fontSize: 14, color: "#666" }}>
												{getPackageFeatures(pkg).map((feature, idx) => (
													<div key={idx} style={{ margin: "2px 0" }}>• {feature}</div>
												))}
											</div>
										</div>
									))}
								</div>
							</>
						)}
					</>
				)}

				{getCurrentPackages().length === 0 && (
					<div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>
						<h3>No packages available</h3>
						<p>No packages found for {activeTab.replace(" Packages", "")}. Please check back later.</p>
					</div>
				)}
			</div>
			<Footer/>
		</>
	);
};

export default Packages;
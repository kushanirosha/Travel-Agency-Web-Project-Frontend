import React, { useState, useEffect } from "react";
import { FaStar, FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Package } from '../services/packageService';
import { packageService } from '../services/packageService';

const Bookable = () => {
	const [packages, setPackages] = useState<Package[]>([]);
	const [loading, setLoading] = useState(true);
	const [favorites, setFavorites] = useState<Set<string>>(new Set());
	const [currentSlide, setCurrentSlide] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		loadFeaturedPackages();
	}, []);

	const loadFeaturedPackages = async () => {
		try {
			setLoading(true);
			console.log('Bookable: Starting to load featured packages...');
			
			const activePackages = await packageService.getPackages({ status: 'Active' });
			console.log('Bookable: Active packages from API:', activePackages);
			console.log('Bookable: Active packages count:', activePackages.length);
			
			const packagesWithImages = activePackages.filter(pkg => 
				pkg.mainImage || (pkg.images && pkg.images.length > 0)
			);
			console.log('Bookable: Active packages with images:', packagesWithImages);
			
			const featuredPackages = packagesWithImages.slice(0, 6);
			console.log('Bookable: Featured packages for display:', featuredPackages);
			
			setPackages(featuredPackages);
		} catch (error) {
			console.error('Bookable: Error loading featured packages:', error);
			console.error('Bookable: Error details:', error instanceof Error ? error.message : 'Unknown error');
		} finally {
			setLoading(false);
		}
	};

	const formatPrice = (pkg: Package) => {
		const symbol = pkg.currency === 'USD' ? 'US$' : 'Rs.';
		return `${symbol}${pkg.price.toFixed(2)}`;
	};

	const getImageUrl = (imagePath?: string) => {
		if (imagePath) {
			return `https://backend.paradisepeaktravels.com${imagePath}`;
		}
		return null;
	};

	const getPackageImage = (pkg: Package) => {
		
		if (pkg.mainImage) {
			return getImageUrl(pkg.mainImage);
		}
		if (pkg.images && pkg.images.length > 0) {
			return getImageUrl(pkg.images[0].url);
		}
		return null;
	};

	const handlePackageClick = (pkg: Package) => {
		navigate(`/packages/${pkg.slug}`);
	};

	const toggleFavorite = (packageId: string, e: React.MouseEvent) => {
		e.stopPropagation();
		setFavorites(prev => {
			const newFavorites = new Set(prev);
			if (newFavorites.has(packageId)) {
				newFavorites.delete(packageId);
			} else {
				newFavorites.add(packageId);
			}
			return newFavorites;
		});
	};

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % Math.ceil(displayPackages.length / 4));
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + Math.ceil(displayPackages.length / 4)) % Math.ceil(displayPackages.length / 4));
	};

	const displayPackages = packages.filter(pkg => getPackageImage(pkg) !== null);

	return (
		<div style={{ background: "#fff", padding: "40px 20px", maxWidth: "1400px", margin: "0 auto" }}>
			<div style={{ textAlign: "center", marginBottom: "40px" }}>
				<h2 style={{ fontWeight: "bold", fontSize: "2.5rem", marginBottom: "8px", color: "#1a1a1a" }}>
					<span style={{ color: "#07006dff" }}>Bookable</span> Adventures
				</h2>
				<p style={{ fontSize: "1.1rem", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
					Choose from our carefully curated experiences, from beginner-friendly adventures to advanced excursions
					across Sri Lanka and the Maldives.
				</p>
			</div>
			
			{loading ? (
				<div style={{ textAlign: "center", padding: "60px 0" }}>
					<div style={{ fontSize: "1.2rem", color: "#666" }}>Loading amazing adventures...</div>
				</div>
			) : (
				<div style={{ position: "relative" }}>
					{/* Navigation arrows */}
					{displayPackages.length > 4 && (
						<>
							<button
								onClick={prevSlide}
								style={{
									position: "absolute",
									left: "-20px",
									top: "50%",
									transform: "translateY(-50%)",
									background: "#fff",
									border: "1px solid #ddd",
									borderRadius: "50%",
									width: "50px",
									height: "50px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
									zIndex: 10,
								}}
							>
								<FaChevronLeft color="#666" size={16} />
							</button>
							<button
								onClick={nextSlide}
								style={{
									position: "absolute",
									right: "-20px",
									top: "50%",
									transform: "translateY(-50%)",
									background: "#fff",
									border: "1px solid #ddd",
									borderRadius: "50%",
									width: "50px",
									height: "50px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
									zIndex: 10,
								}}
							>
								<FaChevronRight color="#666" size={16} />
							</button>
						</>
					)}

					{/* Cards container */}
					<div style={{ 
						display: "grid", 
						gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
						gap: "24px",
						marginBottom: "40px"
					}}>
						{displayPackages.slice(currentSlide * 4, (currentSlide + 1) * 4).map((pkg) => {
							const imageUrl = getPackageImage(pkg);
							if (!imageUrl) return null;
							
							return (
								<div
									key={pkg._id}
									style={{
										background: "#fff",
										boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
										overflow: "hidden",
										cursor: "pointer",
										transition: "transform 0.2s ease, box-shadow 0.2s ease",
										position: "relative",
									}}
									onClick={() => handlePackageClick(pkg)}
									
								>
									
									<div style={{ position: "relative" }}>
										<img
											src={imageUrl}
											alt={pkg.title}
											style={{
												width: "100%",
												height: "200px",
												objectFit: "cover",
											}}
										/>
										
									</div>

									{/* Card content */}
									<div style={{ padding: "20px" }}>
										<div style={{ marginBottom: "8px" }}>
											<span style={{ 
												background: "#e8f4fd", 
												color: "#080075ff", 
												padding: "4px 12px", 
												borderRadius: "20px", 
												fontSize: "0.85rem",
												fontWeight: "500"
											}}>
												{pkg.category}
											</span>
										</div>
										
										<h3 style={{ 
											fontWeight: "600", 
											fontSize: "1.1rem", 
											color: "#1a1a1a", 
											marginBottom: "8px",
											lineHeight: "1.4"
										}}>
											{pkg.title}
										</h3>
										
										<div style={{ 
											fontSize: "0.9rem", 
											color: "#666", 
											marginBottom: "12px",
											display: "flex",
											gap: "16px",
											flexWrap: "wrap"
										}}>
											<span>{pkg.duration}</span>
											{pkg.maxPeople && <span>Max: {pkg.maxPeople}</span>}
										</div>

										{/* Price and book button */}
										<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
											<div>
												<span style={{ 
													fontWeight: "700", 
													fontSize: "1.2rem", 
													color: "#1a1a1a" 
												}}>
													{formatPrice(pkg)}
												</span>
												<span style={{ 
													color: "#888", 
													fontSize: "0.85rem", 
													marginLeft: "4px" 
												}}>
													/ {pkg.pricePerText || "person"}
												</span>
											</div>
											<button
												style={{
													background: "#00026dff",
													color: "#fff",
													border: "none",
													padding: "8px 16px",
													fontWeight: "600",
													cursor: "pointer",
													fontSize: "0.9rem",
													transition: "background 0.2s ease",
												}}
												onClick={(e) => {
													e.stopPropagation();
													handlePackageClick(pkg);
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.background = "#02006dff";
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.background = "#00155cff";
												}}
											>
												Book Now
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					
					{displayPackages.length === 0 && !loading && (
						<div style={{ textAlign: "center", padding: "60px 0" }}>
							<div style={{ fontSize: "1.2rem", color: "#666", marginBottom: "16px" }}>
								No packages available
							</div>
							<div style={{ fontSize: "1rem", color: "#888" }}>
								Please check back later for exciting adventures!
							</div>
						</div>
					)}
				</div>
			)}
			
			{displayPackages.length > 4 && (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "40px" }}>
					{[...Array(Math.ceil(displayPackages.length / 4))].map((_, i) => (
						<button
							key={i}
							onClick={() => setCurrentSlide(i)}
							style={{
								width: "12px",
								height: "12px",
								border: "none",
								borderRadius: "50%",
								background: i === currentSlide ? "#0c0074ff" : "#e0e0e0",
								cursor: "pointer",
								transition: "background 0.2s ease",
							}}
						/>
					))}
				</div>
			)}
			
			<div style={{ textAlign: "center" }}>
				<Link to="/packages">
					<button
						style={{
							background: "#1c1a97ff", 
							color: "#fff", 
							border: "none",
							padding: "12px 32px", 
							fontWeight: "600", 
							fontSize: "1.1rem", 
							cursor: "pointer", 
							transition: "all 0.2s ease",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = "#00076dff";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = "#001b74ff";
						}}
					>
						View All Packages
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Bookable;

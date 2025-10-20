import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";



type Nav2Props = {
  sticky?: boolean;
  className?: string;
};


const Nav2: React.FC<Nav2Props> = ({ sticky = true, className = "" }) => {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const goingDown = y > lastY.current;

      if (y < 16) {

        setHidden(false);
      } else if (goingDown && y > 80) {
        setHidden(true);
      } else if (!goingDown) {

        setHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll as EventListener);
  }, []);
  const containerStyles = useMemo<React.CSSProperties>(
    () => ({
      position: sticky ? "sticky" : "static",
      top: 0,
      zIndex: 50,
      width: "100%",
      backgroundColor: "#1B1C52",
      color: "#ffffff",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      fontFamily:
        "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      transform: hidden ? "translateY(-100%)" : "translateY(0)",
      transition: "transform 240ms ease, opacity 240ms ease",
      opacity: hidden ? 0 : 1,
    }),
    [sticky, hidden]
  );

  const innerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 1200,
    height: 40,
    margin: "0 auto",
    padding: "0 16px",
    fontSize: 14,
    letterSpacing: 0.2,
  };

  const listStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 24,
    listStyle: "none",
    margin: 0,
    padding: 0,
    whiteSpace: "nowrap",
  };

  const linkStyles: React.CSSProperties = {
    color: "#E7E7F3",
    textDecoration: "none",
    fontWeight: 600,
    opacity: 0.95,
  };

  const mutedStyles: React.CSSProperties = {
    color: "#E7E7F3",
    fontWeight: 600,
    opacity: 0.85,
  };

  const iconsGroupStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
  };

  const iconLinkStyles: React.CSSProperties = {
    color: "#E7E7F3",
    opacity: 0.9,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    fontSize: 16,
  };

 const [language, setLanguage] = useState<string>(
    localStorage.getItem("language") || "en"
  );

  const handleChange = (event: SelectChangeEvent<string>) => {
    const lang = event.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };
 

useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);


  return (
    <nav role="navigation" aria-label="Top utility navigation" style={containerStyles} className={className}>
      <div style={innerStyles}>
        

        <ul style={listStyles}>
          <li style={{ ...mutedStyles, marginLeft: "-50px", marginRight: "50px" }}>Tourism Hotline: +009 (4785) 3023</li>
          <li>
            <div style={iconsGroupStyles}>
              <a href="#facebook" aria-label="Facebook" style={iconLinkStyles}>
                <FaFacebookF />
              </a>
              <a href="#twitter" aria-label="Twitter" style={iconLinkStyles}>
                <FaTwitter />
              </a>
              <a href="#instagram" aria-label="Instagram" style={iconLinkStyles}>
                <FaInstagram />
              </a>
              <a href="#youtube" aria-label="YouTube" style={iconLinkStyles}>
                <FaYoutube />
              </a>
            </div>
          </li>
          <li style={{ marginLeft: "650px" }}>
            {/* <a style={linkStyles} href="#language">Select Language ▾</a> */}
           <FormControl variant="standard" sx={{ ml: 1, minWidth: 120 }}>
                <Select
                  value={language}
                  onChange={handleChange}
                  displayEmpty
                  sx={{
                    color: "#E7E7F3",                  
                    fontWeight: 600,                    
                    textDecoration: "none",            
                    opacity: 0.95,                      
                    "& .MuiSelect-icon": { color: "#E7E7F3" }, 
                    "&:before": { borderBottom: "none" },      
                    "&:after": { borderBottom: "none" },    
                  }}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="dv">Dhivehi</MenuItem>
                </Select>
              </FormControl>


            </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav2;


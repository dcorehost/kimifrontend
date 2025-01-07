import Footer from "../../Components/Footer/Footer";
import LogoCarousel from "../../Components/LogoCarousel/LogoCarousel";
import Navbar from "../../Components/Navbar/Navbar";
import ReadyToStart from "../../Components/ReadyToStart/ReadyToStart";
import Specialize from "../../Components/Specialize/Specialize";
import StatsAndFAQ from "../../Components/StatsAndFAQ/StatsAndFAQ";
import WelcomePage from "../../Components/WelcomePage/WelcomePage";
import WhatIsKimi from "../../Components/WhatIsKimi/WhatIsKimi";


const Homepage = () => {
  return (
    <>
    <Navbar />
    <WelcomePage />
    <LogoCarousel />
    <WhatIsKimi />
    <Specialize />
    <StatsAndFAQ />
    <ReadyToStart />

    <Footer />
     
    </>
  );
};

export default Homepage;

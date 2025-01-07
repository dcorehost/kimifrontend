import AdvantageMeta from "../../Components/AdvantageMeta/AdvantageMeta";
import Footer from "../../Components/Footer/Footer";
import MetaFaq from "../../Components/MetaFaq/MetaFaq";
import MetaSteps from "../../Components/MetaSteps/MetaSteps";
import Navbar from "../../Components/Navbar/Navbar";
import ReadyToStart from "../../Components/ReadyToStart/ReadyToStart";
import WhatIsMeta from "../../Components/WhatIsMeta/WhatIsMeta";



const MetaAds = () => {
  return (
    <>
    <Navbar />
    <WhatIsMeta />
    <AdvantageMeta />
    <MetaSteps />
    <MetaFaq />
    <ReadyToStart />
    <Footer />

     
    </>
  );
};

export default MetaAds;

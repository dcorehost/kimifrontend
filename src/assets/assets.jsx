// import adAccountsImage from './assets/ad-accounts.png';
// import managePanelImage from './assets/manage-panel.png';
// import teamServiceImage from './assets/team-service.png';

// export const specializeData = [
//   {
//     title: "Reliable agency advertising accounts",
//     description: "As an official partner of Meta, Google, Bing, TikTok, etc., we provide cost-effective accounts.",
//     image: adAccountsImage,
//   },
//   {
//     title: "Self-Manage Panel",
//     description: "Manage all accounts efficiently with real-time feedback.",
//     image: managePanelImage,
//   },
//   {
//     title: "Professional team service",
//     description: "Get professional guidance and quick responses from our support team.",
//     image: teamServiceImage,
//   },
// ];



import { FaAd, FaTools, FaUsers } from 'react-icons/fa'; // Import specific icons from react-icons

export const specializeData = [
  {
    title: "Reliable agency advertising accounts",
    description: "As an official partner of Meta, Google, Bing, etc., we provide cost-effective accounts.",
    icon: <FaAd />, // Use the icon here
  },
  {
    title: "Self-Manage Panel",
    description: "Manage all accounts efficiently with real-time feedback.",
    icon: <FaTools />, // Use the icon here
  },
  {
    title: "Professional team service",
    description: "Get professional guidance and quick responses from our support team.",
    icon: <FaUsers />, // Use the icon here
  },
];



export const countersData = [
  { title: "Number of Users", value: "8,000+" },
  { title: "Accounts Opened", value: "10W+" },
  { title: "Total Ad Spend", value: "200M+" },
  { title: "Typical Partners", value: "40+" },
];

export const faqsData = [
  { question: "Do you work with all types of business?",
    answer: "YES. We have served all types of companies from different verticals. We never set the limitation of the client’s company size. Most of successful business grow from 1 employee. We wish to be the part of the growing journey and help our clients to boost their business performance.." 
  },
  { question: "How long does it take to start advertising?",
    answer: "Our process is very fast, You get your ad account within 1-2work days and then you can launch your ads."
   },
  { question: "What about payment methods?",
    answer: "We accept multiple payment methods, We have Crypto, payoneer, wise, bank transfer etc..." 
  },
  { question: "How to start?",
    answer: "Contact us to get system panel for free. Our workflow all through system." 
  },
  { question: "What is the spend limit of your ad accounts?",
    answer: "There is no spending limit on our ad Accounts."
   },
  { question: "What kind of campaigns can I run?", 
    answer: "All types of campaigns."
   },
  { question: "How many agency account do i get?", 
    answer: "Unlimited ad accounts but you need to spend on them." 

  },
];

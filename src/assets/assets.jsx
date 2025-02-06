import logo from './logo.png';
import bing from './bing.png';
import facebook from './facebook.png';
import google from './google.png';
import firstimg from './firstimg2.jpg';
import secondimg from './secondimg2.jpg';
import whatismeta from './whatismeta.png';
import advantagemeta from './advantagemeta.jpg';
import metastep1 from './metastep1.png';
import metastep2 from './metastep2.png';
import metastep3 from './metastep3.png';
import whatisbing from './whatisbing.png';
import advantagebing from './advantagebing.jpg';
import whatisgoogle from './whatisgoogle.png';
import advantagegoogle from './advantagegoogle.jpg';
import admin from './admin.jpg';




export const assets={
  admin,
  logo,
  bing,
  facebook,
  google,
  firstimg,
  secondimg,
  whatismeta,
  advantagemeta,
  metastep1,
  metastep2,
  metastep3,
  whatisbing,
  advantagebing,
  whatisgoogle,
  advantagegoogle,
}
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



export const MetafaqsData = [
  { question: "What’s the advantages of meta agency accounts compare with personal accounts?",
    answer: ["Agency accounts have unlimited daily spend and unlimited campaigns, payments won’t get restricted and can get more support." 
    ],
  },
  { question: "Why my ad accounts performance drop?",
    answer: ["You can check page scores ,creatives and audience set to test more."
    ],
   },
  { question: "What happens if account disabled?",
    answer: ["If your Meta Agency Ad Account is disabled, we will immediately work with Meta to appeal the suspension and account. The result will be communicated after a few days",
     "For cases of permanent disablement, we will back remaining money in ad account back to system wallet." 
    ],
  },
  { question: "Does Agency account need warming up?",
    answer:["Both ok, you can warm up ,also can scale as soon as it shared." 
    ],
  },
  { question: "What if my Fackbook BM banned or lost?",
    answer:[ "Our agency account can share to unlimited BM, if BM banned, you can apply share, we'll share the accounts to your new BM, so won't affect your business."
    ],
   },
  { question: "Should I link my credit card?", 
    answer: ["No, our agency accounts are invoice accounts ,no need add credit card. If you need recharge, just apply in our system."
    ],
   },
  
];




export const BingfaqsData = [
  {
    question: "What is the difference between Bing Ads and Microsoft Ads?",
    answer: [
      "No difference at all! Microsoft Ads is simply the new name of the platform as of 2019, although the name Bing Ads is still commonly used (like Google Adwords which became Google Ads in 2018)."
    ],
  },
  {
    question: "What types of sponsored ads can I create on Bing Ads?",
    answer: [
      "Microsoft allows you to choose between two types of ads: search ads and audience ads. Search ads are displayed at the top of search results, while audience ads are displayed in non-search locations (in articles, for example) on sites such as Microsoft Edge, MSN, Outlook and other partner sites. Most advertisers new to Bing Ads prefer to start with search ads, which are easier to set up and manage than audience ads."
    ],
  },
  {
    question: "I have created campaigns on Google Ads. I would now like to use Bing Ads. Can I use the campaigns I have already created on Google Ads?",
    answer: [
      "If you already have a Google Ads account, you can import your existing campaigns into Bing Ads. This is done very quickly, directly from the Bing Ads platform. You will therefore have the same campaign structure in Google Ads and in Bing Ads."
    ],
  },
  {
    question: "When to use Bing Ads?",
    answer: [
      "We strongly recommend that you test Bing Ads if you are having difficulty being profitable on Google Ads and if you are in a market where the volume is sufficient (national market with numerous searches)",
      "Bing Ads is also particularly interesting for B2B advertisers."
    ],
  },
];


export const GooglefaqsData = [
  {
    question: "How long does it take to see results from Google Ads campaigns?",
    answer: [
      "The time to see results from Google Ads campaigns varies based on industry, competition, budget, and how well the campaigns are optimized.",
      "Typically, you might start seeing initial outcomes within a few weeks, with more substantial improvements taking several months particularly when managed through a Google Agency Ad Account."
    ],
  },
  {
    question: "What can I expect from Google Ads Management service results?",
    answer: [
      "Google Ads Management services, particularly through a Google Ad Agency Account, aim to enhance ad performance, increase cost efficiency, improve targeting, and boost click-through rates.",
    "These services are designed to optimize your campaigns and maximize your return on investment, ensuring your advertising efforts are as effective as possible."
    ],
  },
  {
    question: "Can Google Ads effectively boost brand awareness and drive sales?",
    answer: [
      "Yes, Google Ads can successfully be utilized for both enhancing brand awareness and driving sales. Campaigns aimed at building brand visibility may focus on maximizing impressions, while those designed to increase sales concentrate on achieving higher conversion rates. Utilizing a Google Ads Agency Account can optimize both strategies effectively."
    ],
  },
  {
    question: "How do l evaluate the effectiveness of a Google Ads Management service?",
    answer: [
      "The effectiveness of a Google Ads Management service is gauged by monitoring key performance indicators (KPls and analyzing metrics like Click-Through Rate (CTR), Conversion Rate, Cost Per Click (CPc), Return on Ad Spend (ROAS), and Quality Score.",
      " These metrics provide a comprehensive view of the campaign's performance. Helping you measure success systematically, especially when using services like MCC Google Ads Account or Google Agency Ad Accounts."
    ],
  },
  {
    question: "Do certain industries gain more from Google Ads than others?",
    answer: [
      "While Google Ads provides benefits across various sectors, industries with products or services that have high search volumes or those targeting specific niche markets typically experience more significant benefits.",
      " Using a Good Agency Ad Account can help take these advantages more effectively ensuring targeten and eftectived placements."
    ],
  },
  {
    question: "What are the different types of Google Ads?",
    answer: [
      "There are four basic types of Google Ads:",
      "Search Network campaigns - usually text form, these ads can show on Google Search results pages when someone searches for a product or service that’s similar to yours.",
      "Display Network campaigns - usually image form, these ads appear on websites or apps that your customers visit.",
      "  Video campaigns - usually 6 or 15 second videos, these ads show right before or during YouTube content in -stream.",
      "PMax Campaigns - a goal - based campaign type that allows performance advertisers to access all of their Google Ads inventory from a single campaign.",
    ],
  },
];
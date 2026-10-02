import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'google-ads',
    titleBn: 'Google Ads Professional Training',
    titleEn: 'Google Ads Professional Training',
    badgeBn: 'মার্কেট ডিমান্ডে শীর্ষে',
    badgeEn: 'High Demand',
    summaryBn: 'Google Ads-এর মাধ্যমে ব্যবসার জন্য কার্যকর বিজ্ঞাপন তৈরি ও পরিচালনা করতে শিখুন।',
    summaryEn: 'Learn to create and manage high-converting advertising campaigns for businesses with Google Ads.',
    heroImage: '/src/assets/images/course_google_ads_analytics_1790946047596.jpg',
    topics: [
      {
        titleBn: 'Google Ads Account Setup',
        titleEn: 'Google Ads Account Setup',
        detailsBn: 'প্রফেশনাল বিজনেস ম্যানেজার অ্যাকাউন্ট, বিলিং কনফিগারেশন ও ক্লায়েন্ট অ্যাকাউন্ট অ্যাক্সেস নেওয়ার নিয়ম।'
      },
      {
        titleBn: 'Keyword Research and Competitor Analysis',
        titleEn: 'Keyword Research and Competitor Analysis',
        detailsBn: 'হাই-কনভার্টিং কিওয়ার্ড নির্বাচন, সার্চ ইনটেন্ট অ্যানালাইসিস এবং প্রতিপক্ষের বিডিং কৌশল যাচাই।'
      },
      {
        titleBn: 'Google Search Campaign',
        titleEn: 'Google Search Campaign',
        detailsBn: 'রেসপন্সিভ সার্চ অ্যাড (RSA), কিওয়ার্ড ম্যাচ টাইপ, নেগেটিভ কিওয়ার্ড ফিল্টারিং ও কোয়ালিটি স্কোর অপ্টিমাইজেশন।'
      },
      {
        titleBn: 'Display Advertising',
        titleEn: 'Display Advertising',
        detailsBn: 'গুগল ডিসপ্লে নেটওয়ার্ক (GDN), ব্যানার অ্যাড টার্গেটিং, অডিয়েন্স সেগমেন্টেশন ও রিমার্কেটিং।'
      },
      {
        titleBn: 'Performance Max Campaign',
        titleEn: 'Performance Max Campaign',
        detailsBn: 'আধুনিক AI-পাওয়ার্ড পারফরম্যান্স ম্যাক্স ক্যাম্পেইন ডিজাইন, অ্যাসেট গ্রুপ সেটআপ এবং মাল্টি-চ্যানেল কনভার্সন।'
      },
      {
        titleBn: 'YouTube Ads',
        titleEn: 'YouTube Ads',
        detailsBn: 'স্কিপেবল ও নন-স্কিপেবল ভিডিও অ্যাড, বিumper অ্যাডস, এবং ইউটিউব থেকে লিড ও সেলস জেনারেশন।'
      },
      {
        titleBn: 'Conversion Tracking with Google Tag Manager',
        titleEn: 'Conversion Tracking with Google Tag Manager',
        detailsBn: 'GTM-এর মাধ্যমে ওয়েবসাইটের পারচেজ, ফর্ম সাবমিট, কল ক্লিক ও কাস্টম ইভেন্ট ট্র্যাকিং সেটআপ।'
      },
      {
        titleBn: 'Google Analytics 4 (GA4)',
        titleEn: 'Google Analytics 4 (GA4)',
        detailsBn: 'GA4 প্রপার্টি সেটআপ, ই-কমার্স পারচেজ ট্র্যাকিং, এক্সপ্লোরেশন রিপোর্ট এবং ROAS অ্যানালাইসিস।'
      },
      {
        titleBn: 'Campaign Optimization and Reporting',
        titleEn: 'Campaign Optimization and Reporting',
        detailsBn: 'ক্যাম্পেইনের বিড স্ট্র্যাটেজি অ্যাডজাস্টমেন্ট, A/B স্প্লিট টেস্টিং এবং ক্লায়েন্ট প্রেজেন্টেশন রিপোর্ট তৈরি।'
      },
      {
        titleBn: 'Practical Client Project',
        titleEn: 'Practical Client Project',
        detailsBn: 'আন্তর্জাতিক ও লোকাল ক্লায়েন্টের রিয়েল লাইভ বাজেট দিয়ে ক্যাম্পেইন রান ও অপ্টিমাইজেশন প্র্যাকটিস।'
      }
    ],
    pricing: [
      {
        durationKey: '1-month',
        durationLabelBn: '১ মাসের কোর্স',
        durationLabelEn: '1 Month Fast-track',
        price: 5000,
        priceFormattedBn: '৳৫,০০০',
        featuresBn: [
          '৮টি লাইভ ক্লাস (সপ্তাহে ২ দিন)',
          'Google Ads অ্যাকাউন্ট সেটআপ ও সার্চ ক্যাম্পেইন',
          'কিওয়ার্ড রিসার্চ ও অপ্টিমাইজেশন মেথড',
          'ক্লাস রেকর্ডিং ও লেকচার শিট এক্সেস',
          'কোর্স সমাপ্তির পর সার্টিফিকেট'
        ],
        featuresEn: [
          '8 Live Sessions (2 classes/week)',
          'Account Setup & Search Ads Mastery',
          'Keyword Research & Matching Techniques',
          'Lifetime Class Recordings Access',
          'Verified Course Certificate'
        ]
      },
      {
        durationKey: '2-months',
        durationLabelBn: '২ মাসের কোর্স',
        durationLabelEn: '2 Months Pro Track',
        price: 8000,
        priceFormattedBn: '৳৮,০০০',
        isPopular: true,
        featuresBn: [
          '১৬টি বিস্তারিত লাইভ ক্লাস',
          'Search, Display, Performance Max ও YouTube Ads',
          'Google Tag Manager (GTM) ও GA4 ট্র্যাকিং',
          'বাস্তব ক্লায়েন্ট অ্যাকাউন্টে লাইভ প্র্যাকটিস',
          'Upwork ও Fiverr প্রোফাইল অপ্টিমাইজেশন সাপোর্ট',
          'লাইফটাইম সাপোর্ট গ্রুপ এক্সেস'
        ],
        featuresEn: [
          '16 In-depth Live Sessions',
          'Search, Display, PMax & YouTube Ads',
          'GTM & GA4 Conversion Tracking',
          'Real Client Account Exercises',
          'Upwork/Fiverr Profile Review',
          'Lifetime Secret Alumni Group'
        ]
      },
      {
        durationKey: '3-months',
        durationLabelBn: '৩ মাসের কোর্স',
        durationLabelEn: '3 Months Masterclass',
        price: 12000,
        priceFormattedBn: '৳১২,০০০',
        featuresBn: [
          '২৪টি অ্যাডভান্সড ক্লাস + ওয়ান-টু-ওয়ান মেন্টরিং',
          'সবগুলো ক্যাম্পেইন টাইপ + সার্ভার-সাইড ট্র্যাকিং',
          'রিয়েল অ্যাড স্পেন্ড বাজেটে লাইভ প্রজেক্ট পরিচালনা',
          'ইন্টারন্যাশনাল রিমোট জব ও ইন্টারভিউ প্রস্তুতি',
          'পোর্টফোলিও কেস স্টাডি নির্মাণ ও রিকমেন্ডেশন লেটার',
          '১ বছর মেয়াদী প্রায়োরিটি মেন্টর কনসাল্টেশন'
        ],
        featuresEn: [
          '24 Advanced Sessions + 1-on-1 Mentorship',
          'All Campaign Types + Server-Side Tracking',
          'Live Client Project with Real Ad Spend',
          'International Remote Job Placement Aid',
          'Verified Portfolio Case Studies',
          '1-Year Priority Mentor Consultation'
        ]
      }
    ],
    tools: ['Google Ads', 'GA4', 'Google Tag Manager', 'Google Keyword Planner', 'Looker Studio'],
    nextBatchBn: '১৫ অক্টোবর',
    seatsLeft: 4,
    scheduleBn: 'শনি ও সোম (রাত ৮:০০ - ৯:৩০)',
    prerequisitesBn: 'বেসিক কম্পিউটার ও ইন্টারনেট ব্যবহারের সাধারণ জ্ঞান।'
  },
  {
    id: 'local-seo',
    titleBn: 'Google My Business & Local SEO',
    titleEn: 'Google My Business & Local SEO',
    badgeBn: 'লোকাল ক্লায়েন্টের জন্য সেরা',
    badgeEn: 'Top for Local Business',
    summaryBn: 'স্থানীয় ব্যবসার অনলাইন উপস্থিতি বাড়ানো, Google Maps-এ দৃশ্যমানতা উন্নত করা এবং Local SEO পরিচালনা শিখুন।',
    summaryEn: 'Increase local business online visibility, dominate Google Maps 3-Pack rankings, and master Local SEO.',
    heroImage: '/src/assets/images/course_local_seo_maps_1790946061939.jpg',
    topics: [
      {
        titleBn: 'Google Business Profile Setup and Verification',
        titleEn: 'Google Business Profile Setup and Verification',
        detailsBn: 'সঠিক ক্যাটাগরি, এড্রেস পিনিং এবং তাৎক্ষণিক ভেরিফিকেশন মেথড আয়ত্ত করা।'
      },
      {
        titleBn: 'Google Maps Optimization',
        titleEn: 'Google Maps Optimization',
        detailsBn: 'ম্যাপে শীর্ষ ৩টি (Google 3-Pack) পজিশনে র‍্যাংক করানোর কার্যকরী টেকনিক্যাল ট্রিকস।'
      },
      {
        titleBn: 'Local Keyword Research',
        titleEn: 'Local Keyword Research',
        detailsBn: 'শহর ও এলাকা ভিত্তিক জিও-টার্গেটেড কিওয়ার্ড ও সার্চ ভলিউম বিশ্লেষণ।'
      },
      {
        titleBn: 'Local SEO Strategy',
        titleEn: 'Local SEO Strategy',
        detailsBn: 'সার্ভিস এরিয়া ব্যবসা ও ফিজিক্যাল শপের জন্য আলাদা আলাদা লোকাল অপ্টিমাইজেশন রোডম্যাপ।'
      },
      {
        titleBn: 'Business Profile Optimization',
        titleEn: 'Business Profile Optimization',
        detailsBn: 'সার্ভিসেস, প্রোডাক্ট ক্যাটালগ, ফটো জিও-ট্যাগিং এবং Q&A সেকশন সাজানো।'
      },
      {
        titleBn: 'Local Citation Building',
        titleEn: 'Local Citation Building',
        detailsBn: 'টপ লোকাল ডিরেক্টরি, ইয়েলপ, ইয়োলোপেজেস ইত্যাদিতে NAP কনসিস্টেন্সি রক্ষা করে সাইটেশন তৈরি।'
      },
      {
        titleBn: 'Review Management',
        titleEn: 'Review Management',
        detailsBn: '৫-স্টার রিভিউ অর্জনের অটোমেটেড ফানেল তৈরি ও নেতিবাচক রিভিউ হ্যান্ডলিং স্ট্র্যাটেজি।'
      },
      {
        titleBn: 'Local Competitor Analysis',
        titleEn: 'Local Competitor Analysis',
        detailsBn: 'লোকাল প্রতিদ্বন্দ্বীদের প্রোফাইল বিশ্লেষণ করে তাদের পেছনে ফেলে এগিয়ে যাওয়ার কৌশল।'
      },
      {
        titleBn: 'Google Business Profile Insights',
        titleEn: 'Google Business Profile Insights',
        detailsBn: 'ইনসাইটস ডেটা দেখে কাস্টমার কল, ডিরেকশন রিকোয়েস্ট ও ওয়েবসাইট ভিজিটের রিপোর্ট তৈরি।'
      },
      {
        titleBn: 'Local SEO Practical Project',
        titleEn: 'Local SEO Practical Project',
        detailsBn: 'একটি পূর্ণাঙ্গ লোকাল ব্যবসার প্রোফাইল তৈরি ও র‍্যাংকিং বৃদ্ধির লাইভ প্রজেক্ট।'
      }
    ],
    pricing: [
      {
        durationKey: '1-month',
        durationLabelBn: '১ মাসের কোর্স',
        durationLabelEn: '1 Month Fast-track',
        price: 4000,
        priceFormattedBn: '৳৪,০০০',
        featuresBn: [
          '৮টি সরাসরি লাইভ ক্লাস',
          'Google Business Profile ভেরিফিকেশন ও সেটআপ',
          'লোকাল কিওয়ার্ড রিসার্চ ও প্রোফাইল অপ্টিমাইজেশন',
          'ক্লাস রেকর্ডিং ও রিসোর্স ফাইল',
          'কোর্স সমাপ্তির সার্টিফিকেট'
        ],
        featuresEn: [
          '8 Interactive Live Classes',
          'GBP Setup & Verification Protocols',
          'Geo Keyword Research & Profile Audit',
          'Full Lecture Notes & Recordings',
          'Course Completion Certificate'
        ]
      },
      {
        durationKey: '2-months',
        durationLabelBn: '২ মাসের কোর্স',
        durationLabelEn: '2 Months Pro Track',
        price: 7000,
        priceFormattedBn: '৳৭,০০০',
        isPopular: true,
        featuresBn: [
          '১৬টি নিবিড় লাইভ ক্লাস',
          'Google Maps 3-Pack র্যাঙ্কিং সিক্রেটস',
          'টপ ৫০টি লোকাল সাইটেশন ডিরেক্টরি সাবমিশন',
          'রিভিউ গ্রোথ স্ট্র্যাটেজি ও ব্যাকলিংক মেথড',
          'লোকাল ক্লায়েন্ট খোঁজার আউটরিচ টেমপ্লেট',
          '৬ মাস মেন্টর সাপোর্ট'
        ],
        featuresEn: [
          '16 Intensive Live Classes',
          'Google Maps 3-Pack Ranking Tactics',
          'Top 50 Local Citation Submissions',
          'Review Acceleration Funnels',
          'Client Outreach Proposal Templates',
          '6 Months Mentor Support'
        ]
      },
      {
        durationKey: '3-months',
        durationLabelBn: '৩ মাসের কোর্স',
        durationLabelEn: '3 Months Masterclass',
        price: 10000,
        priceFormattedBn: '৳১০,০০০',
        featuresBn: [
          '২৪টি প্রফেশনাল ক্লাস + হ্যান্ডস-অন এজেন্সি মডেল',
          'মাল্টি-লোকেশন লোকাল এসইও ফ্রেমওয়ার্ক',
          'লাইভ ইন্টারন্যাশনাল ক্লায়েন্ট প্রজেক্ট ডেলিভারি',
          'মার্কেটপ্লেস ও ডিরেক্ট ইউএস/ইউকে ক্লায়েন্ট হান্টিং',
          'প্রিমিয়াম লোকাল এসইও অডিট সফটওয়্যার এক্সেস',
          'আজীবন মেন্টর হেল্পলাইন'
        ],
        featuresEn: [
          '24 Sessions + Agency Blueprint',
          'Multi-Location Enterprise Local SEO',
          'Live International Client Delivery',
          'Direct US/UK Client Acquisition Guide',
          'Premium Local SEO Tool Access',
          'Lifetime VIP Mentor Helpline'
        ]
      }
    ],
    tools: ['Google Business Profile', 'Google Maps', 'BrightLocal', 'Whitespark', 'PlePer Tool'],
    nextBatchBn: '১৮ অক্টোবর',
    seatsLeft: 5,
    scheduleBn: 'রবি ও বুধ (রাত ৮:০০ - ৯:৩০)',
    prerequisitesBn: 'সাধারণ কম্পিউটার জ্ঞান ও গুগল ড্রাইভ ব্যবহারের অভিজ্ঞতা।'
  },
  {
    id: 'professional-seo',
    titleBn: 'Professional SEO Training',
    titleEn: 'Professional SEO Training',
    badgeBn: 'দীর্ঘমেয়াদী আয়ের ভিত্তি',
    badgeEn: 'High Career Growth',
    summaryBn: 'সার্চ ইঞ্জিন অপটিমাইজেশনের মাধ্যমে ওয়েবসাইটের অর্গানিক ট্রাফিক বাড়ানোর কৌশল শিখুন।',
    summaryEn: 'Master search engine optimization to drive organic traffic, scale rankings, and win global contracts.',
    heroImage: '/src/assets/images/course_google_ads_analytics_1790946047596.jpg',
    topics: [
      {
        titleBn: 'SEO Fundamentals',
        titleEn: 'SEO Fundamentals',
        detailsBn: 'সার্চ ইঞ্জিনের ক্রলিং, ইনডেক্সিং এবং র্যাঙ্কিং অ্যালগরিদমের মূল ভিত্তি।'
      },
      {
        titleBn: 'Keyword Research',
        titleEn: 'Keyword Research',
        detailsBn: 'হাই-ডিমান্ড, লো-কম্পিটিশন ও লং-টেইল কিওয়ার্ড খোঁজার প্রমাণিত পদ্ধতি।'
      },
      {
        titleBn: 'On-Page SEO',
        titleEn: 'On-Page SEO',
        detailsBn: 'টাইটেল ট্যাগ, মেটা ডেসক্রিপশন, হেডিং ট্যাগ, ইমেজ অপ্টিমাইজেশন ও ইন্টারনাল লিংকিং।'
      },
      {
        titleBn: 'Technical SEO Basics',
        titleEn: 'Technical SEO Basics',
        detailsBn: 'XML সাইটম্যাপ, Robots.txt, পেজ স্পিড, মোবাইল ফ্রেন্ডলিনেস ও স্কিমা মার্কআপ।'
      },
      {
        titleBn: 'Off-Page SEO',
        titleEn: 'Off-Page SEO',
        detailsBn: 'হোয়াইট-হ্যাট ব্যাকলিংক স্ট্র্যাটেজি, গেস্ট পোস্টিং এবং ব্রোকেন লিংক বিল্ডিং।'
      },
      {
        titleBn: 'Competitor Analysis',
        titleEn: 'Competitor Analysis',
        detailsBn: 'টপ কম্পিটিটরের ব্যাকলিংক ও কন্টেন্ট গ্যাপ খুঁজে বের করে টেক্কা দেওয়া।'
      },
      {
        titleBn: 'SEO Content Strategy',
        titleEn: 'SEO Content Strategy',
        detailsBn: 'সার্চ ইনটেন্ট অনুযায়ী অপ্টিমাইজড আর্টিকেল আউটলাইন ও কন্টেন্ট লেখার নিয়ম।'
      },
      {
        titleBn: 'Google Search Console',
        titleEn: 'Google Search Console',
        detailsBn: 'সার্চ কনসোল ডাটা বিশ্লেষণ, ইনডেক্সিং ইস্যু ফিক্স এবং ইম্প্রেশন ট্র্যাকিং।'
      },
      {
        titleBn: 'SEO Audit',
        titleEn: 'SEO Audit',
        detailsBn: 'যেকোনো ওয়েবসাইটের ফুল টেকনিক্যাল ও অন-পেজ এসইও অডিট রিপোর্ট প্রস্তুতকরণ।'
      },
      {
        titleBn: 'Practical Website Optimization',
        titleEn: 'Practical Website Optimization',
        detailsBn: 'বাস্তব লাইভ ওয়েবসাইটে সরাসরি কাজ করে র্যাঙ্কিং বৃদ্ধির পূর্ণাঙ্গ প্রজেক্ট।'
      }
    ],
    pricing: [
      {
        durationKey: '1-month',
        durationLabelBn: '১ মাসের কোর্স',
        durationLabelEn: '1 Month Fast-track',
        price: 4000,
        priceFormattedBn: '৳৪,০০০',
        featuresBn: [
          '৮টি প্র্যাকটিক্যাল লাইভ ক্লাস',
          'কিওয়ার্ড রিসার্চ ও অন-পেজ এসইও ফান্ডামেন্টালস',
          'গুগল সার্চ কনসোল অ্যাকাউন্ট ওভারভিউ',
          'প্রয়োজনীয় চেকলিস্ট ও চেকবুক',
          'কোর্স সমাপ্তির সার্টিফিকেট'
        ],
        featuresEn: [
          '8 Practical Live Sessions',
          'Keyword Research & On-Page Core',
          'Google Search Console Basics',
          'Comprehensive SEO Checklists',
          'Verified Course Certificate'
        ]
      },
      {
        durationKey: '2-months',
        durationLabelBn: '২ মাসের কোর্স',
        durationLabelEn: '2 Months Pro Track',
        price: 7000,
        priceFormattedBn: '৳৭,০০০',
        isPopular: true,
        featuresBn: [
          '১৬টি বিস্তারিত লাইভ ক্লাস',
          'অ্যাডভান্সড অন-পেজ, টেকনিক্যাল এসইও ও ব্যাকলিংক',
          'Ahrefs ও SEMrush দিয়ে কম্পিটিটর অডিট',
          'লাইভ ওয়েবসাইটে এসইও অডিট প্রজেক্ট সাবমিশন',
          'ফ্রিল্যান্স মার্কেটপ্লেস গাইডলাইন ও পোর্টফোলিও',
          '৬ মাসের মেন্টর সাপোর্ট'
        ],
        featuresEn: [
          '16 In-depth Live Sessions',
          'Advanced On-Page, Tech SEO & Link Building',
          'Ahrefs & SEMrush Competitor Deep Dive',
          'Live Website Audit Case Study',
          'Freelance Profile Setup & Bidding Strategy',
          '6 Months Mentor Support'
        ]
      },
      {
        durationKey: '3-months',
        durationLabelBn: '৩ মাসের কোর্স',
        durationLabelEn: '3 Months Masterclass',
        price: 10000,
        priceFormattedBn: '৳১০,০০০',
        featuresBn: [
          '২৪টি ক্লাস + ডেডিকেটেড এক্সপার্ট মেন্টরিং',
          'কমপ্লিট টেকনিক্যাল এসইও, সাইট মাইগ্রেশন ও স্কিমা',
          'লাইভ ক্লায়েন্ট এসইও ক্যাম্পেইন ও রেজাল্ট শিট',
          'ই-কমার্স এসইও ও ইন্টারন্যাশনাল রিমোট জব গাইড',
          'প্রিমিয়াম এসইও টুলস ব্যবহারের সুযোগ',
          'লাইফটাইম সাপোর্ট ও অ্যালামনাই নেটওয়ার্ক'
        ],
        featuresEn: [
          '24 Classes + Master Mentoring',
          'Enterprise Technical SEO & E-commerce',
          'Live Client Result Reporting & Execution',
          'International Remote Job Applications',
          'Curated Premium SEO Tools Access',
          'Lifetime Alumni Community'
        ]
      }
    ],
    tools: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'Yoast / RankMath'],
    nextBatchBn: '২০ অক্টোবর',
    seatsLeft: 6,
    scheduleBn: 'সোম ও বৃহস্পতি (রাত ৮:০০ - ৯:৩০)',
    prerequisitesBn: 'সাধারণ ইন্টারনেট ব্রাউজিং ও আর্টিকেল পড়ার আগ্রহ।'
  },
  {
    id: 'crm-automation',
    titleBn: 'CRM & Marketing Automation',
    titleEn: 'CRM & Marketing Automation',
    badgeBn: 'আধুনিক হাই-পেয়িং স্কিল',
    badgeEn: 'High Salary & Global',
    summaryBn: 'কাস্টমার ম্যানেজমেন্ট, লিড ট্র্যাকিং এবং মার্কেটিং অটোমেশন শিখে ব্যবসার কাজকে আরও সংগঠিত করুন।',
    summaryEn: 'Master CRM setup, sales pipeline optimization, and multi-channel marketing automation.',
    heroImage: '/src/assets/images/course_crm_automation_1790946074708.jpg',
    topics: [
      {
        titleBn: 'CRM Fundamentals',
        titleEn: 'CRM Fundamentals',
        detailsBn: 'সিআরএম কী, কেন আধুনিক যেকোনো ব্যবসার জন্য এটি অপরিহার্য এবং প্রধান প্ল্যাটফর্ম পরিচিতি।'
      },
      {
        titleBn: 'CRM Account Setup',
        titleEn: 'CRM Account Setup',
        detailsBn: 'HubSpot ও Brevo-তে প্রফেশনাল কোম্পানি অ্যাকাউন্ট, ইউজার রোল ও পারমিশন সেটআপ।'
      },
      {
        titleBn: 'Lead Management',
        titleEn: 'Lead Management',
        detailsBn: 'ওয়েবসাইট ফর্ম, সোশ্যাল মিডিয়া ও বিজ্ঞাপন থেকে সরাসরি সিআরএমে অটোমেটিক লিড ক্যাপচার।'
      },
      {
        titleBn: 'Sales Pipeline Management',
        titleEn: 'Sales Pipeline Management',
        detailsBn: 'কাস্টম ডিল স্টেজ, সেলস পাইপলাইন ট্র্যাকিং এবং সেলস টিমের কার্যক্রম মনিটরিং।'
      },
      {
        titleBn: 'Customer Database Management',
        titleEn: 'Customer Database Management',
        detailsBn: 'কন্টাক্ট সেগমেন্টেশন, লাইফসাইকেল স্টেজ নির্ধারণ এবং কাস্টমার হিস্ট্রি অর্গানাইজেশন।'
      },
      {
        titleBn: 'Email Marketing Automation',
        titleEn: 'Email Marketing Automation',
        detailsBn: 'স্বয়ংক্রিয় ওয়েলকাম ইমেইল সিরিজ, ড্রিপ ক্যাম্পেইন এবং হাই-কনভার্টিং নিউজলেটার ডিজাইন।'
      },
      {
        titleBn: 'Lead Follow-up Automation',
        titleEn: 'Lead Follow-up Automation',
        detailsBn: 'লিড আসার সাথে সাথে অটোমেটিক এসএমএস, ইমেইল বা হোয়াটসঅ্যাপ নোটিফিকেশন ট্রিগার সেটআপ।'
      },
      {
        titleBn: 'CRM Reporting and Analytics',
        titleEn: 'CRM Reporting and Analytics',
        detailsBn: 'সেলস ফানেল কনভার্সন রেট, টিম অ্যাক্টিভিটি রিপোর্ট ও রেভিনিউ ফোরকাস্টিং ড্যাশবোর্ড।'
      },
      {
        titleBn: 'Practical CRM Project',
        titleEn: 'Practical CRM Project',
        detailsBn: 'একটি রিয়েল ব্যবসার সম্পূর্ণ সেলস পাইপলাইন ও অটোমেশন লাইভ সেটআপ করার প্রজেক্ট।'
      }
    ],
    pricing: [
      {
        durationKey: '1-month',
        durationLabelBn: '১ মাসের কোর্স',
        durationLabelEn: '1 Month Fast-track',
        price: 5000,
        priceFormattedBn: '৳৫,০০০',
        featuresBn: [
          '৮টি লাইভ ক্লাস',
          'HubSpot CRM বেসিক অ্যাকাউন্ট সেটআপ',
          'কন্টাক্ট ম্যানেজমেন্ট ও বেসিক সেলস পাইপলাইন',
          'লাইভ ক্লাস রেকর্ডিং ও হ্যান্ডআউট',
          'কোর্স সার্টিফিকেট'
        ],
        featuresEn: [
          '8 Live Sessions',
          'HubSpot CRM Account Setup',
          'Contact Management & Deal Stages',
          'Class Recordings & Worksheets',
          'Course Completion Certificate'
        ]
      },
      {
        durationKey: '2-months',
        durationLabelBn: '২ মাসের কোর্স',
        durationLabelEn: '2 Months Pro Track',
        price: 8000,
        priceFormattedBn: '৳৮,০০০',
        isPopular: true,
        featuresBn: [
          '১৬টি অ্যাডভান্সড ক্লাস',
          'অটোমেটেড সেলস ড্রিপ ইমেইল ক্যাম্পেইন',
          'Zapier ও Webhook দিয়ে লিড ইন্টিগ্রেশন',
          'রিয়েল এস্টেট/ই-কমার্স সেলস পাইপলাইন কেস স্টাডি',
          'আপওয়ার্ক ও রিমোট জব অ্যাপ্লিকেশন সাপোর্ট',
          '৬ মাসের মেন্টর এক্সেস'
        ],
        featuresEn: [
          '16 Advanced Sessions',
          'Automated Drip Email Campaigns',
          'Zapier & Webhook Integrations',
          'Industry Pipeline Case Studies',
          'Upwork Remote Proposal Templates',
          '6 Months Mentor Access'
        ]
      },
      {
        durationKey: '3-months',
        durationLabelBn: '৩ মাসের কোর্স',
        durationLabelEn: '3 Months Masterclass',
        price: 12000,
        priceFormattedBn: '৳১২,০০০',
        featuresBn: [
          '২৪টি মাস্টার ক্লাস + ফুল অটোমেশন আর্কিটেকচার',
          'HubSpot, Brevo, ActiveCampaign ও Make.com মাস্টারি',
          'মাল্টি-চ্যানেল অমনিচ্যানেল লিড নার্চারিং সিস্টেম',
          'আন্তর্জাতিক কোম্পানির সিআরএম ম্যানেজার হিসেবে প্রস্তুতি',
          'পোর্টফোলিও লাইভ অটোমেশন শোকেস',
          '১ বছরের প্রায়োরিটি কনসাল্টেন্সি সাপোর্ট'
        ],
        featuresEn: [
          '24 Master Classes + Full Architecture',
          'HubSpot, Brevo, ActiveCampaign & Make.com',
          'Omnichannel Lead Nurturing Engines',
          'International CRM Manager Career Track',
          'Live Client Automation Showcase',
          '1-Year Priority Advisory Support'
        ]
      }
    ],
    tools: ['HubSpot CRM', 'Brevo', 'Zapier', 'Mailchimp', 'Google Sheets Automation'],
    nextBatchBn: '২২ অক্টোবর',
    seatsLeft: 3,
    scheduleBn: 'মঙ্গল ও শুক্র (রাত ৮:০০ - ৯:৩০)',
    prerequisitesBn: 'সাধারণ কম্পিউটার ও ইন্টারনেট পরিচালনা জ্ঞান।'
  }
];

export const ACADEMY_INFO = {
  name: 'Skill House',
  taglineBn: 'ডিজিটাল মার্কেটিং ট্রেনিং একাডেমি',
  taglineEn: 'Digital Marketing Training Academy',
  mottoBn: 'আপনার দক্ষতাই হতে পারে আপনার আয়ের নতুন পথ!',
  mottoEn: 'Your skills can be your new pathway to income!',
  phone: '+880 1956-434722',
  phoneAlt: '+880 1719-359646',
  email: 'johnpaul113322@gmail.com',
  addressBn: 'ধাপ, রংপুর সিটি কর্পোরেশন, রংপুর',
  addressEn: 'Dhap, Rangpur City Corporation, Rangpur',
  officeHoursBn: 'সপ্তাহে ৭ দিন খোলা (সকাল ১০:০০ - রাত ৮:০০)',
  officeHoursEn: 'Open 7 days a week (10:00 AM - 8:00 PM)',
  bkashNumber: '01956434722',
  bkashNumberAlt: '01719359646',
  nagadNumber: '01956434722',
  rocketNumber: '01956434722',
  stats: [
    { labelBn: 'সফল গ্র্যাজুয়েট', labelEn: 'Graduates', valueBn: '১,২৫০+', valueEn: '1,250+' },
    { labelBn: 'ক্যারিয়ার সাকসেস রেট', labelEn: 'Success Rate', valueBn: '৮৮%', valueEn: '88%' },
    { labelBn: 'গড় স্টুডেন্ট রেটিং', labelEn: 'Student Rating', valueBn: '৪.৯/৫', valueEn: '4.9/5' },
    { labelBn: 'লাইভ প্রজেক্ট সাপোর্ট', labelEn: 'Live Projects', valueBn: '১০০%', valueEn: '100%' }
  ],
  whyUsBn: [
    {
      titleBn: 'বাস্তব কাজের ওপর ভিত্তি করে প্রশিক্ষণ',
      titleEn: 'Hands-on practical training',
      descBn: 'শুধুমাত্র থিওরি নয়, প্রতিটি ক্লাসেই থাকে সরাসরি লাইভ ডেমো এবং হ্যান্ডস-অন অ্যাসাইনমেন্ট।'
    },
    {
      titleBn: 'Beginner-friendly learning system',
      titleEn: 'Beginner-friendly learning system',
      descBn: 'নতুনদের জন্য একদম শূন্য থেকে শুরু করে ধাপে ধাপে প্রফেশনাল লেভেলে নিয়ে যাওয়ার স্পেশাল কারিকুলাম।'
    },
    {
      titleBn: 'হাতে-কলমে প্র্যাকটিস ও ক্যাম্পেইন সেটআপ',
      titleEn: 'Practical campaign setup',
      descBn: 'ক্লাসেই সরাসরি Google Ads একাউন্ট ও সেলস ফানেল তৈরি করে লাইভ ক্যাম্পেইন রান করানো হয়।'
    },
    {
      titleBn: 'বাস্তব ব্যবসার উদাহরণ দিয়ে শেখানো',
      titleEn: 'Real business case studies',
      descBn: 'ই-কমার্স, রিয়েল এস্টেট, এডুকেশন ও লোকাল ক্লিনিকের আসল কেস স্টাডি বিশ্লেষণ।'
    },
    {
      titleBn: 'আধুনিক ডিজিটাল মার্কেটিং টুলের ব্যবহার',
      titleEn: 'Industry standard tools',
      descBn: 'Google Ads, GA4, GTM, SEMrush, Ahrefs, HubSpot সহ শীর্ষ আন্তর্জাতিক টুলসের সরাসরি ব্যবহার।'
    },
    {
      titleBn: 'প্রজেক্টভিত্তিক শেখার সুযোগ',
      titleEn: 'Project-based portfolio building',
      descBn: 'কোর্স চলাকালীন ২টি পূর্ণাঙ্গ লাইভ পোর্টফোলিও প্রজেক্ট সম্পন্ন করবেন যা ক্লায়েন্টকে দেখাতে পারবেন।'
    },
    {
      titleBn: 'ফ্রিল্যান্সিং ও রিমোট জবের জন্য প্রস্তুতি',
      titleEn: 'Freelancing & remote job prep',
      descBn: 'Upwork, Fiverr প্রোফাইল সাজানো, বিডিং প্রপোজাল তৈরি এবং ক্লায়েন্ট ইন্টারভিউয়ের পূর্ণাঙ্গ গাইডলাইন।'
    }
  ]
};

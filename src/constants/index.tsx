import { IoHomeSharp } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoLibrarySharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoWalletSharp } from "react-icons/io5";

export const MENU_ITEMS = (workspaceId: string): {title: string, href: string, icon: React.ReactNode}[] => [
    {
        title: 'Home',
        href: `/dashboard/${workspaceId}/home`,
        icon: <IoHomeSharp />
    },
    {
        title: 'My Library',
        href: `/dashboard/${workspaceId}`,
        icon: <IoLibrarySharp />
    },
    {
        title: 'Notifications',
        href: `/dashboard/${workspaceId}/notifications`,
        icon: <IoNotificationsSharp />
    },
    {
        title: 'Billing',
        href: `/dashboard/${workspaceId}/billing`,
        icon:  <IoWalletSharp />
    },
    {
        title: 'Settings',
        href: `/dashboard/${workspaceId}/settings`,
        icon: <IoSettingsSharp />
    },
]

export const PRICING_PLANS = [
    {
      plan: "FREE",
      price: "$0",
      period: null,
      description: "Perfect for getting started with video sharing",
      features: [
        { text: "Upload up to 10 videos", included: true },
        { text: "1GB storage", included: true },
        { text: "Basic video player", included: true },
        { text: "Community support", included: true },
        { text: "HD quality", included: false },
        { text: "Analytics", included: false },
        { text: "Custom branding", included: false },
      ],
      isPopular: false,
      buttonText: "Get Started Free",
      buttonStyle: "bg-slate-700 text-white hover:bg-slate-600 border border-slate-600"
    },
    {
      plan: "PRO",
      price: "$19",
      period: "month",
      description: "Ideal for content creators and small businesses",
      features: [
        { text: "Unlimited video uploads", included: true },
        { text: "100GB storage", included: true },
        { text: "HD quality streaming", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Priority support", included: true },
        { text: "Custom thumbnails", included: true },
        { text: "API access", included: false },
        { text: "Custom branding", included: false },
      ],
      isPopular: true,
      buttonText: "Start Pro Trial",
      buttonStyle: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
    },
    {
      plan: "PREMIUM",
      price: "$49",
      period: "month",
      description: "For teams and enterprises with advanced needs",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Unlimited storage", included: true },
        { text: "4K quality streaming", included: true },
        { text: "Custom branding", included: true },
        { text: "API access", included: true },
        { text: "Dedicated support", included: true },
        { text: "Advanced integrations", included: true },
        { text: "White-label solution", included: true },
      ],
      isPopular: false,
      buttonText: "Contact Sales",
      buttonStyle: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
    }
  ];

export const FAQs = [
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "We offer a 14-day free trial for both PRO and PREMIUM plans. No credit card required."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
    }
  ];
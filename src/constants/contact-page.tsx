import { 
    Headphones, 
    Mail, 
    MapPin, 
    MessageCircle, 
    Phone, 
    Users 
} from "lucide-react";

export const FAQs = [
    {
      question: "How quickly can I expect a response?",
      answer: "We typically respond to all inquiries within 24 hours during business days. For urgent technical issues, we aim to respond within 4 hours."
    },
    {
      question: "Do you offer phone support?",
      answer: "Yes! Phone support is available for Pro and Premium subscribers. Free users can reach us via email or live chat."
    },
    {
      question: "Can I schedule a demo?",
      answer: "Absolutely! Contact our sales team to schedule a personalized demo of Nuevue's features and capabilities."
    },
    {
      question: "Where is your company located?",
      answer: "Our headquarters is in San Francisco, CA, but we have team members distributed globally to provide 24/7 support."
    }
  ];

export const OPTIONS = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      action: "Start Chat",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other Nuevue users",
      availability: "Always open",
      action: "Visit Forum",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: Headphones,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 9AM-6PM PST",
      action: "Call Now",
      color: "from-orange-600 to-red-600"
    }
  ];

export const CONTACT_INFO = [
    {
      icon: Mail,
      title: "Email Us",
      info: "hello@nuevue.com",
      description: "Send us an email and we'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      description: "Monday to Friday from 9AM to 6PM PST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "San Francisco, CA",
      description: "123 Innovation Drive, Suite 100, San Francisco, CA 94107"
    }
  ];
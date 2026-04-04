export type HeroEvent = {
  id: string;
  title: string;
  tags: string[];
  image: string;
};

export type FeaturedEvent = {
  id: string;
  title: string;
  tag: string;
  image: string;
  date: string;
  location: string;
  description: string;
};

export type UpcomingEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  image: string;
  tag: string;
};

export type PastEvent = {
  id: string;
  title: string;
  date: string;
  meta: string;
  image: string;
};

export type EventHighlight = {
  id: string;
  title: string;
  icon: "game-controller-outline" | "restaurant-outline" | "trophy-outline";
  content: string;
};

export type EventDetail = {
  id: string;
  title: string;
  tag: string;
  image: string;
  date: string;
  venue: string;
  price: string;
  priceNote: string;
  about: string[];
  highlights: EventHighlight[];
};

export type Member = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  currentCity: string;
  village: string;
  occupation: string;
  canadaStatus?: string;
};

export const heroEvents: HeroEvent[] = [
  {
    id: "mahotsav-2024",
    title: "Annual Community Mahotsav 2024",
    tags: ["Cultural", "Oct 24"],
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
  },
  {
    id: "youth-summit",
    title: "Youth Leadership Summit",
    tags: ["Education", "Nov 12"],
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  },
  {
    id: "heritage-fair",
    title: "Heritage Festival & Fair",
    tags: ["Heritage", "Dec 05"],
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
  },
];

export const featuredEvent: FeaturedEvent = {
  id: "heritage-gala",
  title: "Annual Community Heritage Gala 2024",
  date: "October 24, 2024 · 6:00 PM",
  location: "The Grand Pavilion, Ahmedabad",
  description:
    "Join us for an evening of cultural celebration, traditional cuisine, and community recognition as we honor our shared roots and bright future.",
  image:
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
  tag: "Featured Event",
};

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: "youth-leadership-summit",
    title: "Youth Leadership Summit",
    date: "Nov 15",
    time: "10:00 AM - 4:00 PM",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    tag: "Education",
  },
  {
    id: "heritage-festival-fair",
    title: "Heritage Festival & Fair",
    date: "Dec 05",
    time: "9:00 AM - 8:00 PM",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    tag: "Heritage",
  },
  {
    id: "annual-sports-day",
    title: "Annual Sports Day",
    date: "Dec 22",
    time: "8:00 AM - 5:00 PM",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80",
    tag: "Sports",
  },
];

export const pastEvents: PastEvent[] = [
  {
    id: "monsoon-music-festival",
    title: "Monsoon Music Festival",
    date: "Aug 2024",
    meta: "120 attendees · 4 performances",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
  },
  {
    id: "senior-citizens-meet",
    title: "Senior Citizens Meet",
    date: "Sep 2024",
    meta: "85 attendees · Morning brunch",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
  },
  {
    id: "business-networking-hub",
    title: "Business Networking Hub",
    date: "Jun 2024",
    meta: "200+ professionals · 12 speakers",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&q=80",
  },
];

export const eventDetails: EventDetail[] = [
  {
    id: "patidar-cultural-mahotsav-2024",
    title: "Patidar Cultural Mahotsav 2024",
    tag: "Annual Heritage Meet",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
    date: "Dec 15, 2024 · 06:00 PM onwards",
    venue: "Grand Heritage Grounds, Ahmedabad",
    price: "$50.00 CAD per person",
    priceNote: "Children under age 5: No charge",
    about: [
      "Join us for an unforgettable evening celebrating our rich Kadva Patidar heritage. This year's Mahotsav brings together families for a night of cultural reconnection, traditional music, and stronger community ties.",
      "The event features guest speakers, youth talent showcases, and a special ceremony honoring our elders. It is designed as a welcoming, all-ages celebration of unity and progress.",
    ],
    highlights: [
      {
        id: "games",
        title: "Games Section",
        icon: "game-controller-outline",
        content:
          "Traditional Garba competitions and modern interactive fun for all ages with a strong community feel.",
      },
      {
        id: "food",
        title: "Food & Catering",
        icon: "restaurant-outline",
        content:
          "Authentic Kathiyawadi feast with heritage recipes, seasonal favorites, sweets, and Jain-friendly arrangements.",
      },
      {
        id: "prizes",
        title: "Fun & Prizes",
        icon: "trophy-outline",
        content:
          "Lucky draw prizes and community recognition moments celebrating member achievements and contributions.",
      },
    ],
  },
];

export const villages = [
  "Akhaj",
  "Amreli",
  "Anjar",
  "Bhachau",
  "Bhavnagar",
  "Botad",
  "Dhandhuka",
  "Dhrangadhra",
  "Gondal",
  "Jamnagar",
  "Junagadh",
  "Kutch",
  "Limbdi",
  "Morbi",
  "Porbandar",
  "Rajkot",
  "Surendranagar",
  "Upleta",
  "Wankaner",
  "Wadhwan",
];

export const members: Member[] = [
  {
    id: "1",
    fullName: "Rajesh Patel",
    dateOfBirth: "1978-03-15",
    currentCity: "Ahmedabad",
    village: "Rajkot",
    occupation: "Civil Engineer",
    canadaStatus: "Permanent Resident",
  },
  {
    id: "2",
    fullName: "Kiran Desai",
    dateOfBirth: "1985-07-22",
    currentCity: "Surat",
    village: "Amreli",
    occupation: "Business Owner",
    canadaStatus: "Citizen",
  },
  {
    id: "3",
    fullName: "Manish Vasani",
    dateOfBirth: "1990-11-08",
    currentCity: "Mumbai",
    village: "Jamnagar",
    occupation: "Software Developer",
    canadaStatus: "Student",
  },
  {
    id: "4",
    fullName: "Hemlata Patel",
    dateOfBirth: "1972-05-30",
    currentCity: "Vadodara",
    village: "Bhavnagar",
    occupation: "School Principal",
    canadaStatus: "Citizen",
  },
  {
    id: "5",
    fullName: "Suresh Kothari",
    dateOfBirth: "1968-01-12",
    currentCity: "Rajkot",
    village: "Gondal",
    occupation: "Chartered Accountant",
    canadaStatus: "Permanent Resident",
  },
  {
    id: "6",
    fullName: "Priya Mehta",
    dateOfBirth: "1994-09-04",
    currentCity: "Pune",
    village: "Kutch",
    occupation: "Medical Doctor",
    canadaStatus: "Student",
  },
];

export function getEventDetailById(id?: string) {
  return eventDetails.find((item) => item.id === id) ?? eventDetails[0];
}

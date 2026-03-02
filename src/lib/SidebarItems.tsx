import { Calendar, Car, UserCheck, UserStar } from "lucide-react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

export const sidebarItems = [
  {
    key: "",
    label: "Overview",
    path: "",
    icon: <RxDashboard size={20} />,
  },

  {
    key: "cars",
    label: "Cars Manage",
    path: "cars",
    icon: <Car size={20} />,
  },
  {
    key: "hosts",
    label: "Hosts Manage",
    path: "hosts",
    icon: <UserCheck size={20} />,
  },
  {
    key: "bookings",
    label: "Bookings Manage",
    path: "bookings",
    icon: <Calendar size={20} />,
  },
  {
    key: "users",
    label: "Users Manage",
    path: "users",
    icon: <FaRegCircleUser size={20} />,
  },
  {
    key: "admins",
    label: "Admin Manage",
    path: "admins",
    icon: <UserStar size={20} />,
  },
  {
    key: "setting",
    label: "Setting",
    path: "setting",
    icon: <IoSettingsOutline size={20} />,
  },
  // {
  //   key: "cms",
  //   label: "Content Manage",
  //   path: "cms",
  //   icon: <IoDocumentOutline size={20} />,
  //   children: [
  //     {
  //       key: "terms-condition",
  //       label: "Terms Condition",
  //       path: "terms-condition",
  //       icon: <AiOutlineSafetyCertificate size={20} />,
  //     },
  //     {
  //       key: "policy",
  //       label: "Privacy Policy",
  //       path: "policy",
  //       icon: <MdOutlinePrivacyTip size={20} />,
  //     },
  //     {
  //       key: "about",
  //       label: "About Us",
  //       path: "about",
  //       icon: <LuMessageCircleWarning size={20} />,
  //     },
  //     {
  //       key: "faq",
  //       label: "FAQ",
  //       path: "faq",
  //       icon: <FaQuestion size={20} />,
  //     },
  //   ],
  // },
];

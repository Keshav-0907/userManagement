'use client'
import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  X, 
  User, 
  Key, 
  CreditCard, 
  Package, 
  History, 
  FileCheck, 
  List, 
  Download, 
  MessageSquare, 
  Award, 
  LogOut 
} from 'lucide-react';

const SideBarItems = [
  { name: "My Profile", icon: User, dropdown: false, link: "/member/profile" },
  { name: "Reset Password", icon: Key, dropdown: false, link: "/member/resetpassword" },
  { name: "Payment Invoice", icon: CreditCard, dropdown: true, link: "/member/profile" },
  { name: "Sample Receiving Status", icon: Package, dropdown: true, link: "/member/settings" },
  { name: "Case History", icon: History, dropdown: true, link: "/member/profile" },
  { name: "Submit Results", icon: FileCheck, dropdown: true, link: "/member/profile" },
  { name: "My Submitted Results", icon: List, dropdown: true, link: "/member/settings" },
  { name: "Download Reports", icon: Download, dropdown: true, link: "/member/profile" },
  { name: "Feedback and Queries", icon: MessageSquare, dropdown: true, link: "/member/settings" },
  { name: "Download Certificate", icon: Award, dropdown: true, link: "/member/profile" },
  { name: "Logout", icon: LogOut, dropdown: false, link: "/member/settings" },
];

const SidebarItem = ({ item, isExpanded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;

  return (
    <div className="mb-2">
      <Link
        href={item.link}
        className={`flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-blue-100 transition-colors duration-200 ${
          isOpen ? 'bg-blue-100' : ''
        }`}
        onClick={(e) => {
          if (item.dropdown) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 mr-3 text-gray-500" />
          <span className={`${!isExpanded ? 'hidden' : ''} truncate`}>{item.name}</span>
        </div>
        {item.dropdown && isExpanded && (
          isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
        )}
      </Link>
      {item.dropdown && isOpen && isExpanded && (
        <div className="ml-4 mt-2 space-y-2">
          <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-blue-50 transition-colors duration-200">
            <div className="w-5 h-5 mr-3" /> {/* Placeholder for alignment */}
            Submenu Item 1
          </Link>
          <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-blue-50 transition-colors duration-200">
            <div className="w-5 h-5 mr-3" /> {/* Placeholder for alignment */}
            Submenu Item 2
          </Link>
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={`flex flex-col bg-white shadow-lg ${
        isExpanded ? "w-64" : "w-20"
      } h-screen transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {isExpanded ? (
          <h1 className="text-xl font-bold text-gray-800">MENU</h1>
        ) : (
          null
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        {SideBarItems.map((item, index) => (
          <SidebarItem key={index} item={item} isExpanded={isExpanded} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
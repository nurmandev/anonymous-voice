"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Mail, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { UserDropdown } from "./UserDropdown";
import Loading from "@/app/loading";
import { AnimatePresence, motion } from "framer-motion";

// Advanced Navigation Types
interface NavItemBase {
  id: string;
  name: string;
  href: string;
  onClick?: () => void;
}

interface NavItemWithDropdown extends NavItemBase {
  dropdown: {
    id: string;
    label: string;
    link: string;
    onClick?: () => void;
  }[];
}

type NavItem = NavItemBase | NavItemWithDropdown;

// Navigation Configuration
const mainNavItems: NavItem[] = [
  {
    id: "about",
    name: "About",
    href: "/about",
  },
  {
    id: "how-works",
    name: "How It Works",
    href: "/how-it-works",
  },
  {
    id: "apply",
    name: "Apply",
    href: "/apply",
    dropdown: [
      // {
      //   id: "quote",
      //   label: "Get a Quote",
      //   link: "/get-a-quote",
      // },
      {
        id: "mentor",
        label: "Apply for Mentor",
        link: "/mentor-registration",
      },
    ],
  },
  {
    id: "blog",
    name: "Blog",
    href: "/blog",
  },
  {
    id: "donate",
    name: "Donate",
    href: "/donate",
  },
  {
    id: "more",
    name: "More",
    href: "#",
    dropdown: [
      {
        id: "faq",
        label: "FAQ",
        link: "/faq",
      },
      {
        id: "contact",
        label: "Contact",
        link: "/contact",
      },
    ],
  },
];

// Utility function to check dropdown
function hasDropdown(item: NavItem): item is NavItemWithDropdown {
  return "dropdown" in item;
}

// Mobile Accordion Item Component
const MobileAccordionItem: React.FC<{
  item: NavItem;
  pathname: string;
  depth?: number;
}> = ({ item, pathname }) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderDropdownItems = () => {
    if (!hasDropdown(item)) return null;

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
            className="pl-4 space-y-2 overflow-hidden"
          >
            {item.dropdown.map((subItem, index) => (
              <motion.li
                key={subItem.id}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: index * 0.05,
                    duration: 0.2,
                  },
                }}
                exit={{
                  opacity: 0,
                  x: -10,
                  transition: {
                    duration: 0.1,
                  },
                }}
              >
                <SheetClose asChild>
                  <Link
                    href={subItem.link}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                  >
                    {subItem.label}
                  </Link>
                </SheetClose>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    );
  };

  if (hasDropdown(item)) {
    return (
      <li className="border rounded-md overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">{item.name}</div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>
        {renderDropdownItems()}
      </li>
    );
  }

  return (
    <li className="border rounded-md font-medium text-gray-900 text-sm">
      <SheetClose asChild>
        {item.onClick ? (
          <Button
            onClick={item.onClick}
            variant="ghost"
            className="block w-full text-left px-3 py-2"
          >
            {item.name}
          </Button>
        ) : (
          <Link
            href={item.href}
            className={`block px-3 py-2 ${pathname === item.href ? "bg-gray-200" : ""}`}
          >
            {item.name}
          </Link>
        )}
      </SheetClose>
    </li>
  );
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // User navigation items
  const userNavItems: NavItem[] = user
    ? [
        ...(user.role === "admin"
          ? [
              {
                id: "dashboard",
                name: "Dashboard",
                href: "/dashboard/mentors",
              },
            ]
          : user.role === "mentor"
            ? [
                {
                  id: "dashboard",
                  name: "Dashboard",
                  href: "/dashboard/booked-calls",
                },
              ]
            : []),
        {
          id: "logout",
          name: "Logout",
          href: "",
          onClick: logout,
        },
      ]
    : [
        {
          id: "login",
          name: "Login",
          href: "/login",
        },
      ];

  const combinedNavItems = [...mainNavItems, ...userNavItems];

  if (loading) {
    return <Loading />;
  }

  // Mobile Navigation Trigger
  const MobileNavTrigger = () => (
    <div className="lg:hidden flex items-center">
      {user ? (
        <div className="flex items-center gap-4 text-soft-paste">
          {user?.role !== "admin" && (
            <Link href="/chat">
              <Mail size={18} />
            </Link>
          )}
          {/* <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button> */}
          <SheetTrigger onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </SheetTrigger>
        </div>
      ) : (
        <SheetTrigger onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={26} className="text-soft-paste-dark" />
        </SheetTrigger>
      )}
    </div>
  );

  // Mobile Navigation Sheet
  const MobileNavSheet = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <MobileNavTrigger />
      <SheetContent
        side="left"
        className="p-0 w-[320px] max-w-[90vw] flex flex-col"
      >
        <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
          <SheetTitle>
            <Link href="/" className="flex items-center">
              <Image
                src="/images/av.png"
                alt="Anonymous Voice Logo"
                width={100}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="p-4 overflow-y-auto flex-grow">
          <motion.ul className="space-y-2 font-semibold">
            <AnimatePresence>
              {combinedNavItems.map((item) => (
                <MobileAccordionItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                />
              ))}
              {/* <div className="flex items-center text-sm bg-soft-paste text-white font-bold rounded-lg space-x-2 px-4 py-2">
                <Link href="/login">Login</Link>
                <span>/</span>
                <Link href="/signup">Sign Up</Link>
              </div> */}
            </AnimatePresence>
          </motion.ul>
        </nav>

        <SheetFooter className="p-4 border-t text-start">
          <p className="text-[10px] text-gray-400">
            &copy; {new Date().getFullYear()} Anonymous Voice. All rights
            reserved.
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  // Desktop Navigation
  const DesktopNavigation = () => (
    <nav className="hidden lg:flex space-x-4 lg:space-x-8">
      {mainNavItems.map((item) => (
        <div key={item.name} className="relative group">
          {hasDropdown(item) ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-500 hover:text-gray-700">
                {item.name}
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {item.dropdown.map((subItem) => (
                  <DropdownMenuItem key={subItem.label}>
                    <Link
                      href={subItem.link}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {subItem.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={item.href}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                pathname === item.href
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );

  // Desktop User Actions
  const DesktopUserActions = () => (
    <div className="hidden lg:flex items-center space-x-3">
      {user ? (
        <div className="flex items-center space-x-2">
          {user?.role !== "admin" && (
            <>
              <Link href="/chat">
                <Button variant="ghost" size="icon">
                  <Mail size={22} className="text-soft-paste-dark" />
                </Button>
              </Link>
              {/* <Button variant="ghost" size="icon">
                <Bell size={22} />
              </Button> */}
            </>
          )}

          <UserDropdown
            userRole={{
              role: user.role,
              logout,
            }}
          />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="border-soft-paste-hover">
            <Link href="/login">Login</Link>
          </Button>
          <Button className="bg-soft-paste">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 left-0 w-full bg-white border-b py-1 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/av.png"
              alt="Anonymous Voice Logo"
              width={100}
              height={100}
              className="w-auto h-12 sm:h-14"
            />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Desktop User Actions */}
          <DesktopUserActions />

          {/* Mobile Navigation */}
          <MobileNavSheet />
        </div>
      </div>
    </header>
  );
};

export default Header;

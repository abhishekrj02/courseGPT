'use client'
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { UserCourseListContext } from "../_context/UserCourseListContext";
import { SubscriptionContext } from "../_context/SubscriptionContext";
import { getSubscription } from "@/config/billingService";

function DashboardLayout({ children }) {
  const [userCourseList, setUserCourseList] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (!email) return;
    getSubscription(email)
      .then((data) => setSubscription(data.subscription))
      .catch((error) => console.error("Error fetching subscription:", error));
  }, [email]);

  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
     <SubscriptionContext.Provider value={{ subscription, setSubscription, email }}>
      <div className="min-h-screen w-full relative bg-background">
        <div className="absolute inset-0 z-0 pointer-events-none app-gradient" />
        <div className="relative z-10">
          <SideBar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
          <div className={`transition-all duration-300 ${collapsed ? "md:ml-16" : "md:ml-64"}`}>
            <Header />
            <div className="p-6 md:p-10">{children}</div>
          </div>
        </div>
      </div>
     </SubscriptionContext.Provider>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout;

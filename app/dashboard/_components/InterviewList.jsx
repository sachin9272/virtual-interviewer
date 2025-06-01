"use client";

import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress))
      .orderBy(desc(MockInterview.id));
    setInterviewList(result);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {interviewList.map((interview) => (
            <InterviewItemCard key={interview.id} interview={interview} />
        ))}
      </div>
    </div>
  );
};

export default InterviewList;

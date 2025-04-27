"use client"

import React, {use, useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from "drizzle-orm";
import QuestionSection from './_components/QuestionSection';



const StartInterview = ({params}) => {
    const { interviewId } = use(params);
    const [interviewData, setInterviewData] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const[mockInterviewQuestion, setMockInterviewQuestion] = useState();
    useEffect(()=>{
        GetInterviewDetails();
    },[]);
    const GetInterviewDetails = async () => {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, interviewId));
          const jsonMockResp = JSON.parse(result[0].jsonMockResp)
          console.log("JSON Mock Resp---->",jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(result[0]);
        console.log(result);
      };
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* Questions */}
        <QuestionSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>

        {/* Video Audio Recording */}
      </div>
    </div>
  )
}

export default StartInterview

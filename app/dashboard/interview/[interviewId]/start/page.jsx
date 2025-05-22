"use client"

import React, {use, useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from "drizzle-orm";
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link'




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
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions */}
        <QuestionSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>

        {/* Video Audio Recording */}
        <RecordAnswerSection
        mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}
        interviewData = {interviewData}
        />
      </div>
      <div className='flex justify-end gap-6'>
        {activeQuestionIndex > 0 && 
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Button</Button>}

        {activeQuestionIndex != mockInterviewQuestion?.length-1 &&
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}

        {activeQuestionIndex === mockInterviewQuestion?.length-1 && 
        <Link href={'/dashboard/interview'+interviewData?.mockId+"/feedback"}>
        <Button>End Interview</Button>
        </Link>
         }
      </div>
    </div>
  )
}

export default StartInterview

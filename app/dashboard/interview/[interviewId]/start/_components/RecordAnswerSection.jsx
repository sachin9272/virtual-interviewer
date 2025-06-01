"use client"
import Webcam from 'react-webcam'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner';
import { ChatSession } from '@google/generative-ai'
import {sendMessageToGemini} from '../../../../../../utils/GeminiAIModal';
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { UserAnswer } from "@/utils/schema";
import Link from 'next/link'


const RecordAnswerSection = ({mockInterviewQuestion, interviewData, activeQuestionIndex}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const {user} = useUser();
  const [loading, setLoading] = useState();
  console.log("Interview Data---->", interviewData);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  useEffect(() => {
    results.map((result)=>{
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    })
  }, [results])

  useEffect(()=>{
    if(!isRecording && userAnswer.length > 10){
      UpdateUserAnswer();
    }
    // if(userAnswer?.length < 10){
    //     setLoading(false);
    //     toast('Error while saving your answer, Please record again')
    //     return;
    //   }
  }, [userAnswer])

  const StartStopRecording = async() => {
    console.log("Inside Start Stop Recording");
    if(isRecording){
      console.log("Recording is on");
      stopSpeechToText();
      // console.log("UserAnswer--->", userAnswer);
      
      // const feedbackPrompt = "Question:"+mockInterviewQuestion[activeQuestionIndex]?.question + ", User Answer:"+userAnswer+",Depends on question and user answer for give interview question"+" please give us rating for answer and feedback as area of improvement if any"+" in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
      // // const result = await ChatSession.sendMessage(feedbackPrompt);
      // const result = await sendMessageToGemini(feedbackPrompt);
      // console.log("Feedback Result--->", result);
      // // const mockJsonResp = (result.response.text()).replace(/```json|```/g, '').trim();
      // let mockJsonResp = result.replace(/```json|```/g, '').trim();
      // mockJsonResp = mockJsonResp.replace(/[\b\f\n\r\t\v]/g, '');
      // const JsonFeedbackResp = JSON.parse(mockJsonResp);


      // console.log("Json resp-->",mockJsonResp);
      // // const JsonFeedbackResp = JSON.parse(mockJsonResp);

      // const resp = await db.insert(userAnswer).values({
      //   mockIdRef: interviewData?.mockId,
      //   question:mockInterviewQuestion[activeQuestionIndex]?.question,
      //   answer:mockInterviewQuestion[activeQuestionIndex]?.answer,
      //   userAns: userAnswer,
      //   feedback: JsonFeedbackResp?.feedback,
      //   rating: JsonFeedbackResp?.rating,
      //   userEmail: user?.primaryEmailAddress?.emailAddress,
      //   createdAt: moment().format('DD-MM-YYYY')
      // })
      // if(resp){
      //   toast('User Answer recorded successfully')
      // }
      // setUserAnswer('')
      // setLoading(false);
    }else{
      console.log("Recording is off");
      startSpeechToText();
    }
  }

  const UpdateUserAnswer = async()=> {
    console.log(userAnswer);
    setLoading(true);
    const feedbackPrompt = "Question:"+mockInterviewQuestion[activeQuestionIndex]?.question + ", User Answer:"+userAnswer+",Depends on question and user answer for give interview question"+" please give us rating for answer and feedback as area of improvement if any"+" in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
      // const result = await ChatSession.sendMessage(feedbackPrompt);
      const result = await sendMessageToGemini(feedbackPrompt);
      console.log("Feedback Result--->", result);
      // const mockJsonResp = (result.response.text()).replace(/```json|```/g, '').trim();
      let mockJsonResp = result.replace(/```json|```/g, '').trim();
      mockJsonResp = mockJsonResp.replace(/[\b\f\n\r\t\v]/g, '');
      const JsonFeedbackResp = JSON.parse(mockJsonResp);


      console.log("Json resp-->",mockJsonResp);
      

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      })
      if(resp){
        toast('User Answer recorded successfully')
        setUserAnswer('');
        setResults([]);
      }
      setResults([]);
      setLoading(false);
  }

  // <Button onClick={()=>console.log("show user ans---->",userAnswer)}>Show User Answer</Button>
  
  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5'>
      <Image src={'/webcam.jpg'} width={200} height={200} alt='NA' className='absolute'/>
      <Webcam
        mirrored={true}
        style={{
          height:300,
          width:'100%',
          zIndex:10
        }}
      />
    </div>
    <Button disabled = {loading}
     variant="outline" className='my-10'
    onClick={StartStopRecording}>
      {isRecording?
        <h2 className='text-red-600 flex gap-2'>
          <Mic/> Stop Recording
        </h2>
        :
      'Record Answer' }
    </Button>
    </div>
  )
}

export default RecordAnswerSection

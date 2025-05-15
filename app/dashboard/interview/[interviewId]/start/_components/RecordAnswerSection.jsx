"use client"
import Webcam from 'react-webcam'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner';
import { ChatSession } from '@google/generative-ai'

const RecordAnswerSection = ({mockInterviewQuestion, activeQuestionIndex}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  useEffect(() => {
    results.map((result)=>{
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    })
  }, [results])

  const SavedUserAnswer = async() => {
    if(isRecording){
      stopSpeechToText();
      if(userAnswer?.length < 10){
        toast('Error while saving your answer, Please record again')
        return;
      }
      const feedbackPrompt = "Question:"+mockInterviewQuestion[activeQuestionIndex]?.question + ", User Answer:"+userAnswer+",Depends on question and user answer for give interview question"+" please give us rating for answer and feedback as area of improvement if any"+" in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
      const result = await ChatSession.sendMessage(feedbackPrompt);
      console.log("Feedback Result--->", result);
      const mockJsonResp = (result.response.text()).replace(/```json|```/g, '').trim();
      console.log(mockJsonResp);
    }else{
      startSpeechToText();
    }
  }
  
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
    <Button variant="outline" className='my-10'
    onClick={isRecording?stopSpeechToText:startSpeechToText}>
      {isRecording?
        <h2 className='text-red-600 flex gap-2'>
          <Mic/> Stop Recording
        </h2>
        :
      'Record Answer' }
    </Button>
    <Button onClick={()=>console.log("show user ans---->",userAnswer)}>Show User Answer</Button>
    </div>
  )
}

export default RecordAnswerSection

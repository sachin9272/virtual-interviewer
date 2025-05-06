import Webcam from 'react-webcam'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';


const RecordAnswerSection = () => {
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
    <Button variant="outline" className='my-10'>Record Answer</Button>
    </div>
  )
}

export default RecordAnswerSection

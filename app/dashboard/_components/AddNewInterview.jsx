"use client";

import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { Input } from "postcss";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {sendMessageToGemini} from '../../../utils/GeminiAIModal'
import { LoaderCircle } from "lucide-react";
import {v4 as uuidv4} from 'uuid';
import { useUser } from "@clerk/nextjs";
import {db} from '@/utils/db'
import { MockInterview } from "@/utils/schema";
import moment from "moment";
import { useRouter } from "next/router";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const {user} = useUser();
  const onSubmit = async(event) => {
    setLoading(true);
    event.preventDefault();
    console.log("Job Position:", jobPosition);
    console.log("Job Description:",jobDesc);
    console.log("Job Experience:", jobExperience)

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience} , Depends on Job Position, Job Description & Years of Experience Give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview question along with answer in JSON format, Give us question and answer field on JSON`
    const result = await sendMessageToGemini(InputPrompt);
    let cleaned = result.replace(/```json|```/g, '').trim();
    cleaned = cleaned.replace(/[\b\f\n\r\t\v]/g, '');
    const parsed = JSON.parse(cleaned);
    console.log(cleaned);
  
    setJsonResponse(cleaned)
    if(cleaned){
    const resp = await db.insert(MockInterview)
    .values({
      mockId:uuidv4(),
      jsonMockResp: cleaned,
      jobPosition: jobPosition,
      jobDesc: jobDesc,
      jobExperience: jobExperience,
      createdBy: user?.primaryEmailAddress?.emailAddress ? user?.primaryEmailAddress?.emailAddress : "sachinsingh9272@gmail.com",
      createdAt: moment().format('DD-MM-YYYY'),
    }).returning({mockId:MockInterview.mockId})
    console.log("Inserted ID:", resp);
    if(resp){
      setOpenDialog(false);
      router.push('/dashboard/interview'+resp[0]?.mockId)
    }
  }else{
    console.log("Error")
  }
    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription asChild>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, Job description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack(In Short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, Node js, MySQL etc"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex.5"
                      type="number"
                      max="50"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-5">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading? 
                      <>
                      <LoaderCircle className="animate-spin"/>Generating from AI✨</>:'Start Interview'}
                    </Button>
                  </div>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;

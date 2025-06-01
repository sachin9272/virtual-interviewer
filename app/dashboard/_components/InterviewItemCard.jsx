import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  console.log("interview===>", interview);

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };
  return (
    <div className="border shadow-sm rounded-lg p-3 w-28">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At:{interview.createdAt}
      </h2>
      <div className="flex mt-2 gap-5">
        <Button size="sm" variant="outline" onClick={onFeedbackPress}>
          Feedback
        </Button>
        <Button size="sm" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;

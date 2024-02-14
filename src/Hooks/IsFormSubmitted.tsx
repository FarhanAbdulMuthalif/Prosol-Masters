// useFormSubmission.ts
import { useState } from "react";

const useFormSubmission = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return { isFormSubmitted, setIsFormSubmitted };
};

export default useFormSubmission;

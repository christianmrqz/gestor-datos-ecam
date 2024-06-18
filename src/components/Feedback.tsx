import React from 'react';

interface FeedbackProps {
  message: string;
}

const Feedback: React.FC<FeedbackProps> = ({ message }) => {
  if (!message) return null;

  let backgroundColorClass = '';
  let textColorClass = '';

  if (message.startsWith('Error')) {
    backgroundColorClass = 'bg-red-100';
    textColorClass = 'text-red-700';
  } else if (message.startsWith('Content added')) {
    backgroundColorClass = 'bg-green-100';
    textColorClass = 'text-green-700';
  } else {
    backgroundColorClass = 'bg-blue-100';
    textColorClass = 'text-blue-700';
  }

  return (
    <div className={`mt-4 p-4 rounded-lg ${backgroundColorClass} ${textColorClass}`}>
      {message}
    </div>
  );
};

export default Feedback;

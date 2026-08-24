import React from 'react';
import { LoadingState } from './LoadingState';

interface LoadingScreenProps {
  onComplete: () => void;
  userQuery?: string;
  uploadedImage?: string | null;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  userQuery,
  uploadedImage,
}) => {
  return (
    <LoadingState
      onComplete={onComplete}
      userQuery={userQuery}
      uploadedImage={uploadedImage}
    />
  );
};

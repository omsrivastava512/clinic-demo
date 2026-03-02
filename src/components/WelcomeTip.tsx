import { useState } from 'react';
import {
  TourCard,
  TourHeader,
  TourTitle,
  TourDescription,
  TourFooter,
  TourButton
} from './ui/TourComponents';

export default function WelcomeTip({
  title = "Quick Tip",
  description = "",
  footerNote = "1/1",
  hasNext = false,
  handleNext = () => {},
  skipText="Skip"
}) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) return null;

  return (
    <TourCard position="bottom-right" >
      <TourHeader onClose={() => setIsVisible(false)}>
        <TourTitle>{title}✨</TourTitle>
      </TourHeader>

      <TourDescription>
        {description}
      </TourDescription>

      <TourFooter>
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {footerNote}
        </div>
        <div className="flex gap-2">
          {/* Native HTML props like 'disabled' now work perfectly with TypeScript */}
          <TourButton variant="ghost" onClick={() => setIsVisible(false)}>
            {skipText}
            
          </TourButton>
          {hasNext && 
            <TourButton variant="primary" onClick={handleNext}>
              Next
            </TourButton>
          }
        </div>
      </TourFooter>
    </TourCard>
  );
}
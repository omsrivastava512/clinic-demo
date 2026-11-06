import { useEffect, useState } from 'react';
import {
  TourCard,
  TourHeader,
  TourTitle,
  TourDescription,
  TourFooter,
  TourButton
} from './ui/TourComponents';

type WelcomeTipProps = {
  title?: string | string[],
  description: string | string[],
  footerNote?: string,
  skipText?: string,
}

const INITIAL_TITLE = "System Guidance";

export default function WelcomeTip({
  title = INITIAL_TITLE,
  description,
  footerNote,
  skipText = "Dismiss"
}: WelcomeTipProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [curr, setCurr] = useState(0);

  const length = Array.isArray(description) ? description.length : 1;
  const hasNext = (curr: number) => curr + 1 < length;

  const handleNext = () => {
    setCurr(c => hasNext(c) ? c + 1 : c);
  };

  useEffect(() => {
    // TODO: implement checking from local storage to avoid opening the tip on every reload (Created on 2026-03-19)
  }, []);

  if (!isVisible) return null;

  return (
    <TourCard position="bottom-right">
      <TourHeader onClose={() => setIsVisible(false)}>
        <TourTitle>
          {(Array.isArray(title) ? title[curr] : title) || INITIAL_TITLE}
        </TourTitle>
      </TourHeader>

      <TourDescription>
        {length > 1 ? description[curr] : description}
      </TourDescription>

      <TourFooter>
        <div className="text-[11px] font-mono text-muted-foreground">
          {footerNote ?? `${curr + 1} of ${length}`}
        </div>
        <div className="flex gap-2">
          <TourButton variant="ghost" onClick={() => setIsVisible(false)}>
            {skipText}
          </TourButton>
          {hasNext(curr) && (
            <TourButton variant="primary" onClick={handleNext}>
              Next
            </TourButton>
          )}
        </div>
      </TourFooter>
    </TourCard>
  );
}

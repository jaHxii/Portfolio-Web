import React, { useState } from 'react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmCodeLinkProps {
  href: string;
  projectName?: string;
  className?: string;
}

const ConfirmCodeLink = ({
  href,
  projectName,
  className,
}: ConfirmCodeLinkProps) => {
  const [open, setOpen] = useState(false);

  const depart = () => {
    window.open(href, '_blank', 'noopener=yes,noreferrer=yes');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type='button'
        variant='outline'
        size='sm'
        className={className}
        onClick={() => setOpen(true)}
      >
        <Github className='h-4 w-4 mr-2' />
        Code
      </Button>
      <DialogContent className='border-gold/20'>
        <DialogHeader>
          <div className='flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-gold/70 mb-1'>
            <span className='relative flex h-1.5 w-1.5'>
              <span className='absolute inline-flex h-full w-full rounded-full bg-gold/50 motion-safe:animate-ping' />
              <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-gold' />
            </span>
            WAYPOINT · EXTERNAL
          </div>
          <DialogTitle className='font-heading text-xl'>
            Open flight to GitHub?
          </DialogTitle>
          <DialogDescription className='leading-relaxed'>
            You&apos;re leaving the control tower and heading to the
            {projectName ? (
              <>
                {' '}
                <span className='text-foreground font-medium'>
                  &quot;{projectName}&quot;
                </span>{' '}
                repository
              </>
            ) : (
              ' external '
            )}
            on GitHub. Confirm departure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            className='glass text-mist-soft'
            onClick={() => setOpen(false)}
          >
            Stay
          </Button>
          <Button
            type='button'
            className='bg-mist text-storm-deep hover:bg-mist/90'
            onClick={depart}
          >
            <Github className='h-4 w-4 mr-2' />
            Depart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmCodeLink;

import { X } from 'lucide-react';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { Close, Content, Portal } from '@radix-ui/react-dialog';

import { cn } from '@utils/styles';

import { Overlay } from './components';

export const ModalContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
  <Portal>
    <Overlay />
    <Content
      ref={ref}
      className={cn(
        'border-stroke-gray-dark border-2 rounded-lg bg-background fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <Close className="absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X color="#B6B6B6" className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </Close>
    </Content>
  </Portal>
));

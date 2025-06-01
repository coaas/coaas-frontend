import { ComponentPropsWithRef, PropsWithChildren } from 'react';
import { useTemplatesList } from './lib/use-templates-list';
import { cn } from '@utils/styles';

interface Props extends ComponentPropsWithRef<'div'> {
  scrollThreshold: number;
  fetchNextPage: () => void;
  isFetchingNextPage?: boolean;
  isFetching?: boolean;
  count?: number;
}

export const TemplatesList = ({
  fetchNextPage,
  scrollThreshold,
  children,
  isFetching,
  isFetchingNextPage,
  className,
  ...restProps
}: PropsWithChildren<Props>) => {
  const { elementRef } = useTemplatesList({
    scrollCb: fetchNextPage,
    scrollThreshold,
    isFetchingNextPage,
  });

  const Skeleton = Array.from({ length: 5 }, (_, i) => i).map(key => (
    <div
      key={key}
      className=" rounded-lg min-h-[100px] animate-pulse bg-card border-stroke border-[1.5px] shadow-card"
    />
  ));

  return (
    <div ref={elementRef} className={cn('mt-5', className)} {...restProps}>
      {children}
      {isFetching && Skeleton}
    </div>
  );
};

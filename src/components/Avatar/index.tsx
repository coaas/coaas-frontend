import { cn } from '@utils/styles';
import { ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom';
import { RouteMap } from '@components/Layout/components/types';

interface UserProps extends ComponentPropsWithoutRef<'div'> {
  userName: string;
  imgUrl?: string;
}

export const Avatar = ({
  className,
  userName,
  imgUrl,
  ...props
}: UserProps) => {
  return (
    <Link to={RouteMap.profile}>
      <div
        className={cn(
          'p-3 flex items-center gap-4 hover:bg-area-dark dark:hover:bg-area-dark hover:bg-gray-100 transition-colors rounded-lg',
          className,
        )}
        {...props}
      >
        {imgUrl && <img className="size-[29px] rounded-full" />}
        {!imgUrl && (
          <span className="size-[29px] rounded-full bg-area dark:bg-area bg-gray-200" />
        )}
        {userName && (
          <p className="text-blue-light dark:text-blue-light text-blue text-[15px]">
            {userName}
          </p>
        )}
      </div>
    </Link>
  );
};

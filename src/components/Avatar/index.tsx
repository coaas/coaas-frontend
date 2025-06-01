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
      <div className={cn('p-3 flex items-center gap-4 hover:bg-area-dark transition-colors rounded-lg', className)} {...props}>
        {imgUrl && <img className="size-[29px] rounded-full" />}
        {!imgUrl && <span className="size-[29px] rounded-full bg-area" />}
        {userName && <p className="text-blue-light text-[15px]">{userName}</p>}
      </div>
    </Link>
  );
};

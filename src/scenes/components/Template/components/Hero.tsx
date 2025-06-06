import { Icon, IconType } from '@components/Icon';
import { Template } from '@globalTypes/templates';
import { FormButton } from '@scenes/components/CreateTemplate/components/FormButton';
import { useUser } from '@utils/lib/use-user';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CreateServiceModal } from './CreateServiceModal';
import { RouteMap } from '@components/Layout/components/types';
import { createDynamicPath } from '@utils/lib/create-dynamic-path';

interface HeroProps extends Template {
  isDraft?: boolean;
  draftId?: string;
}

export const Hero = ({
  name,
  description,
  author,
  stars,
  downloads,
  languages,
  id,
  isDraft = false,
  draftId,
}: HeroProps) => {
  const user = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  //
  const isAuthor = author.id == user?.id;

  const handleEditClick = () => {
    if (isDraft && draftId) {
      navigate(
        createDynamicPath(RouteMap.templatesDraftCreateStepInfo, {
          draft_id: draftId,
        }),
      );
    }
  };

  return (
    <div className="py-[22px] px-8 rounded-xl border border-blue flex gap-[33px]">
      <span className="text-blue">
        <Icon
          type={IconType.cube}
          props={{ size: 105, color: 'currentColor' }}
        />
      </span>
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full flex justify-between">
          <div>
            <h3 className="flex gap-[10px] text-2xl leading-none font-semibold test-white items-center">
              {name}
              <span className="text-blue">
                <Icon
                  type={IconType.lambda}
                  props={{ size: 26, className: 'currentColor' }}
                />
              </span>
            </h3>
            <p className="text-gray text-[16px] leading-none font-normal">
              {description}
            </p>
          </div>
          <div className="flex gap-[15px] self-start">
            <Link
              to={`/profile/${author.username}`}
              className="hover:opacity-80 transition-opacity"
            >
              <span className="text-blue text-[16px] leading-none flex gap-[5px] items-center">
                <Icon
                  type={IconType.user}
                  props={{ size: 13, color: 'currentColor' }}
                />
                {author.username}
              </span>
            </Link>
            <span className="text-blue text-[16px] leading-none flex gap-[5px] items-center">
              <Icon
                type={IconType.star}
                props={{ size: 16, color: 'currentColor' }}
              />
              {stars}
            </span>
            <span className="text-blue text-[16px] leading-none flex gap-[5px] items-center">
              <Icon
                type={IconType.graph}
                props={{ size: 18, color: 'currentColor' }}
              />
              {downloads}
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-auto">
          <nav className="flex gap-[6px]">
            {!isDraft && (
              <FormButton
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setIsModalOpen(true)}
              >
                Use template
              </FormButton>
            )}
            {isAuthor && (
              <>
                <FormButton
                  size="sm"
                  variant="unfilled"
                  className="rounded-[4px] whitespace-nowrap"
                  onClick={isDraft ? handleEditClick : undefined}
                >
                  Edit
                </FormButton>
                <FormButton
                  size="sm"
                  variant="red"
                  className="rounded-[4px] whitespace-nowrap"
                >
                  Delete
                </FormButton>
              </>
            )}
          </nav>
          <div className="flex gap-[6px]">
            {languages.map((language, key) => (
              <span
                className=" text-[12px] leading-none font-medium text-gray py-[4.5px] px-[14px] rounded-[4px] border border-gray"
                key={key}
              >
                {language}
              </span>
            ))}
          </div>
        </div>
      </div>
      <CreateServiceModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        templateId={id}
      />
    </div>
  );
};

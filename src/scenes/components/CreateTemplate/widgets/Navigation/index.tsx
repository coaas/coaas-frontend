import { NavLink, useParams } from 'react-router-dom';
import { MouseEvent } from 'react';
import { Icon, IconType } from '@components/Icon';
import { cn } from '@utils/styles';

import { RouteMap } from '@components/Layout/components/types';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getTemplateDraft } from '@api/queries';
import { createDynamicPath } from '@utils/lib/create-dynamic-path';

const draftNavLinks = [
  {
    label: 'Template Info',
    href: RouteMap.templatesDraftCreateStepInfo,
    iconType: IconType.cube,
  },
  {
    label: 'Template Image',
    href: RouteMap.templatesDraftCreateStepImage,
    iconType: IconType.cube,
  },
  {
    label: 'Template Settings',
    href: RouteMap.templatesDraftCreateStepSettings,
    iconType: IconType.cube,
  },
  {
    label: 'Template Mapper',
    href: RouteMap.templatesDraftCreateStepMapper,
    iconType: IconType.cube,
  },
];

export const Navigation = () => {
  const { draft_id } = useParams<{ draft_id: string }>();

  // Получаем данные черновика из URL
  const { data: draftData } = useApiQuery({
    request: getTemplateDraft,
    payload: { id: draft_id },
    requestOptions: { prefixUrl: '/api' },
    options: { enabled: !!draft_id },
  });

  const description = draftData?.info.description || '';
  const docs = draftData?.info.docs || '';

  const imageUrl = draftData?.managed.url || '';
  const versions = draftData?.managed.versions || [];

  const isImageStepDisabled = [description, docs].some(
    item => item.length === 0,
  );

  const isSettingsStepDisabled = [imageUrl, versions].some(
    item => item.length === 0,
  );

  // Mapper step is now always enabled after image step is completed
  const isMapperStepDisabled = isSettingsStepDisabled;

  const checkIsStepDisabled = (href: RouteMap) => {
    return (
      (href === RouteMap.templatesDraftCreateStepImage &&
        isImageStepDisabled) ||
      (href === RouteMap.templatesDraftCreateStepSettings &&
        isSettingsStepDisabled) ||
      (href === RouteMap.templatesDraftCreateStepMapper && isMapperStepDisabled)
    );
  };

  const handleLinkClick = (e: MouseEvent, disabled: boolean) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <nav className="p-[15px] rounded-lg border-stroke-gray-dark border max-h-fit">
      <ul className="flex flex-col gap-[11px]">
        {draftNavLinks.map(({ href, iconType, label }, key) => {
          const disabled = checkIsStepDisabled(href);
          const linkTo = draft_id
            ? createDynamicPath(href, { draft_id })
            : href;

          return (
            <li key={key}>
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'flex gap-[10px] text-gray items-center font-inter transition-colors font-medium text-sm text-[16px] py-[11px] px-[15px] border-stroke-gray-dark border rounded-[10px] ',
                    {
                      'bg-grayLighter text-blue': isActive,
                      'cursor-not-allowed opacity-50': disabled,
                      'hover:bg-grayLighter': !disabled,
                    },
                  )
                }
                to={linkTo}
                onClick={e => handleLinkClick(e, disabled)}
              >
                <Icon
                  type={iconType}
                  props={{ size: 23, color: 'currentColor' }}
                />
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

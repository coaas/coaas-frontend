import { NavLink } from 'react-router-dom';
import { MouseEvent } from 'react';
import { navLinks } from '../../constants';
import { Icon } from '@components/Icon';
import { cn } from '@utils/styles';

import { RouteMap } from '@components/Layout/components/types';
import { useDraftIdStorage } from '../../lib/use-draft-id-storage';

export const Navigation = () => {
  const { draftData } = useDraftIdStorage();

  const description = draftData?.info.description || '';
  const categories = draftData?.info.categories || [];
  const languages = draftData?.info.languages || [];
  const docs = draftData?.info.docs || '';

  const imageUrl = draftData?.managed.url || '';
  const versions = draftData?.managed.versions || [];

  const configs = draftData?.settings.configs || [];
  const env_vars = draftData?.settings.env_vars || [];
  const secrets = draftData?.settings.secrets || [];
  const ports = draftData?.settings.ports || [];

  const isImageStepDisabled = [description, categories, languages, docs].some(
    item => item.length === 0,
  );

  const isSettingsStepDisabled = [imageUrl, versions].some(
    item => item.length === 0,
  );

  const isMapperStepDisabled = [configs, env_vars, secrets, ports].some(
    item => item.length === 0,
  );

  const checkIsStepDisabled = (href: RouteMap) =>
    (href === RouteMap.templatesCreateStepImage && isImageStepDisabled) ||
    (href === RouteMap.templatesCreateStepSettings && isSettingsStepDisabled) ||
    (href === RouteMap.templatesCreateStepMapper && isMapperStepDisabled);

  const handleLinkClick = (e: MouseEvent, disabled: boolean) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <nav className="p-[15px] rounded-lg border-stroke-gray-dark border max-h-fit">
      <ul className="flex flex-col gap-[11px]">
        {navLinks.map(({ href, iconType, label }, key) => {
          const disabled = checkIsStepDisabled(href);

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
                to={href}
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

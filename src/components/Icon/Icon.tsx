import { FC } from 'react';

import { IconProps, IconType } from './types';
import {
  ConfigIcon,
  CubeIcon,
  DeployIcon,
  DoubleArrowIcon,
  GitIcon,
  GraphIcon,
  LayersIcon,
  MetricsIcon,
  SearchIcon,
  SecretIcon,
  SettingsIcon,
  SupportIcon,
  TemplateIcon,
} from './components';
import { ChevronDown } from './components/ChevronDown';

export const Icon: FC<IconProps> = props => {
  switch (props.type) {
    case IconType.cube: {
      return <CubeIcon {...props.props} />;
    }

    case IconType.metrics: {
      return <MetricsIcon {...props.props} />;
    }

    case IconType.layers: {
      return <LayersIcon {...props.props} />;
    }

    case IconType.graph: {
      return <GraphIcon {...props.props} />;
    }

    case IconType.template: {
      return <TemplateIcon {...props.props} />;
    }

    case IconType.settings: {
      return <SettingsIcon {...props.props} />;
    }

    case IconType.support: {
      return <SupportIcon {...props.props} />;
    }

    case IconType.doubleArrow: {
      return <DoubleArrowIcon {...props.props} />;
    }

    case IconType.config: {
      return <ConfigIcon {...props.props} />;
    }

    case IconType.deploy: {
      return <DeployIcon {...props.props} />;
    }

    case IconType.git: {
      return <GitIcon {...props.props} />;
    }

    case IconType.secret: {
      return <SecretIcon {...props.props} />;
    }

    case IconType.chevron: {
      return <ChevronDown {...props.props} />;
    }

    case IconType.search: {
      return <SearchIcon {...props.props} />;
    }

    default: {
      return null;
    }
  }
};

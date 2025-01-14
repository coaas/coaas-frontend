import { FC } from 'react';

import { IconProps, IconType } from './types';
import {
  CubeIcon,
  DoubleArrowIcon,
  GraphIcon,
  LayersIcon,
  MetricsIcon,
  SettingsIcon,
  SupportIcon,
  TemplateIcon,
} from './components';

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

    default: {
      return null;
    }
  }
};

import { FC } from 'react';

import { IconProps, IconType } from './types';
import { CubeIcon, LayersIcon, MetricsIcon } from './components';

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

    default: {
      return null;
    }
  }
};

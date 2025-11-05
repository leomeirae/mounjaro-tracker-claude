import React from 'react';
import { Icons, IconName } from '@/constants/icons';
import { useShotsyColors } from '@/hooks/useShotsyColors';
import { createLogger } from '@/lib/logger';

const logger = createLogger('Icon');

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  weight = 'regular'
}) => {
  const colors = useShotsyColors();
  const IconComponent = Icons[name];

  if (!IconComponent) {
    logger.warn("Icon not found", { name });
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color || colors.text}
      weight={weight}
    />
  );
};

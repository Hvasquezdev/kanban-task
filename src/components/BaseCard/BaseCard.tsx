import computeClassNames from '../../utils/compute-class-names';
import './BaseCard.css';

type BaseCardSpacing = 'lg' | 'sm';

interface BaseCardProps {
  spacing?: BaseCardSpacing;
  children?: React.ReactNode;
  boxShadow?: boolean;
  className?: string;
}

export default function BaseCard({ spacing = 'lg', children, boxShadow = true, className = '' }: BaseCardProps) {
  const computedClassNames = computeClassNames({
    [`base-card--${spacing}`]: spacing,
    'base-card--box-shadow': boxShadow,
    [className as string]: className
  });

  return <div className={`base-card ${computedClassNames}`}>{children}</div>;
}

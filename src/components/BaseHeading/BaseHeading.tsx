import './BaseHeading.css';

interface BaseHeadingProps {
  children?: React.ReactNode;
  size?: 'xl' | 'lg' | 'md' | 'sm';
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontWeight?: 'bold' | 'medium' | 'normal';
  className?: string;
}

function BaseHeading({
  children,
  size = 'md',
  variant = 'h1',
  fontWeight = 'normal',
  className = ''
}: BaseHeadingProps) {
  const HeadingTag = `${variant}` as keyof JSX.IntrinsicElements;
  return (
    <HeadingTag className={`base-heading base-heading--${size} base-heading--${fontWeight} ${className}`}>
      {children}
    </HeadingTag>
  );
}

export default BaseHeading;

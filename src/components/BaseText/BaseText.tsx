import './BaseText.css';

interface BaseTextProps {
  children: React.ReactNode;
  size?: 'lg' | 'md';
  className?: string;
  fontWeight?: 'bold' | 'medium' | 'normal';
}

function BaseText({ size = 'md', fontWeight = 'normal', className = '', children }: BaseTextProps) {
  return <p className={`base-text base-text--${size} base-text--${fontWeight} ${className}`}>{children}</p>;
}

export default BaseText;

import React, { useState } from 'react';
import TheHeader from '../../components/Shared/TheHeader';
import './BaseLayout.css';
import computeClassNames from '../../utils/compute-class-names';

interface BaseLayoutProps {
  children?: React.ReactNode;
}

function BaseLayout({ children }: BaseLayoutProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const layoutClassNames = computeClassNames({
    'base-layout--has-menu': isMenuVisible
  });

  return (
    <div className={`base-layout ${layoutClassNames}`}>
      <TheHeader onShowMenu={setIsMenuVisible} />
      <div className="base-layout__content">{children}</div>
    </div>
  );
}

export default BaseLayout;

import { useEffect, useState } from 'react';
import LogoDark from '../../../assets/images/svg/logo-dark.svg';
import LogoMobile from '../../../assets/images/svg/logo-mobile.svg';
import BaseButton from '../../BaseButton';
import BaseHeading from '../../BaseHeading';
import BaseMenu from '../../BaseMenu';
import TheSidebar from '../TheSidebar';
import computeClassNames from '../../../utils/compute-class-names';
import IconChevronDown from '../../../assets/images/svg/icon-chevron-down.svg';
import IconAddTaskMobile from '../../../assets/images/svg/icon-add-task-mobile.svg';
import './TheHeader.css';
import BoardItem from '../../BoardItem';

interface TheHeaderProps {
  onShowMenu?: (isVisible: boolean) => void;
}

function TheHeader({ onShowMenu }: TheHeaderProps) {
  const [showMenu, setShowMenu] = useState(true);

  const menuClassNames = computeClassNames({
    'the-header__menu--open': showMenu
  });

  useEffect(() => {
    onShowMenu?.(showMenu);
  }, [showMenu]);

  return (
    <header className="the-header">
      <div className={`the-header__menu ${menuClassNames}`}>
        <button className="menu-trigger" onClick={() => setShowMenu(!showMenu)}>
          <img
            className="menu-logo-mobile"
            src={LogoMobile}
            alt="Kanban App Logo"
            width={24}
            height={25}
            loading="lazy"
          />
          <img className="menu-logo" src={LogoDark} alt="Kanban App Logo" width={153} height={26} loading="lazy" />

          <BaseHeading variant="h1" size="lg" fontWeight="bold" className="menu-trigger__title">
            Platform Launch{' '}
            <img
              className="chevron-icon"
              src={IconChevronDown}
              alt="Chevron icon"
              loading="lazy"
              width={8}
              height={8}
            />
          </BaseHeading>
        </button>

        {showMenu && <TheSidebar onClose={() => setShowMenu(false)} />}

        {!showMenu && (
          <BoardItem
            className="sidebar-trigger"
            isActive
            onClick={() => setShowMenu(true)}
            iconSvg={
              <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
                  fill="#FFF"
                />
              </svg>
            }
          />
        )}
      </div>

      <div className="the-header__content">
        <BaseHeading variant="h1" size="xl" fontWeight="bold" className="head-title">
          The platform
        </BaseHeading>

        <div className="header-actions">
          <BaseButton className="header-actions__create-task">
            <img
              className="content-mobile"
              src={IconAddTaskMobile}
              alt="Icon add task"
              width={12}
              height={12}
              loading="lazy"
            />
            <span className="content-desktop">+ Add New Task</span>
          </BaseButton>
          <BaseMenu />
        </div>
      </div>
    </header>
  );
}

export default TheHeader;

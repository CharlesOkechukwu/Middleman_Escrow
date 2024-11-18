import React from 'react';

interface Props {
  icon: string;
}

const NavIcon: React.FC<Props> = ({ icon }) => {
  return (
    <span>
      {
        icon === 'home' ?
          (
            <svg width="18" height="18" viewBox="0 0 18 18">
              <use xlinkHref="/sprite.svg#home" />
            </svg>
          )
          : icon === 'pages' ?
            (
              <svg width="18" height="18" viewBox="0 0 18 18">
                <use xlinkHref="/sprite.svg#pages" />
              </svg>
            )
            : icon === 'acc-setup' ?
              (
                <svg width="21" height="21" viewBox="0 0 21 21">
                  <use xlinkHref="/sprite.svg#acc-setup" />
                </svg>
              )
              : icon === 'dispute' ?
                (
                  <svg width="23" height="20" viewBox="0 0 23 20">
                    <use xlinkHref="/sprite.svg#dispute" />
                  </svg>
                )
                :
                (
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <use xlinkHref="/sprite.svg#notification" />
                  </svg>
                )
      }
    </span>
  );
}

export default NavIcon;

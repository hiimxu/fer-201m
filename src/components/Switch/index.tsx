import React from 'react';
import classNames from 'classnames/bind';
import styles from './Switch.module.scss';

const cx = classNames.bind(styles);

export default function Switch() {
    const [darkMode, setDarkMode] = React.useState<boolean>(true);

    React.useEffect(() => {
        console.log(darkMode);
    }, [darkMode]);

    return (
        <div className={cx('container')}>
            <input
                type="checkbox"
                id="toggle-checkbox"
                className={cx('toggle-checkbox')}
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
            />
            <label htmlFor="toggle-checkbox" className={cx('toggle-wrapper')}>
                <div
                    className={cx('toggle-thumb')}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{
                            fontSize: 23,
                            color: '#fff',
                            display: darkMode ? 'none' : 'block',
                        }}
                    >
                        brightness_5
                    </span>

                    <span
                        className="material-symbols-outlined"
                        style={{
                            fontSize: 23,
                            display: !darkMode ? 'none' : 'block',
                        }}
                    >
                        dark_mode
                    </span>
                </div>

                <div className={cx('toggle-container')}>
                    <div className={cx('toggle-night')}></div>
                    <div className={cx('toggle-day')}></div>
                </div>
            </label>
        </div>
    );
}

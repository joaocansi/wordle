import asModal from '../Modal';
import styles from 'styles/components/modals/header/SettingsModal.module.scss';
import themes from 'styles/themes';
import { useThemes } from 'contexts/ThemesContext';
import { ChangeEvent } from 'react';

const SettingsModal = () => {
  const { theme, changeTheme } = useThemes();

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) =>
    changeTheme(event.target.value);

  return (
    <div className={styles.settingsModalContainer}>
      <h4>Settings</h4>
      <form>
        <div>
          <label htmlFor="theme">Theme</label>
          <select
            value={theme.name}
            onChange={handleThemeChange}
            name="theme"
            id="theme"
          >
            {Object.keys(themes).map((item) => {
              return (
                <option key={`select-theme-${item}`} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <hr />
        <div>
          <label htmlFor="theme">GITHUB</label>
          <a href="https://github.com/joaocansi">github.com/joaocansi</a>
        </div>
        <div>
          <label htmlFor="theme">LINKEDIN</label>
          <a href="https://www.linkedin.com/in/joaocansi/">
            linkedin.com/in/joaocansi/
          </a>
        </div>
      </form>
    </div>
  );
};

export default asModal(SettingsModal, {
  closeDocument: true,
  contentStyle: {
    background: 'var(--color-modal-content-background)',
    width: '600px',
    padding: '2rem',
  },
  overlayStyle: {
    background: 'var(--color-modal-overlay-background)',
  },
});

import { THEME_CHOICES, useTheme } from '../utils/theme';
import './ThemeSwitch.css';

const ThemeSwitch = ({ className = '' }: { className?: string }) => {
  const [choice, setChoice] = useTheme();
  return (
    <div className={`theme-switch ${className}`} role="radiogroup" aria-label="Thème">
      {THEME_CHOICES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={choice === value}
          className={`theme-switch__option ${choice === value ? 'theme-switch__option--active' : ''}`}
          onClick={() => setChoice(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitch;

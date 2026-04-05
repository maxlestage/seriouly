export const scrollToSection = (
  sectionId: string,
  pathname: string,
  navigate: (path: string) => void
) => {
  if (pathname === '/') {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  }
};

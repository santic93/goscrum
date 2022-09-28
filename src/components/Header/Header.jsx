import './Header.style.css';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('logged');
    navigate('/', { replace: true });
  };
  return (
    <header>
      <img
        src='https://cdn-1.webcatalog.io/catalog/gitscrum/gitscrum-icon-filled.png'
        alt='logo'
      />
      <span>Go Scrum</span>
      <div onClick={handleLogout}>X</div>
    </header>
  );
};
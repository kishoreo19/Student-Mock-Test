import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';
import logo from '../../assets/logo_new.jpg';
import { LayoutDashboard, Building2, Users, Briefcase, Lock, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'thejobsyncit@gmail.com' && password === 'Thejobsync@26') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.brandGroup} style={{ justifyContent: 'center', marginBottom: '2rem' }}>
            <img src={logo} alt="The JobSync" className={styles.logoImage} />
          </div>
          <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 800 }}>ADMIN LOGIN</h2>
          
          <form onSubmit={handleLogin} className={styles.loginForm}>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className={styles.input}
                placeholder="Enter admin email"
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className={styles.input}
                placeholder="Enter password"
                required 
              />
            </div>
            <button type="submit" className={styles.loginBtn}>
              <Lock size={18} /> Login to Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.brandGroup}>
          <img src={logo} alt="The JobSync" className={styles.logoImage} />
          <h2 className={styles.brand}>THE JOBSYNC</h2>
        </div>
        
        <nav className={styles.navMenu}>
          <Link 
            to="/admin" 
            className={`${styles.navItem} ${isActive('/admin') && location.pathname === '/admin' ? styles.active : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/admin/colleges" 
            className={`${styles.navItem} ${isActive('/admin/colleges') ? styles.active : ''}`}
          >
            <Building2 size={20} />
            <span>Colleges</span>
          </Link>
          <Link 
            to="/admin/candidates" 
            className={`${styles.navItem} ${isActive('/admin/candidates') ? styles.active : ''}`}
          >
            <Users size={20} />
            <span>All Candidates</span>
          </Link>
          <Link 
            to="/admin/positions" 
            className={`${styles.navItem} ${isActive('/admin/positions') ? styles.active : ''}`}
          >
            <Briefcase size={20} />
            <span>Positions</span>
          </Link>
          <button 
            onClick={handleLogout}
            className={styles.navItem} 
            style={{ marginTop: 'auto', background: 'transparent', cursor: 'pointer', color: 'var(--error)' }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

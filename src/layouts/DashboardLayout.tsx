import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Outlet, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme as useMuiTheme } from '@mui/material/styles';

// Styled Components
const LayoutContainer = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.isDarkMode ? '#121212' : '#F9FAFB'};
`;

interface SidebarProps {
  isOpen: boolean;
  isDarkMode?: boolean;
}

const Sidebar = styled.aside<SidebarProps>`
  width: ${props => props.isOpen ? '280px' : '90px'};
  background-color: ${props => props.isDarkMode ? '#1E1E1E' : '#1F2937'};
  color: #FFFFFF;
  transition: all 0.3s ease;
  padding: 1rem;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
`;

const Logo = styled.div<SidebarProps>`
  font-size: 1.5rem;
  font-weight: bold;
  display: ${props => props.isOpen ? 'block' : 'none'};
  color: #FFFFFF;
`;

const MainContent = styled.main<{ isDarkMode: boolean }>`
  flex: 1;
  background-color: ${props => props.isDarkMode ? '#121212' : '#F9FAFB'};
  color: ${props => props.isDarkMode ? '#FFFFFF' : '#1F2937'};
`;

const Header = styled.header<{ isDarkMode: boolean }>`
  background-color: ${props => props.isDarkMode ? '#1E1E1E' : '#FFFFFF'};
  height: 64px;
  color: ${props => props.isDarkMode ? '#FFFFFF' : '#1F2937'};
  padding: 4px 16px;
  box-shadow: 0 2px 4px ${props => props.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)<SidebarProps>`
  text-decoration: none;
  color: #FFFFFF;
  width: 100%;

  &.active {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: #D8284B;

    svg {
      color: #D8284B;
    }
  }
`;

const NavItem = styled.div<SidebarProps>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    margin-right: ${props => props.isOpen ? '1rem' : '0'};
    color: #FFFFFF;
    transition: color 0.2s ease;
  }

  span {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const UserActions = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;

  svg {
    cursor: pointer;
    font-size: 1.25rem;
    color: ${props => props.isDarkMode ? '#A0A0A0' : '#6B7280'};
    
    &:hover {
      color: ${props => props.isDarkMode ? '#FFFFFF' : '#1F2937'};
    }
  }
`;

const ContentWrapper = styled.div`
  padding: 2rem;
`;

interface NavItemType {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItemType[] = [
  { icon: <HomeIcon />, label: 'Dashboard', path: '/dashboard' },
  { icon: <PeopleIcon />, label: 'Employees', path: '/employees' },
  { icon: <EventIcon />, label: 'Leave Management', path: '/leave' },
  { icon: <SettingsIcon />, label: 'Settings', path: '/settings' },
];

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer isDarkMode={isDarkMode}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        style={{ 
          backgroundColor: muiTheme.palette.background.sidebar 
        }}
      >
        <SidebarHeader>
          <Logo isOpen={isSidebarOpen}>HR Manager</Logo>
          {isSidebarOpen ? (
            <CloseIcon onClick={toggleSidebar} sx={{ cursor: 'pointer' }} />
          ) : (
            <MenuIcon onClick={toggleSidebar} sx={{ cursor: 'pointer' }} />
          )}
        </SidebarHeader>
        
        {navItems.map((item, index) => (
          <StyledNavLink 
            key={index} 
            to={item.path}
            isOpen={isSidebarOpen}
          >
            <NavItem isOpen={isSidebarOpen}>
              {item.icon}
              <span>{item.label}</span>
            </NavItem>
          </StyledNavLink>
        ))}
      </Sidebar>

      <MainContent isDarkMode={isDarkMode}>
        <Header isDarkMode={isDarkMode}>
          <div>
            <h2 style={{margin: 0}}>Welcome back, Admin</h2>
          </div>
          <UserActions isDarkMode={isDarkMode}>
            <ThemeToggle />
            <NotificationsIcon />
            <AccountCircleIcon />
          </UserActions>
        </Header>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

export default DashboardLayout;

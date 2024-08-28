import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Admin',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/admin/dashboard',
  },
  {
    displayName: 'Users',
    iconName: 'Users',
    route: '/admin/users',
  },
  {
    displayName: 'Bank Account',
    iconName: 'user-plus',
    route: '/admin/bankaccount',
  },
  {
    displayName: 'Validate Credits',
    iconName: 'user-plus',
    route: '/admin/validatecredit',
  },
  {
    navCap: 'Banque',
  },
  {
    displayName: 'Compte',
    iconName: 'User',
    route: '/bank/compte',
  },

  {
    displayName: 'Virement',
    iconName: 'replace',
    route: '/bank/virement',
  },

  {
    displayName: 'Bourse',
    iconName: 'cash-banknote',
    route: '/bank/bourse',
  },
  {
    displayName: 'Simulateur de crédits',
    iconName: 'calculator',
    route: '/bank/credit',
  },
  {
    displayName: 'Demande de crédit',
    iconName: 'moneybag',
    route: '/bank/demande',
  },

  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  
];

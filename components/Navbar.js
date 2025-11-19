import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@heroui/react';
import { useRouter } from 'next/router';

export default function AppNavbar() {
  const router = useRouter();

  return (
    <Navbar 
      className="backdrop-blur-md bg-white/10 border-b border-white/20"
      maxWidth="full"
      isBordered
    >
      <NavbarBrand>
        <p className="font-bold text-white text-xl">🔮 Tarot Reader</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={router.pathname === '/reading'}>
          <Link 
            href="/reading"
            className={router.pathname === '/reading' ? 'text-white font-semibold' : 'text-white/80'}
          >
            Bói Tarot
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router.pathname === '/library'}>
          <Link 
            href="/library"
            className={router.pathname === '/library' ? 'text-white font-semibold' : 'text-white/80'}
          >
            Library Bài
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}


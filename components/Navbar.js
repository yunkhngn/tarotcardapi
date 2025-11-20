import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as HeroUILink } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { label: 'Bói bài tarot', href: '/reading', key: 'reading' },
  { label: 'Bài tarot', href: '/library', key: 'library' },
];

export default function AppNavbar() {
  const router = useRouter();

  return (
    <Navbar 
      className="bg-[#0b0a0a] border-b border-[#2a1f17] px-6"
      maxWidth="full"
    >
      <NavbarBrand>
        <Link 
          href="/" 
          className="font-playfair text-white text-2xl tracking-[0.2em] flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span>TAROT READER</span>
          <span className="text-[#d5a052] text-lg">✦</span>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden lg:flex gap-6" justify="center">
        {navLinks.map((link) => (
          <NavbarItem 
            key={link.key}
            isActive={router.pathname === link.href}
            className="font-mulish"
          >
            {link.disabled ? (
              <span className="navbar-link inactive">
                <span className="nav-star">✦</span>
                {link.label.toUpperCase()}
              </span>
            ) : (
              <HeroUILink 
                as={Link}
                href={link.href}
                className={
                  router.pathname === link.href 
                    ? 'navbar-link'
                    : 'navbar-link inactive hover:text-white'
                }
              >
                <span className="nav-star">✦</span>
                {link.label.toUpperCase()}
              </HeroUILink>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}


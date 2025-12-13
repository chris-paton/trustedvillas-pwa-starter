import { Home, Search, Map, Heart, User } from 'lucide-react';

export default function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 w-full bg-white dark:bg-navy-dark border-t flex justify-around py-2">
      <Home className="text-orange" />
      <Search />
      <Map />
      <Heart />
      <User />
    </nav>
  );
}
import type { SidebarNavItem } from '@/ts/types';

export function getNavItemsForPath(
  items: { [key: string]: SidebarNavItem[] },
  path: string,
) {
  if (items[path]) {
    return items[path];
  }

  let pathComponents = path.split('/');
  while (pathComponents.length > 1) {
    pathComponents.pop();
    const key = pathComponents.join('/');
    if (items[key]) {
      return items[key];
    }
  }

  return [];
}

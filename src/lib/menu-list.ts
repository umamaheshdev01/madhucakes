import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  Shirt,
  Pill,
  Pizza,
  Carrot,
  ShoppingCart,
  Cake
} from "lucide-react";

import CartIcon from '../components/demo/nice'

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Orders",
      menus: [
        {
          href: "/dashboard",
          label: "My Orders",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "/cart",
          label: "Cart",
          active: pathname.includes("/cart"),
          icon: ShoppingCart,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Products",
      menus: [
        {
          href: "/cakes",
          label: "Cakes",
          active: pathname.includes("/cakes"),
          icon: Cake,
          submenus: []
        }
      
        
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
      
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}

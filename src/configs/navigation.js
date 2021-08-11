import modulesMenu from "./menus/modules.menu";

export default {
  // main navigation - side menu
  menu: [
    {
      text: "",
      key: "",
      items: [
        {
          icon: "mdi-view-dashboard-outline",
          key: "menu.dashboard",
          text: "Dashboard",
          link: "/dashboard/analytics"
        }
      ]
    },
    {
      text: "Modules",
      key: "menu.modules",
      items: modulesMenu
    }
  ]

};

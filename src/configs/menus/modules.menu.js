import companySetup from "../menus/company.setup";
import masterFile from "../menus/master.file";
import preferences from "../menus/preferences";
export default [
  {
    icon: "mdi-domain",
    text: "Maintenance",
    key: "menu.maintenance",
    items: [
      {
        icon: "mdi-file-outline",
        key: "menu.blank",
        text: "Blank Page",
        link: "/blank"
      }
    ]
  },
  {
    icon: "mdi-dialpad",
    text: "Setup",
    key: "menu.setup",
    items: [
      { icon: "mdi-cube-outline", text: "Company Setup", items: companySetup },
      { icon: "mdi-cube-outline", text: "ؐMaster File", items: masterFile },
      { icon: "mdi-cube-outline", text: "Preferences", items: preferences },
      {
        icon: "mdi-cube-outline",
        text: "Associate Benefits",
        items: [
          {
            icon: "mdi-circle-medium",
            text: "Associate Benefits",
            link: "/setup/associate-benefits"
          }
        ]
      },
      {
        icon: "mdi-cube-outline",
        text: "Associate Evaluations",
        items: [
          {
            icon: "mdi-circle-medium",
            text: "Associate Evaluations",
            link: "/setup/associate-evaluation"
          }
        ]
      },
      {
        icon: "mdi-cube-outline",
        text: "Letter",
        items: [
          {
            icon: "mdi-circle-medium",
            text: "Letter",
            link: "/setup/letter/letter"
          }
        ]
      },
      {
        icon: "mdi-cube-outline",
        text: "Sms",
        items: [
          {
            icon: "mdi-circle-medium",
            text: "Sms",
            link: "/setup/sms/sms-letter"
          }
        ]
      }
    ]
  },
  {
    icon: "mdi-cash-usd-outline",
    text: "Payroll",
    key: "menu.payroll",
    items: [
      {
        icon: "mdi-file-outline",
        key: "menu.blank",
        text: "Blank Page",
        link: "/blank"
      }
    ]
  },
  {
    icon: "mdi-view-column-outline",
    text: "Issuance",
    key: "menu.issuance",
    items: [
      {
        icon: "mdi-file-outline",
        key: "menu.blank",
        text: "Blank Page",
        link: "/blank"
      }
    ]
  }
];

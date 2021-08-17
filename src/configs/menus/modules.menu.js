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
      { 
      icon: "mdi-cube-outline", 
      text: "Company Setup",
      key:"menu.companySetup", 
      items: companySetup
     },
      {
      icon: "mdi-cube-outline",
      text: "ؐMaster File",
      key:"menu.masterFile",
      items: masterFile 
      },
      { 
      icon: "mdi-cube-outline",
      text: "Preferences",
      key:"menu.preferences",
      items: preferences 
        },
      {
      icon: "mdi-cube-outline",
      text: "Associate Benefits",
      key:"menu.associateBenefits",
      items: [
          {
            icon: "mdi-shield-check",
            text: "Associate Benefits",
            key:"menu.associateBenefits",
            link: "/setup/associate-benefits"
          }
        ]
      },
      {
        icon: "mdi-circle-medium",
        text: "Associate Evaluations",
        key:"menu.associateEvaluations",
        items: [
          {
            icon: "mdi-text-box-check",
            text: "Associate Evaluations",
            key:"menu.associateEvaluations",
            link: "/setup/associate-evaluation"
          }
        ]
      },
      {
        icon: "mdi-cube-outline",
        text: "Letter",
        key:"menu.letter",
        items: [
          {
            icon: "mdi-email-newsletter",
            text: "Letter",
            key:"menu.letter",
            link: "/setup/letter/letter"
          }
        ]
      },
      {
        icon: "mdi-cube-outline",
        text: "Sms",
        key:"menu.sms",
        items: [
          {
            icon: "mdi-message-alert",
            text: "Sms",
            key:"menu.sms",
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

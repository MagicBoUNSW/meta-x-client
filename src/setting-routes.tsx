import Tables from "views/pages/user/tables/Tables";
import AlertsIcon from "components/Icons/AlertsIcon";

const dashRoutes = [
  {
    path: "/general",
    name: "General",
    icon: AlertsIcon,
    component: Tables,
    layout: "/setting"
  },
];
export default dashRoutes;

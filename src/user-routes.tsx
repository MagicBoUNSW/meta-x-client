import MocktestIcon from "components/Icons/MocktestIcon";
import Tables from "views/pages/user/tables/Tables";
import Score from "views/pages/user/score/Score";
import Result from "views/Result/Result";
import ChangePasswordPage from "views/pages/auth/ChangePasswordPage";
import ChangeNamePage from "views/pages/auth/ChangeNamePage";

let dashRoutes;
const method = window.localStorage.getItem("method")
if (method === "incognito") {
  dashRoutes = [
    {
      path: "/tables",
      name: "Dashboard",
      icon: MocktestIcon,
      component: Tables,
      layout: "/user",
    },
    {
      path: "/change-password",
      name: "Change password",
      icon: MocktestIcon,
      component: ChangePasswordPage,
      layout: "/user",
    },
    {
      path: "/change-name",
      name: "Change name",
      icon: MocktestIcon,
      component: ChangeNamePage,
      layout: "/user",
    },
    {
      path: "/score",
      name: "Score",
      icon: MocktestIcon,
      component: Score,
      layout: "/user",
      redirect: true,
    },
    {
      path: "/result",
      name: "Result",
      icon: MocktestIcon,
      component: Result,
      layout: "/user",
      redirect: true,
    },
  ];
} else {
  dashRoutes = [
    {
      path: "/tables",
      name: "Dashboard",
      icon: MocktestIcon,
      component: Tables,
      layout: "/user",
    },
    {
      path: "/change-name",
      name: "Change name",
      icon: MocktestIcon,
      component: ChangeNamePage,
      layout: "/user",
    },
    {
      path: "/score",
      name: "Score",
      icon: MocktestIcon,
      component: Score,
      layout: "/user",
      redirect: true,
    },
    {
      path: "/result",
      name: "Result",
      icon: MocktestIcon,
      component: Result,
      layout: "/user",
      redirect: true,
    },
  ];

}
export default dashRoutes;

import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

const ROOT_DASHBOARDS = "/dashboards";

const path = (root: string, item: string) => `${root}${item}`;

export const dashboards: NavigationTree = {
  ...baseNavigationObj["dashboards"],
  type: "root",
  childs: [
    {
      id: "dashboards.home",
      path: path(ROOT_DASHBOARDS, "/home"),
      type: "item",
      title: "Home",
      transKey: "nav.dashboards.home",
      icon: "dashboards.home",
    },
    {
      id: "dashboards.bgimage",
      path: path(ROOT_DASHBOARDS, "/bgimage"),
      type: "item",
      title: "Background Image",
      transKey: "nav.dashboards.bgimage",
      icon: "dashboards.bgimage",
    },
    {
      id: "dashboards.bgvideo",
      path: path(ROOT_DASHBOARDS, "/bgvideo"),
      type: "item",
      title: "Background Video",
      transKey: "nav.dashboards.bgvideo",
      icon: "dashboards.bgvideo",
    },
    {
      id: "dashboards.galeryjoel",
      path: path(ROOT_DASHBOARDS, "/galeryjoel"),
      type: "item",
      title: "Galety Joel",
      transKey: "nav.dashboards.galeryjoel",
      icon: "dashboards.galeryjoel",
    },
    {
      id: "dashboards.galeryetudiant",
      path: path(ROOT_DASHBOARDS, "/galeryetudiant"),
      type: "item",
      title: "Galety Joel",
      transKey: "nav.dashboards.galeryetudiant",
      icon: "dashboards.galeryetudiant",
    },
    {
      id: "dashboards.formation",
      path: path(ROOT_DASHBOARDS, "/formation"),
      type: "item",
      title: "Formation",
      transKey: "nav.dashboards.formation",
      icon: "dashboards.formation",
    },
    {
      id: "dashboards.shop",
      path: path(ROOT_DASHBOARDS, "/shop"),
      type: "item",
      title: "Boutique",
      transKey: "nav.dashboards.shop",
      icon: "dashboards.shop",
    },
    {
      id: "dashboards.apprenant",
      path: path(ROOT_DASHBOARDS, "/apprenant"),
      type: "item",
      title: "Apprenant",
      transKey: "nav.dashboards.apprenant",
      icon: "dashboards.apprenant",
    },
  ],
};

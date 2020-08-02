
import Login from "@pages/Login";
import PageNotFound from "@pages/PageNotFound";
import Dashboard from "@pages/user/Dashboard";
import ZoneList from "@pages/user/zone/List";
import ZoneControl from "@pages/user/zone/Control";
import ZoneCreate from "@pages/user/zone/Create";

import DnsrecordList from "@pages/user/dnsrecord/List";
import DnsrecordEdit from "@pages/user/dnsrecord/Edit";

export const mainRoutes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/404",
    component: PageNotFound
  }
];

export const userRoutes = [
  {
    path: "/user/dashboard",
    component: Dashboard,
    exact:true,
    title: "控制台",
  },
  {
    path: "/user/zones",
    component: ZoneList,
    exact:true,
    title: "域名管理",
  },
  {
    path: "/user/zone/control/:zone_id",
    component: ZoneControl,
    exact:true,
    title: "域名控制",
  },
  {
    path: "/user/zone/create",
    component: ZoneCreate,
    exact:true,
    title: "域名添加",
  },
  {
    path: "/user/zone/:zone_id/dnsrecord",
    component: DnsrecordList,
    exact:true,
    title: "DNS记录管理",
  },
  {
    path: "/user/zone/:zone_id/dnsrecord/:dns_record_id/edit",
    component: DnsrecordEdit,
    exact:true,
    title: "DNS记录修改",
  },
  {
    path: "/user/zone/:zone_id/dnsrecord/create",
    component: DnsrecordEdit,
    title: "DNS记录添加",
    exact:true,
  }
];
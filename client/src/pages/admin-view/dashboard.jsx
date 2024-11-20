import { DashboardBarChart } from "@/components/admin-view/admin-dashboard/dashboard-bar-chart";
import { DashboardLineChart } from "@/components/admin-view/admin-dashboard/dashboard-line-chart";
import { AdminHeader } from "@/components/admin-view/header";
import { ChartBarStacked, Package, Star, User } from "lucide-react";

const data = [
  {
    title: "Total Users",
    icon: <User className="h-5 w-5 mx-auto" />,
    totalData: 400,
    newData: 140,
  },
  {
    title: "Total Products",
    icon: <Package className="h-5 w-5 mx-auto" />,
    totalData: 1000,
    newData: 140,
  },
  {
    title: "Total Brand",
    icon: <Star className="h-5 w-5 mx-auto" />,
    totalData: 10,
    newData: 2,
  },
  {
    title: "Total Categories",
    icon: <ChartBarStacked className="h-5 w-5 mx-auto" />,
    totalData: 8,
    newData: 3,
  },
];

export const AdminDashboard = () => {
  const getLabel = (title) => {
    switch (title) {
      case "Total Users":
        return "Users";
      case "Total Products":
        return "Products";
      case "Total Brand":
        return "Brands";
      case "Total Category":
        return "Categories";
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AdminHeader />
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <div key={index} className="p-2 border rounded-lg">
                    <div className="flex flex-row">
                      <div className="flex flex-col w-full ">
                        <p className="font-medium text-lg ">{item.title}</p>
                        <p className="">
                          {item.totalData} {getLabel(item.title)}
                        </p>
                      </div>
                      <div className="w-full items-center text-center m-auto">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      {item.newData} new {getLabel(item.title).toLowerCase()}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DashboardBarChart />
          <DashboardLineChart />
        </div>
      </div>
    </div>
  );
};

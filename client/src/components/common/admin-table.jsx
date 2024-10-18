import { File, ListFilter, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dayjs from "dayjs";
export const AdminTable = ({
  isProduct,
  buttonText,
  titleText,
  handleOpenAdd,
  itemsList,
  setCurrentEditedId,
  setIsOpenSheet,
  setIsOpenAlert,
  handleDelete,
  handleEdit,
  totalItems,
  currentPage,
  itemsPerPage,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button
              onClick={() => handleOpenAdd()}
              size="sm"
              className="h-8 gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {buttonText}
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>{titleText}</CardTitle>
              <CardDescription>
                Manage your {titleText.toLowerCase()} and view their sales
                performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className={isProduct ? "" : "hidden"}>Price</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className={isProduct ? "" : "hidden"}>Total Products</TableHead>
                    <TableHead className={isProduct ? "" : "hidden"}>Brand Name</TableHead>
                    <TableHead className={isProduct ? "" : "hidden"}>Category Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemsList && itemsList.length > 0
                    ? itemsList.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell className={`font-medium ${isProduct ? "" : "hidden"}`}>
                              {item.price}
                            </TableCell>
                            <TableCell className="w-2/4">
                              {item.description}
                            </TableCell>
                            <TableCell className={`font-medium ${isProduct ? "" : "hidden"}`}>
                              {item.total}
                            </TableCell>
                            <TableCell className={`font-medium ${isProduct ? "" : "hidden"}`}>
                              {item.brandName}
                            </TableCell>
                            <TableCell className={`font-medium ${isProduct ? "" : "hidden"}`}>
                              {item.categoryName}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.status}</Badge>
                            </TableCell>
                            <TableCell>
                              {dayjs(item.createdAt).format("HH:mm DD-MM-YYYY")}
                            </TableCell>
                            <TableCell className="flex gap-2">
                              <Button
                                onClick={() => {
                                  handleEdit(item);
                                  setCurrentEditedId(item._id);
                                  setIsOpenSheet(true);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => {
                                  handleDelete(item);
                                  setIsOpenAlert(true);
                                }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing{" "}
                <strong>
                  {startItem}-{endItem}
                </strong>{" "}
                of <strong>{totalItems}</strong> {titleText.toLowerCase()}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

import { AdminHeader } from "@/components/admin-view/header";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";

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
  DropdownMenuItem,
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteBrand,
  getBrands,
  postNewBrand,
} from "@/store/admin-slice/brands-slice";
import dayjs from "dayjs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CommonForm } from "@/components/common/form";
import { addBrandFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";

const initialFormdata = {
  name: "",
  description: "",
};

export const AdminBrand = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { brandList } = useSelector((state) => state.adminBrands);

  const [isOpenAddBrand, setIsOpenAddBrand] = useState(false);
  const [formData, setFormData] = useState(initialFormdata);

  const handleOpenAddBrand = () => {
    setIsOpenAddBrand(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(postNewBrand(formData)).then((data) => {
      console.log("Data", data);

      if (data?.payload?.success) {
        toast({ title: data.payload.message });
        setIsOpenAddBrand(false);
        dispatch(getBrands());
      } else {
        toast({ title: data.payload.message, variant: "destructive" });
      }
    });
  };

  const handleDeleteBrand = (brandId) => {
    dispatch(deleteBrand(brandId)).then((data) => {
      if (data.payload.success) {
        toast({
          title: data.payload.message,
        });
        dispatch(getBrands());
      }
    });
  };

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AdminHeader />
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
                onClick={() => handleOpenAddBrand()}
                size="sm"
                className="h-8 gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Brand
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Brands</CardTitle>
                <CardDescription>
                  Manage your brands and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brandList && brandList.length > 0
                      ? brandList.map((brandItem, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {brandItem.name}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {brandItem.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="w-2/4">
                                {brandItem.description}
                              </TableCell>
                              <TableCell>
                                {dayjs(brandItem.createdAt).format(
                                  "HH:mm DD-MM-YYYY"
                                )}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">
                                        Toggle menu
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleDeleteBrand(brandItem._id)
                                      }
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
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
                  Showing <strong>1-{brandList.length}</strong> of{" "}
                  <strong>{brandList.length}</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Sheet open={isOpenAddBrand} onOpenChange={setIsOpenAddBrand}>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Brand</SheetTitle>
            <SheetDescription></SheetDescription>
            <CommonForm
              hideChangeAndResetPassword={true}
              formControls={addBrandFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Add New Brand"}
              onSubmit={onSubmit}
              isBtnDisabled={false}
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

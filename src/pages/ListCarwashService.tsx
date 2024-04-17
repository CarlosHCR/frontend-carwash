import React, { useState, useEffect } from "react";
import { getCarwashServicesAll } from "services/carwashService.service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Grid,
} from "@mui/material";
import { formatToBRL } from "utils";
import { formatDateAndTime } from "utils/Formats";
import { getListServiceResponse } from "validations/messages/CarWash/CarWashErros";

interface ServiceType {
  id: number;
  vehicle_license_plate: {
    id: number;
    number: string;
  };
  service_type: {
    id: number;
    name: string;
    price: number;
  };
  service_date: string;
  notes?: string;
  registered_by: number;
  price: number;
}

const ListCarwashService = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [editService, setEditService] = useState<ServiceType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getCarwashServicesAll();
        setServices(response);
      } catch (error) {
        setError(getListServiceResponse(error));
      }
    };
    fetchServices();
  }, []);

  const handleEditClick = (service: ServiceType) => {
    setEditService(service);
    setOpenModal(true);
  };

  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: {
    target: { value: string | number };
  }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 return (
   <Grid
     container
     justifyContent="center"
     alignItems="center"
     style={{ padding: 20 }}
   >
     <Grid
       item
       xs={12}
       sm={10}
       md={8}
       sx={{
         margin: "auto",
         padding: "20px",
         border: "1px solid #f2f2f2",
         borderRadius: "10px",
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         justifyContent: "center",
       }}
     >
       <TableContainer>
         <Table>
           <TableHead>
             <TableRow>
               <TableCell>Vehicle License Plate</TableCell>
               <TableCell>Service Type</TableCell>
               <TableCell>Price</TableCell>
               <TableCell>Service Date</TableCell>
               <TableCell>Notes</TableCell>
               <TableCell>Actions</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {services
               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map((service, index) => (
                 <TableRow
                   key={service.id}
                   sx={{
                     backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                   }}
                 >
                   <TableCell>{service.vehicle_license_plate.number}</TableCell>
                   <TableCell>
                     {service.service_type
                       ? service.service_type.name
                       : "Unknown"}
                   </TableCell>
                   <TableCell>
                     { formatToBRL(service.price)}
                   </TableCell>
                   <TableCell>
                     {formatDateAndTime(service.service_date)}
                   </TableCell>
                   <TableCell>{service.notes || "N/A"}</TableCell>
                   <TableCell>
                     <Button
                       size="small"
                       onClick={() => handleEditClick(service)}
                     >
                       Edit
                     </Button>
                   </TableCell>
                 </TableRow>
               ))}
           </TableBody>
         </Table>
       </TableContainer>
       <TablePagination
         rowsPerPageOptions={[5, 10, 25]}
         component="div"
         count={services.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
         sx={{
           maxWidth: "100%", // Garante que a paginação se ajuste à largura da tela
         }}
       />
     </Grid>
   </Grid>
 );
};

export default ListCarwashService;

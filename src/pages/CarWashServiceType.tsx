import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  CircularProgress,
  Grid,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Formik, Form } from "formik";
import InputField from "components/CarWash/Fields/InputField";
import { CarwashServiceTypeFormValidationSchema } from "validations/forms/CarWash";
import {
  getAllServiceTypes,
  setServiceType,
  updateServiceType,
} from "services/carwashService.service";
import { ErrorModal, SuccessModal } from "components/Dialog/";
import { SERVICE_TYPE_SUCCESSFULLY_CREATE } from "validations/messages/CarWash";
import PriceInputWithButtons from "components/CarWash/Fields/PriceInputWithButtons";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteServiceTypeModal } from "components/CarWash/Dialog/DeleteServiceTypeDialog";

interface CarwashServiceSericeTypeForm {
  id?: number | undefined;
  name: string;
  price: number;
}

const initialValues: CarwashServiceSericeTypeForm = {
  id: undefined,
  name: "",
  price: 0,
};

const CarwashServiceSericeType: React.FC = () => {
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [editingItem, setEditingItem] =
    useState<null | CarwashServiceSericeTypeForm>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceTypeIdToDelete, setServiceTypeIdToDelete] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllServiceTypes();
        setServiceTypes(result);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (
    values: CarwashServiceSericeTypeForm,
    actions: { resetForm: () => void; setSubmitting: (arg0: boolean) => void }
  ) => {
    try {
      if (editingItem) {
        const updatedServiceType = await updateServiceType(
          values.id || 0,
          values.name,
          values.price
        );
        setServiceTypes(
          serviceTypes.map((item) =>
            item.id === updatedServiceType.id ? updatedServiceType : item
          )
        );
        setEditingItem(null);
      } else {
        const newServiceType = await setServiceType(values.name, values.price);
        setServiceTypes([...serviceTypes, newServiceType]);
      }
      setSuccess(SERVICE_TYPE_SUCCESSFULLY_CREATE);
      actions.resetForm();
    } catch (error: any) {
      if (editingItem) {
        setError("Erro ao atualizar tipo de serviço");
      } else {
        setError("Erro ao cadastrar tipo de serviço");
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleEdit = (item: CarwashServiceSericeTypeForm) => {
    setEditingItem(item);
  };

  const openDeleteModal = (serviceTypeId: number) => {
    setServiceTypeIdToDelete(serviceTypeId);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = async (error: any = null) => {
    if (error) {
      setError("Erro ao deletar tipo de serviço: ");
    } else {
      if (serviceTypeIdToDelete !== null) {
        const updatedServiceTypes = serviceTypes.filter(
          (serviceType) => serviceType.id !== serviceTypeIdToDelete
        );
        setServiceTypes(updatedServiceTypes);
        setSuccess("Tipo de serviço deletado com sucesso");
      }
    }
    setDeleteModalOpen(false);
    setServiceTypeIdToDelete(null);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ padding: "10px" }}
    >
      <Paper
        style={{
          padding: "20px",
          maxWidth: "500px",
          width: "100%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Tipo de Serviço
        </Typography>
        <Typography variant="body2" gutterBottom>
          Preencha os campos abaixo para cadastrar tipo de serviço novo.
        </Typography>

        <Formik
          initialValues={editingItem || initialValues}
          validationSchema={CarwashServiceTypeFormValidationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="name" label="Nome" type="text" />
              <PriceInputWithButtons name="price" label="Preço" type="text" />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
              >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "20px",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #f2f2f2",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceTypes.map((row, index: number) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleEdit(row)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => openDeleteModal(row.id)}>
                    <DeleteIcon style={{ cursor: "pointer", color: "red" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {success && (
        <SuccessModal message={success} onClose={() => setSuccess(null)} />
      )}
      {error && (
        <ErrorModal
          onClose={() => {
            setError(null);
          }}
          errorMessage={error}
        />
      )}
      {deleteModalOpen && serviceTypeIdToDelete && (
        <DeleteServiceTypeModal
          onClose={handleCloseDeleteModal}
          ServiceTypeId={serviceTypeIdToDelete}
        />
      )}
    </Grid>
  );
};

export default CarwashServiceSericeType;

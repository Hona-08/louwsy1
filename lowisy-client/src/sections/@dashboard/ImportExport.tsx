import React, { useState, ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { importCategoriesData, importSubCategoriesData } from 'src/api/categories';
import { importProductsData } from 'src/api/products';
import { useRouter } from 'next/router';
import useAuth from 'src/hooks/useAuth';

const FileImportExport = ({ refetch, results }: any) => {
  const { pathname, query } = useRouter();
  const { categoryname } = query;
  const isProductList = pathname.includes('products');
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const onImportClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv, .xlsx';
    fileInput.addEventListener('change', handleFileSelection as any, false);
    fileInput.click();
  };

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Set drop message
      // Open the confirmation dialog
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const importCategoriesMutation = useMutation((data: FormData) => importCategoriesData(data), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      refetch();
    },
    onError(err: any) {
      enqueueSnackbar(
        err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
      );
    },
  });

  const importSubCategoriesMutation = useMutation(
    (data: FormData) => importSubCategoriesData(data, categoryname as string),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        refetch();
      },
      onError(err: any) {
        enqueueSnackbar(
          err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
        );
      },
    }
  );

  const importProductsMutation = useMutation((data: FormData) => importProductsData(data), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      refetch();
    },
    onError(err: any) {
      enqueueSnackbar(
        err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
      );
    },
  });

  const handleConfirmImport = () => {
    console.log({ selectedFile });
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
      isProductList
        ? importProductsMutation.mutate(formData)
        : categoryname
        ? importSubCategoriesMutation.mutate(formData)
        : importCategoriesMutation.mutate(formData);
    }

    // Close the dialog
    setOpenDialog(false);
  };

  const handleCancelSelection = () => {
    setSelectedFile(null);
    setOpenDialog(false);
  };

  const exportCsv = () => {
    // Example: Convert the CSV data back to a CSV file
    const csvContent = Papa.unparse(results, {
      columns: isProductList ? ['name', 'shortDescription', 'price'] : ['name', 'description'],
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'exported-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={dropzoneStyle}
      >
        <p>{dropMessage}</p>
        {selectedFile && (
          <IconButton
            color="secondary"
            onClick={handleCancelSelection}
            style={cancelButtonStyle}
          >
            <CloseIcon />
          </IconButton>
        )}
      </div> */}
      <div style={buttonContainerStyle}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<CloudUploadIcon />}
          onClick={onImportClick}
          style={buttonStyle}
        >
          Import
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<CloudDownloadIcon />}
          onClick={exportCsv}
          style={buttonStyle}
        >
          Export
        </Button>
      </div>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Import</DialogTitle>
        <DialogContent>
          Are you sure you want to import the file: {selectedFile?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSelection} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmImport} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyle: React.CSSProperties = {
  margin: '0 8px', // Adjust the margin as needed
};

export default FileImportExport;

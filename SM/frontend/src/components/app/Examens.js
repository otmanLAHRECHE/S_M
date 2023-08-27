import * as React from 'react';
import { useTheme, styled  } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import dayjs from 'dayjs';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alt from '../layouts/alert';
import ExamenItemsList from './Tests';
import { getAllExamenOfYear, addNewExemen, updateExemen, deleteExemen, getSelectedExemen } from '../../actions/examenActions'

import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PrintIcon from '@mui/icons-material/Print';
import InputLabel from '@mui/material/InputLabel';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


  const columns = [
    { field: 'id', headerName: 'Id', width: 60, hide: true },
    { field: 'no_registre', headerName: "No D'ENR", width: 80},
    { field: 'name', headerName: "NOM", width: 100},
    { field: 'prenom', headerName: "PRENOM", width: 100},
    { field: 'patient_genre', headerName: "GENRE", width: 100},
    { field: 'date_naissance', headerName: "DATE DE NAISSANCE", width: 160, hide: true},
    { field: 'date_test', headerName: "DATE DE EXAMEN", width: 160 },
    { field: 'observation', headerName: "OBSERVATION", width: 160, hide: true},
    { field: 'tes_exm', headerName: "LES TESTES D'EXAMEN", width: 250 , renderCell: (params) => (
      <ExamenItemsList teste1={params.row.HIV_test} teste2={params.row.HBS_test} teste3={params.row.HCV_test} teste4={params.row.BW_test} teste5={params.row.TOXOPLASME_test} teste6={params.row.RUBIOLE_test}/>
    ),

   },
  ];
  const theme = useTheme

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/otmanLAHRECHE">
          EPSP Serologie
        </Link>{' '}
        -- created by otman LAHRECHE
        {'.'}
      </Typography>
    );
  }


  export default function Examens(){

    
    const navigate = useNavigate();

    const [enrgNbrError, setEnrgNbrError] = React.useState([false, ""]);
    const [enrgNbr, setEnrgNbr] = React.useState("");
    const [name, setName] = React.useState("");
    const [nameError, setNameError] = React.useState([false, ""]);
    const [prenom, setPrenom] = React.useState("");
    const [prenomError, setPrenomError] = React.useState([false, ""]);
    const [genre, setGenre] = React.useState(null);
    const [genreError, setGenreError] = React.useState([false, ""]);
    const [dateNaissance, setDateNaissance] = React.useState("");
    const [dateNaissanceError, setDateNaissanceError] = React.useState([false, ""]);
    const [dateTest, setDateTest] = React.useState("");
    const [dateTestError, setDateTestError] = React.useState([false, ""]);
    const [HIVTest, setHIVTest] = React.useState(null);
    const [HIVTestError, setHIVTestError] = React.useState([false, ""]);
    const [HBSTest, setHBSTest] = React.useState(null);
    const [HBSTestError, setHBSTestError] = React.useState([false, ""]);
    const [HCVTest, setHCVTest] = React.useState(null);
    const [HCVTestError, setHCVTestError] = React.useState([false, ""]);
    const [BWTest, setBWTest] = React.useState(null);
    const [BWTestError, setBWTestError] = React.useState([false, ""]);
    const [TOXOPLASMETest, setTOXOPLASMETest] = React.useState(null);
    const [TOXOPLASMETestError, setTOXOPLASMETestError] = React.useState([false, ""]);
    const [RUBIOLETest, setRUBIOLETest] = React.useState(null);
    const [RUBIOLETestError, setRUBIOLETestError] = React.useState([false, ""]);
    const [observation, setObservation] = React.useState(null);
    const [observationError, setObservationError] = React.useState([false, ""]);
    

    
    const [dateFilter, setDateFilter] = React.useState(dayjs());
    const [dateFilterNotErr, setDateFilterNotErr] = React.useState(false);
    const [dateFilterError, setDateFilterError] = React.useState("");

    const [data, setData] = React.useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [rowData, setRowData] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    
    const [genreValue, setGenreValue] = React.useState();
    const [HIVValue, setHIVValue] = React.useState();
    const [HBSValue, setHBSValue] = React.useState();
    const [HCVValue, setHCVValue] = React.useState();
    const [BWValue, setBWValue] = React.useState();
    const [TOXOPLASMEValue, setTOXOPLASMEValue] = React.useState();
    const [RUBIOLEValue, setRUBIOLEValue] = React.useState();

    const handleChangeFilterDate = (newValue) =>{
        setDateFilter(newValue);
      };

      const handleChangeDateNaissance = (newValue) =>{
        setDateNaissance(newValue);
      };

      const handleChangeDateTest = (newValue) =>{
        setDateTest(newValue);
      };

      const changeGenre = (event) => {
        if (event.target.value == 1){
          setGenre("Homme");
          setGenreValue(1);

        }else if (event.target.value == 2){
          setGenre("Femme");
          setGenreValue(2);
        }
    };

    const changeTest1 = (event) => {
      if (event.target.value == 0){
        setHIVTest("no");
        setHIVValue(0);
      }
      else if (event.target.value == 1){
        setHIVTest("p");
        setHIVValue(1);
      }else if (event.target.value == 2){
        setHIVTest("n");
        setHIVValue(2);
      }
  };

  const changeTest2 = (event) => {
    if (event.target.value == 0){
      setHBSTest("no");
      setHBSValue(0);
    }
    else if (event.target.value == 1){
      setHBSTest("p");
      setHBSValue(1);
    }else if (event.target.value == 2){
      setHBSTest("n");
      setHBSValue(2);
    }
};

const changeTest3 = (event) => {
  if (event.target.value == 0){
    setHCVTest("no");
    setHCVValue(0);
  }
  else if (event.target.value == 1){
    setHCVTest("p");
    setHCVValue(1);
  }else if (event.target.value == 2){
    setHCVTest("n");
    setHCVValue(2);
  }
};

const changeTest4 = (event) => {
  if (event.target.value == 0){
    setBWTest("no");
    setBWValue(0);
  }
  else if (event.target.value == 1){
    setBWTest("p");
    setBWValue(1);
  }else if (event.target.value == 2){
    setBWTest("n");
    setBWValue(2);
  }
};

const changeTest5 = (event) => {
  if (event.target.value == 0){
    setTOXOPLASMETest("no");
    setTOXOPLASMEValue(0);
  }
  else if (event.target.value == 1){
    setTOXOPLASMETest("p");
    setTOXOPLASMEValue(1);
  }else if (event.target.value == 2){
    setTOXOPLASMETest("n");
    setTOXOPLASMEValue(2);
  }
};

const changeTest6 = (event) => {
  if (event.target.value == 0){
    setRUBIOLETest("no");
    setRUBIOLEValue(0);
  }
  else if (event.target.value == 1){
    setRUBIOLETest("p");
    setRUBIOLEValue(1);
  }else if (event.target.value == 2){
    setRUBIOLETest("n");
    setRUBIOLEValue(2);
  }
};

      const addExamenOpen = () =>{
        setOpen(true);
        setName("");
        setPrenom("");
        setEnrgNbr("");
        setGenre(null);
        setDateNaissance("");
        setDateTest("");
        setHIVTest(null);
        setHBSTest(null);
        setHCVTest(null);
        setBWTest(null);
        setTOXOPLASMETest(null);
        setRUBIOLETest(null);
        setObservation("");

        setNameError([false, ""]);
        setPrenomError([false, ""]);
        setEnrgNbrError([false, ""]);
        setGenreError([false, ""]);
        setDateNaissanceError([false, ""]);
        setDateTestError([false, ""]);
        setHIVTestError([false, ""]);
        setHBSTestError([false, ""]);
        setHCVTestError([false, ""]);
        setBWTestError([false, ""]);
        setTOXOPLASMETestError([false, ""]);
        setRUBIOLETestError([false, ""]);
        setObservationError([false, ""]);

      };

      const editExamenOpen = async() =>{
        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{
        setName("");
        setPrenom("");
        setEnrgNbr("");
        setGenre(null);
        setDateNaissance("");
        setDateTest("");
        setHIVTest(null);
        setHBSTest(null);
        setHCVTest(null);
        setBWTest(null);
        setTOXOPLASMETest(null);
        setRUBIOLETest(null);
        setObservation("");

        setGenreValue("");
        setHIVValue("");
        setHCVValue("");
        setHBSValue("");
        setBWValue("");
        setTOXOPLASMEValue("");
        setRUBIOLEValue("");

        setNameError([false, ""]);
        setPrenomError([false, ""]);
        setEnrgNbrError([false, ""]);
        setGenreError([false, ""]);
        setDateNaissanceError([false, ""]);
        setDateTestError([false, ""]);
        setHIVTestError([false, ""]);
        setHBSTestError([false, ""]);
        setHCVTestError([false, ""]);
        setBWTestError([false, ""]);
        setTOXOPLASMETestError([false, ""]);
        setRUBIOLETestError([false, ""]);
        setObservationError([false, ""]);

        const token = localStorage.getItem("auth_token");

        setRowData(await getSelectedExemen(token, selectionModel[0])); 

        }

      };

      const editExamenSave = async() =>{

        var test = true;

        if(enrgNbr == "" || enrgNbr == 0){
          test = false;
          setEnrgNbrError([true, "erreur sur ce champ"]);
        }
        if(name =="" || name == null){
          test = false;
          setNameError([true, "champ est obligatoire"]);
        }

        if(prenom =="" || prenom == null){
          test = false;
          setPrenomError([true, "champ est obligatoire"]);
        }

        if(genre == "" || genre ==null){
          test = false;
          setGenreError([true, "champ est obligatoire"]);
        }

        if(dateNaissance == null || dateNaissance == ""){
          test = false;
          setDateNaissanceError([true, "champ est obligatoire"]);
        }else if(dateNaissance.isValid() == false){
          test = false;
          setDateNaissanceError([true, "date n est pas valide"]);
        }

        if(dateTest == null || dateTest == ""){
          test = false;
          setDateTestError([true, "champ est obligatoire"]);
        }else if(dateTest.isValid() == false){
          test = false;
          setDateTestError([true, "date n est pas valide"]);
        }

        if(HIVTest == "" || HIVTest == null){
          test = false;
          setHIVTestError([true, "champ est obligatoire"]);
        }
        if(HBSTest == "" || HBSTest == null){
          test = false;
          setHBSTestError([true, "champ est obligatoire"]);
        }
        if(HCVTest == "" || HCVTest == null){
          test = false;
          setHCVTestError([true, "champ est obligatoire"]);
        }
        if(BWTest == "" || BWTest == null){
          test = false;
          setBWTestError([true, "champ est obligatoire"]);
        }
        if(TOXOPLASMETest == "" || TOXOPLASMETest == null){
          test = false;
          setTOXOPLASMETestError([true, "champ est obligatoire"]);
        }
        if(RUBIOLETest == "" || RUBIOLETest == null){
          test = false;
          setRUBIOLETestError([true, "champ est obligatoire"]);
        }

        if(test){
          var mTest = dateTest.get('month')+1;
          const dTest = dateTest.get('date') +"/"+ mTest +"/"+dateTest.get('year');

          var mNaissance = dateNaissance.get('month')+1;
          const dNaissance = dateNaissance.get('date') +"/"+ mNaissance +"/"+dateNaissance.get('year');

          const data = {
            "no_registre": Number(enrgNbr),
            "name": name,
            "prenom": prenom,
            "patient_genre": genre,
            "date_naissance": dNaissance,
            "date_test": dTest,
            "HIV_test": HIVTest,
            "HBS_test": HBSTest,
            "HCV_test": HCVTest,
            "BW_test": BWTest,
            "TOXOPLASME_test": TOXOPLASMETest,
            "RUBIOLE_test": RUBIOLETest,
            "observation": observation,
          }

          const token = localStorage.getItem("auth_token");

          setResponse(await updateExemen(token, JSON.stringify(data), rowData.id))

        }else{
          console.log("error");
          setLoadError(true);
        }



      }

      const addExamenClose = () =>{
        setOpen(false);
      };

      const editExamenClose = () =>{
        setOpenUpdate(false);
      };

      const addExamenSave = async() =>{
        var test = true;

        if(enrgNbr == "" || enrgNbr == 0){
          test = false;
          setEnrgNbrError([true, "erreur sur ce champ"]);
        }
        if(name =="" || name == null){
          test = false;
          setNameError([true, "champ est obligatoire"]);
        }

        if(prenom =="" || prenom == null){
          test = false;
          setPrenomError([true, "champ est obligatoire"]);
        }

        if(genre == "" || genre ==null){
          test = false;
          setGenreError([true, "champ est obligatoire"]);
        }

        if(dateNaissance == null || dateNaissance == ""){
          test = false;
          setDateNaissanceError([true, "champ est obligatoire"]);
        }else if(dateNaissance.isValid() == false){
          test = false;
          setDateNaissanceError([true, "date n est pas valide"]);
        }

        if(dateTest == null || dateTest == ""){
          test = false;
          setDateTestError([true, "champ est obligatoire"]);
        }else if(dateTest.isValid() == false){
          test = false;
          setDateTestError([true, "date n est pas valide"]);
        }

        if(HIVTest == "" || HIVTest == null){
          test = false;
          setHIVTestError([true, "champ est obligatoire"]);
        }
        if(HBSTest == "" || HBSTest == null){
          test = false;
          setHBSTestError([true, "champ est obligatoire"]);
        }
        if(HCVTest == "" || HCVTest == null){
          test = false;
          setHCVTestError([true, "champ est obligatoire"]);
        }
        if(BWTest == "" || BWTest == null){
          test = false;
          setBWTestError([true, "champ est obligatoire"]);
        }
        if(TOXOPLASMETest == "" || TOXOPLASMETest == null){
          test = false;
          setTOXOPLASMETestError([true, "champ est obligatoire"]);
        }
        if(RUBIOLETest == "" || RUBIOLETest == null){
          test = false;
          setRUBIOLETestError([true, "champ est obligatoire"]);
        }

        if(test){
          var mTest = dateTest.get('month')+1;
          const dTest = dateTest.get('date') +"/"+ mTest +"/"+dateTest.get('year');

          var mNaissance = dateNaissance.get('month')+1;
          const dNaissance = dateNaissance.get('date') +"/"+ mNaissance +"/"+dateNaissance.get('year');

          const data = {
            "no_registre": Number(enrgNbr),
            "name": name,
            "prenom": prenom,
            "patient_genre": genre,
            "date_naissance": dNaissance,
            "date_test": dTest,
            "HIV_test": HIVTest,
            "HBS_test": HBSTest,
            "HCV_test": HCVTest,
            "BW_test": BWTest,
            "TOXOPLASME_test": TOXOPLASMETest,
            "RUBIOLE_test": RUBIOLETest,
            "observation": observation,
          }

          const token = localStorage.getItem("auth_token");

          setResponse(await addNewExemen(token, JSON.stringify(data)))

        }else{
          console.log("error");
          setLoadError(true);
        }



      };

      const deleteExamenOpen = () =>{
        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{   
          setOpenDelete(true);
        }
      };

      const deleteExamenClose = () =>{
        setOpenDelete(false);
      };

      const deleteConfirmation = async () =>{
        setOpenDelete(false);
        const token = localStorage.getItem("auth_token");
        setResponse(await deleteExemen(token, selectionModel[0])); 
      }

      const printResult = () =>{

        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{   
          navigate("/bon_examen",{
            state: {
              id: selectionModel[0]
            }
          });
        }
        
      }

      React.useEffect(() => {
        console.log(rowData);
        try{
          
          if (rowData == "no data"){
            setResponseErrorSignal(true);
          } else if(rowData != "") {

          setOpenUpdate(true);

          setName(rowData.name);
          setPrenom(rowData.prenom);
          setEnrgNbr(rowData.no_registre);
          setGenre(rowData.patient_genre);
          if(rowData.patient_genre == "Homme"){
            setGenreValue(1);
          }else{
            setGenreValue(2);
          }
          setDateNaissance(dayjs(rowData.date_naissance, 'YYYY-MM-DD'));
          setDateTest(dayjs(rowData.date_test, 'YYYY-MM-DD'));
          setHIVTest(rowData.HIV_test);
          if(rowData.HIV_test == "no"){
              setHIVValue(0);
          }else if(rowData.HIV_test == "p"){
            setHIVValue(1);
          }else{
            setHIVValue(2);
          }
          setHBSTest(rowData.HBS_test);
          if(rowData.HBS_test == "no"){
              setHBSValue(0);
          }else if(rowData.HBS_test == "p"){
            setHBSValue(1);
          }else{
            setHBSValue(2);
          }

          setHCVTest(rowData.HCV_test);
          if(rowData.HCV_test == "no"){
            setHCVValue(0);
          }else if(rowData.HCV_test == "p"){
            setHCVValue(1);
          }else{
            setHCVValue(2);
          }

          setBWTest(rowData.BW_test);
          if(rowData.BW_test == "no"){
            setBWValue(0);
          }else if(rowData.BW_test == "p"){
            setBWValue(1);
          }else{
            setBWValue(2);
          }

          setTOXOPLASMETest(rowData.TOXOPLASME_test);
          if(rowData.TOXOPLASME_test == "no"){
            setTOXOPLASMEValue(0);
          }else if(rowData.TOXOPLASME_test == "p"){
            setTOXOPLASMEValue(1);
          }else{
            setTOXOPLASMEValue(2);
          }

          setRUBIOLETest(rowData.RUBIOLE_test);
          if(rowData.RUBIOLE_test == "no"){
            setRUBIOLEValue(0);
          }else if(rowData.RUBIOLE_test == "p"){
            setRUBIOLEValue(1);
          }else{
            setRUBIOLEValue(2);
          }
          setObservation(rowData.observation);

          setNameError([false, ""]);
        setPrenomError([false, ""]);
        setEnrgNbrError([false, ""]);
        setGenreError([false, ""]);
        setDateNaissanceError([false, ""]);
        setDateTestError([false, ""]);
        setHIVTestError([false, ""]);
        setHBSTestError([false, ""]);
        setHCVTestError([false, ""]);
        setBWTestError([false, ""]);
        setTOXOPLASMETestError([false, ""]);
        setRUBIOLETestError([false, ""]);
        setObservationError([false, ""]);
  
  
          }
        }catch(e){
          console.log(e)
        }
  
      }, [rowData]);


      React.useEffect(() => {
  
        if (response == "error"){
          setResponseErrorSignal(true);
        } else if(response != "") {
          setResponseSuccesSignal(true);
        }
  
      }, [response]);


      React.useEffect(() => {

        setLoading(true);
        setDateFilterError([false, ""]);

        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            var year = dateFilter.get('year');
            var month = dateFilter.get('month')+1;
            setData(await getAllExamenOfYear(token, month, year));
            setLoading(false);
          } catch (error) {
            console.log("error", error);
          }
        };

        if (dateFilter.isValid() == false || dateFilter ==""){
          setDateFilterError([true, "une erreur sur le champ de date"]);
          setDateFilterNotErr(true);
        }else{
          fetchData();
        }

        setOpen(false);
        setOpenUpdate(false);
      }, [response, dateFilter]);

    return(
        <React.Fragment>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>

          <Grid item xs={6}>

          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DesktopDatePicker
                                                    views={['year', 'month']}
                                                    label="Selectioner le mois"
                                                    value={dateFilter}
                                                    onChange={handleChangeFilterDate}
                                                    renderInput={(params) => <TextField {...params} error={dateFilterError[0]}
                                                    helperText={dateFilterError[1]} 
                                                    required/>}
                                            />

          </LocalizationProvider>

          </Paper>
            
          </Grid>

          <Grid item xs={6}>

          <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                    m: 1,
                    },
                }}
            >
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">

              <Button startIcon={<AddCircleOutline />} onClick={addExamenOpen}>Ajouter examen</Button>
              <Button startIcon={<EditAttributesIcon />} onClick={editExamenOpen}> Voir/Modifier</Button>
              <Button startIcon={<DeleteForeverIcon />} onClick={deleteExamenOpen}>Supprimer</Button>
              <Button startIcon={<PrintIcon />} onClick={printResult}>Impr</Button>
            </ButtonGroup>
            </Box>
            
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
            <div style={{ height: 2500, width: '100%' }}>
                      <DataGrid
                        components={{
                          Toolbar: GridToolbar,
                        }}
                          rows={data}
                          columns={columns}
                          columnVisibilityModel={{
                            // Hide columns status and traderName, the other columns will remain visible
                            id: false,
                            observation: false,
                          }}
                          pageSize={15}
                          checkboxSelection = {false}
                          loading={loading}
                          getRowHeight={() => 'auto'}
                          disableMultipleSelection={true}
                          onRowSelectionModelChange={(newRowSelectionModel) => {
                            setSelectionModel(newRowSelectionModel);
                          }}
                          rowSelectionModel={selectionModel}
                          
                      />
                </div>   
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />



        <Dialog open={open} onClose={addExamenClose}  maxWidth="lg" fullWidth={true}>
                  <DialogTitle>Ajouter un exemen</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                          <TextField
                                                  error={enrgNbrError[0]}
                                                  helperText={enrgNbrError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="No d'enregistrement"
                                                  fullWidth
                                                  variant="standard"
                                                  type="number"
                                                  value={enrgNbr}
                                                  onChange={(event) => {setEnrgNbr(event.target.value)}}
                                                  required
                                          />

                                        </Grid>
                                        <Grid item xs={4}>
                                        <TextField
                                                  error={nameError[0]}
                                                  helperText={nameError[1]}
                                                  margin="dense"
                                                  id="Nom_de_malade"
                                                  label="Nom de malade"
                                                  fullWidth
                                                  variant="standard"
                                                  onChange={(event) => {setName(event.target.value)}}
                                                  required
                                          />
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <TextField
                                                  error={prenomError[0]}
                                                  helperText={prenomError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="Prenom de malade"
                                                  fullWidth
                                                  variant="standard"
                                                  onChange={(event) => {setPrenom(event.target.value)}}
                                                  required
                                          />
                                                 
                                        
                                        </Grid>

                        
                      </Grid>

                      <br></br> 

                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date de naissance"
                                                        onChange={handleChangeDateNaissance}
                                                />

                                            </LocalizationProvider>

                                        </Grid>
                                        <Grid item xs={4}>
                                        <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">Genre</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={genreError[0]}
                                            onChange={changeGenre}>
                                              <MenuItem value="">
                                                <em>None</em>
                                              </MenuItem>
                                              <MenuItem value={1}>homme</MenuItem>
                                              <MenuItem value={2}>femme</MenuItem>
                                            

                                            </Select>
                                       </FormControl>   
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date d'examen"
                                                        onChange={handleChangeDateTest}
                                                />

                                            </LocalizationProvider>
                                                 
                                        
                                        </Grid>

                        
                      </Grid>

                      <br></br> 

                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">HIV Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={HIVTestError[0]}
                                            onChange={changeTest1}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl>  

                                       <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">HBS Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={HBSTestError[0]}
                                            onChange={changeTest2}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl> 

                                       <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">HCV Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={HCVTestError[0]} 
                                            onChange={changeTest3}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl> 

                                       <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">BW Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={BWTestError[0]} 
                                            onChange={changeTest4}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl> 

                                       <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">TOXOPLASME Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={TOXOPLASMETestError[0]} 
                                            onChange={changeTest5}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl> 

                                       <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">RUBIOLE Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={RUBIOLETestError[0]} 
                                            onChange={changeTest6}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl> 

                                        
                                        </Grid>

                                        <Grid item xs={8}>
                                        <TextField
                                                  error={observationError[0]}
                                                  helperText={observationError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="Observation"
                                                  fullWidth
                                                  multiline
                                                  rows={4}
                                                  variant="standard"
                                                  onChange={(event) => {setObservation(event.target.value)}}
                                          />          
                                        
                                        </Grid>
                           
                      </Grid>
                    </DialogContent>
                              <DialogActions>
                                <Button onClick={addExamenClose}>Anuller</Button>
                                <Button onClick={addExamenSave}>Sauvgarder</Button>
                              </DialogActions>   

                    
            </Dialog>



            <Dialog open={openUpdate} onClose={editExamenClose}  maxWidth="lg" fullWidth={true}>
                  <DialogTitle>Modifier un exemen</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                          <TextField
                                                  error={enrgNbrError[0]}
                                                  helperText={enrgNbrError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="No d'enregistrement"
                                                  fullWidth
                                                  variant="standard"
                                                  type="number"
                                                  value={enrgNbr}
                                                  onChange={(event) => {setEnrgNbr(event.target.value)}}
                                                  required
                                          />

                                        </Grid>
                                        <Grid item xs={4}>
                                        <TextField
                                                  error={nameError[0]}
                                                  helperText={nameError[1]}
                                                  margin="dense"
                                                  id="Nom_de_malade"
                                                  label="Nom de malade"
                                                  fullWidth
                                                  variant="standard"
                                                  value={name}
                                                  onChange={(event) => {setName(event.target.value)}}
                                                  required
                                          />
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <TextField
                                                  error={prenomError[0]}
                                                  helperText={prenomError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="Prenom de malade"
                                                  fullWidth
                                                  variant="standard"
                                                  value={prenom}
                                                  onChange={(event) => {setPrenom(event.target.value)}}
                                                  required
                                          />
                                                 
                                        
                                        </Grid>

                        
                      </Grid>

                      <br></br> 

                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date de naissance"
                                                        onChange={handleChangeDateNaissance}
                                                        value={dateNaissance}
                                                />

                                            </LocalizationProvider>

                                        </Grid>
                                        <Grid item xs={4}>
                                        <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">Genre</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={genreError[0]}
                                            onChange={changeGenre}
                                            value={genreValue}>
                                              <MenuItem value="">
                                                <em>None</em>
                                              </MenuItem>
                                              <MenuItem value={1}>homme</MenuItem>
                                              <MenuItem value={2}>femme</MenuItem>
                                            

                                            </Select>
                                       </FormControl>   
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date d'examen"
                                                        onChange={handleChangeDateTest}
                                                        value={dateTest}
                                                />

                                            </LocalizationProvider>
                                                 
                                        
                                        </Grid>

                        
                      </Grid>

                      <br></br> 

                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">HIV Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={HIVTestError[0]}
                                            onChange={changeTest1}
                                            value={HIVValue}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl>  

                                       <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">HBS Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={HBSTestError[0]}
                                            onChange={changeTest2}
                                            value={HBSValue}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl> 

                                       <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">HCV Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={HCVTestError[0]} 
                                            onChange={changeTest3}
                                            value={HCVValue}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl> 

                                       <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">BW Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={BWTestError[0]} 
                                            onChange={changeTest4}
                                            value={BWValue}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl> 

                                       <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">TOXOPLASME Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={TOXOPLASMETestError[0]} 
                                            onChange={changeTest5}
                                            value={TOXOPLASMEValue}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl> 

                                       <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">RUBIOLE Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={RUBIOLETestError[0]} 
                                            onChange={changeTest6}
                                            value={RUBIOLEValue}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Positive +</MenuItem>
                                              <MenuItem value={2}>Negative -</MenuItem>
                                            

                                            </Select>
                                       </FormControl> 

                                        
                                        </Grid>

                                        <Grid item xs={8}>
                                        <TextField
                                                  error={observationError[0]}
                                                  helperText={observationError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="Observation"
                                                  fullWidth
                                                  multiline
                                                  rows={4}
                                                  variant="standard"
                                                  value={observation}
                                                  onChange={(event) => {setObservation(event.target.value)}}
                                          />          
                                        
                                        </Grid>
                           
                      </Grid>
                    </DialogContent>
                              <DialogActions>
                                <Button onClick={editExamenClose}>Anuller</Button>
                                <Button onClick={editExamenSave}>Sauvgarder</Button>
                              </DialogActions>   

                    
            </Dialog>


            <Dialog open={openDelete}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={deleteExamenClose}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>{"Confirmer la suppression d'un examen"}</DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-slide-description">
                                      Êtes-vous sûr de la décision de supprimer l'examen ?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={deleteExamenClose}>Anuller</Button>
                                      <Button onClick={deleteConfirmation}>Supprimer</Button>
                                    </DialogActions>
                      </Dialog>


        
        
      </Container>


        {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
        {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
        {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
        {selectionError ? <Alt type='error' message='Selectioner un item' onClose={()=> setSelectionError(false)} /> : null}
        {dateFilterNotErr ? <Alt type='error' message='La liste des items de bon de sorte est vide!!' onClose={()=> setDateFilterNotErr(false)} /> : null}
      
    </React.Fragment>




    );




  }
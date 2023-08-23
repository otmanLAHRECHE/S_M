import * as React from 'react';
import { useTheme, styled  } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar, GridActionsCellItem,GridToolbarContainer,GridToolbarFilterButton,} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import Chip from '@mui/material/Chip';
import SaveIcon from '@mui/icons-material/Save';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import { darken, lighten } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Alt from '../layouts/alert';
import { internal_processStyles } from '@mui/styled-engine';
import ExamenItemsList from './Tests';
import { getAllExamenOfYear, addNewExemen, updateExemen, deleteExemen } from '../../actions/examenActions'

import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PrintIcon from '@mui/icons-material/Print';
import InputLabel from '@mui/material/InputLabel';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);


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

  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));


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

    const handleChangeFilterDate = (newValue) =>{
        setDateFilter(newValue);
      };

      const handleChangeDateNaissance = (newValue) =>{
        setDateNaissance(newValue);
      };

      const handleChangeDateTest = (newValue) =>{
        setDateTest(newValue);
      };

      const addExamenOpen = () =>{
        setOpen(true);

      };

      const editExamenOpen = () =>{

      };

      const deleteExamenOpen = () =>{



      }


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
            var year = dateFilter.get('year')
            setData(await getAllExamenOfYear(token, year));
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
      }, [response, dateFilter]);




    return(
        <React.Fragment>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>

          <Grid item xs={6}>

          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DesktopDatePicker
                                                    views={['year']}
                                                    label="Selectioner l'anné"
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
              <Button startIcon={<PrintIcon />} onClick={deleteExamenOpen}>Impr</Button>
            </ButtonGroup>
            </Box>
            
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
            <div style={{ height: 700, width: '100%' }}>
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
                          onSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel);
                          }}
                          selectionModel={selectionModel}
                          
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
                                          />
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <TextField
                                                  error={prenameError[0]}
                                                  helperText={prenameError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="Prenom de malade"
                                                  fullWidth
                                                  variant="standard"
                                                  onChange={(event) => {setPrename(event.target.value)}}
                                          />
                                                 
                                        
                                        </Grid>

                        
                      </Grid>

                      <br></br> 

                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date de naissanse"
                                                        inputFormat="DD/MM/YYYY"
                                                        value={dateNaissance}
                                                        onChange={handleChangeDateN}
                                                        renderInput={(params) => <TextField {...params} error={dateNaissanceError[0]}
                                                        helperText={dateNaissanceError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>

                                        </Grid>
                                        <Grid item xs={4}>
                                        <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">Genre</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={genreError[0]} helperText={genreError[1]}
                                            onChange={change_type}>
                                              <MenuItem value="">
                                                <em>None</em>
                                              </MenuItem>
                                              <MenuItem value={1}>homme</MenuItem>
                                              <MenuItem value={2}>famme</MenuItem>
                                            

                                            </Select>
                                </FormControl>   
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date de prélèvement"
                                                        inputFormat="DD/MM/YYYY"
                                                        value={date}
                                                        onChange={handleChangeDatePR}
                                                        renderInput={(params) => <TextField {...params} error={dateError[0]}
                                                        helperText={dateError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>
                                                 
                                        
                                        </Grid>

                        
                      </Grid>

                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <Autocomplete
                                                    disablePortal
                                                    value={infPrelevement}
                                                    onChange={(event, newVlue) =>{
                                                        setInfPrelevement(newVlue);
                                                        
                                                    }}
                                                    options={allInfPrelevement}
                                                    renderInput={(params) => <TextField {...params} error={infPrelevementError[0]}
                                                    helperText={infPrelevementError[1]} fullWidth variant="standard" label="Infirmier de prélèvement" 
                                                    required/>}
                                                />  
                                        

                                        </Grid>
                                        <Grid item xs={4}>
                                        <Autocomplete
                                                    disablePortal
                                                    value={testType}
                                                    onChange={async (event, newVlue) =>{
                                                        setTestType(newVlue);

                                                        if (newVlue != null){
                                                          const token = localStorage.getItem("auth_token");
                                                          setTestesData(await getTestesForSelectedType(token, newVlue.label));
                                                        }
                                                        else{
                                                          setAllTestes([]);
                                                          setTestes(null);
                                                        }
                                                        
                                                    }}
                                                    options={allTestTypes}
                                                    renderInput={(params) => <TextField {...params} error={testTypeError[0]}
                                                    helperText={testTypeError[1]} fullWidth variant="standard" label="Type de examen" 
                                                    required/>}
                                                />  
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <TextField
                                                  error={docNameError[0]}
                                                  helperText={docNameError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="Medecin d'analyse"
                                                  fullWidth
                                                  variant="standard"
                                                  onChange={(event) => {setDocName(event.target.value)}}
                                          />          
                                        
                                        </Grid>

                                        <Grid item xs={12}>
                                          <Autocomplete
                                                multiple
                                                id="checkboxes-tags-demo"
                                                options={allTestes}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) => option.exam_test}
                                                onChange={(event, newVlue) =>{
                                                  console.log(newVlue);
                                                  setTestes(newVlue);
                                                  
                                              }}
                                                renderOption={(props, option, { selected }) => (
                                                  <li {...props}>
                                                    <Checkbox
                                                      icon={icon}
                                                      checkedIcon={checkedIcon}
                                                      style={{ marginRight: 8 }}
                                                      checked={selected}
                                                    />
                                                    {option.exam_test}
                                                  </li>
                                                )}
                                                style={{ width: 500 }}
                                                renderInput={(params) => (
                                                  <TextField {...params} label="Les testes d'examen" placeholder="Teste" error={testesError[0]}
                                                  helperText={testesError[1]}/>
                                                )}
                                              />       
                                        
                                        </Grid>

                           
                      </Grid>
                    </DialogContent>
                              <DialogActions>
                                <Button onClick={addExamenClose}>Anuller</Button>
                                <Button onClick={addExamenSave}>Sauvgarder</Button>
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
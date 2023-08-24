import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { getStatestiques } from '../../actions/examenActions';
import Link from '@mui/material/Link';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';





export default function Historic(){
    const theme = useTheme

    const [dateFilter, setDateFilter] = React.useState(dayjs());
    const [dateFilterNotErr, setDateFilterNotErr] = React.useState(false);
    const [dateFilterError, setDateFilterError] = React.useState("");
    const [data, setData] = React.useState();

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

      const handleChangeFilterDate = (newValue) =>{
        setDateFilter(newValue);
      };

      React.useEffect(() => {

        setDateFilterError([false, ""]);
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            var year = dateFilter.get('year');
            var month = dateFilter.get('month')+1;
            setData(await getStatestiques(token, month, year));
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
      }, [dateFilter]);

    


    return(

        <React.Fragment>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                  }}
                >

                  <Typography variant="h5" display="block" gutterBottom>
                    HIV

                  </Typography>

                  <Typography variant="overline" display="block" gutterBottom>
                            Total exemens : { data ? data.hiv_t : null}
                           </Typography>

                           <Typography variant="overline" display="block" gutterBottom>
                            Examens positive : { data ? data.hiv_p : null}
                           </Typography>
                 
                </Paper>
              </Grid>

              <Grid item xs={12} md={8} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    HBS

                  </Typography>

                  <Typography variant="overline" display="block" gutterBottom>
                            Total exemens : { data ? data.hbs_t : null}
                           </Typography>

                           <Typography variant="overline" display="block" gutterBottom>
                            Examens positive : { data ? data.hbs_p : null}
                           </Typography>
                 
                </Paper>
              </Grid>

              <Grid item xs={12} md={8} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    HCV

                  </Typography>

                  <Typography variant="overline" display="block" gutterBottom>
                            Total exemens : { data ? data.hcv_t : null}
                           </Typography>

                           <Typography variant="overline" display="block" gutterBottom>
                            Examens positive : { data ? data.hcv_p : null}
                           </Typography>
                 
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                  }}
                >

                  <Typography variant="h5" gutterBottom>
                    BW

                  </Typography>

                  <Typography variant="overline" display="block" gutterBottom>
                            Total exemens : { data ? data.bw_t : null}
                           </Typography>

                           <Typography variant="overline" display="block" gutterBottom>
                            Examens positive : { data ? data.bw_p : null}
                           </Typography>

                </Paper>

                
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                  }}
                >

                    <Typography variant="h5" gutterBottom>
                    TOXOPLASME 

                  </Typography>

                  <Typography variant="overline" display="block" gutterBottom>
                            Total exemens : { data ? data.to_t : null}
                           </Typography>

                           <Typography variant="overline" display="block" gutterBottom>
                            Examens positive : { data ? data.to_p : null}
                           </Typography>

                </Paper>

                
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                  }}
                >

                        <Typography variant="h5" gutterBottom>
                        RUBIOLE 
                           </Typography>

                           <Typography variant="overline" display="block" gutterBottom>
                            Total exemens : { data ? data.ru_t : null}
                           </Typography>

                           <Typography variant="overline" display="block" gutterBottom>
                            Examens positive : { data ? data.ru_p : null}
                           </Typography>

                </Paper>

                
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                  }}
                >

                          <Typography variant="overline" display="block" gutterBottom>
                            Total exemens : { data ? data.total : null}
                           </Typography>

                           <Typography variant="overline" display="block" gutterBottom>
                            Hommes : { data ? data.homme : null}
                           </Typography>

                           <Typography variant="overline" display="block" gutterBottom>
                            Femmes : { data ? data.femme : null}
                           </Typography>

                </Paper>

                
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 90,
                  }}
                >

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
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' , height: 10 }}>
                 
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
      
        </React.Fragment>
    )
}
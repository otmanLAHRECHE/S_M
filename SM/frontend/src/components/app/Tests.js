import * as React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ExamenItemsList(props) {
  
  const t1 = ["", ""];
  const t2 = ["", ""];
  const t3 = ["", ""];
  const t4 = ["", ""];
  const t5 = ["", ""];
  const t6 = ["", ""];

  if(props.teste1 == "p"){
    t1[0]="+";
    t1[1]="error";
  }else if(props.teste1 == "n"){
    t1[0]="-";
    t1[1]="success";
  }else{
    t1[0]=" ";
    t1[1]="default";
  }

  if(props.teste2 == "p"){
    t2[0]="+";
    t2[1]="error";
  }else if(props.teste2 == "n"){
    t2[0]="-";
    t2[1]="success";
  }else{
    t2[0]=" ";
    t2[1]="default";
  }

  if(props.teste3 == "p"){
    t3[0]="+";
    t3[1]="error";
  }else if(props.teste3 == "n"){
    t3[0]="-";
    t3[1]="success";
  }else{
    t3[0]=" ";
    t3[1]="default";
  }

  if(props.teste4 == "p"){
    t4[0]="+";
    t4[1]="error";
  }else if(props.teste4 == "n"){
    t4[0]="-";
    t4[1]="success";
  }else{
    t4[0]=" ";
    t4[1]="default";
  }

  if(props.teste5 == "p"){
    t5[0]="+";
    t5[1]="error";
  }else if(props.teste5 == "n"){
    t5[0]="-";
    t5[1]="success";
  }else{
    t5[0]=" ";
    t5[1]="default";
  }

  if(props.teste6 == "p"){
    t6[0]="+";
    t6[1]="error";
  }else if(props.teste6 == "n"){
    t6[0]="-";
    t6[1]="success";
  }else{
    t6[0]=" ";
    t6[1]="default";
  }
  

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
          <ListItem key="01">
            <Chip
              label="HIV"
              color={t1[1]}
              avatar={<Avatar>{t1[0]}</Avatar>}
            />
          </ListItem>

          <ListItem key="02">
          <Chip
              label="HBS"
              color={t2[1]}
              avatar={<Avatar>{t2[0]}</Avatar>}
            />
          </ListItem>

          <ListItem key="03">
          <Chip
              label="HCV"
              color={t3[1]}
              avatar={<Avatar>{t3[0]}</Avatar>}
            />
          </ListItem>

          <ListItem key="04">
          <Chip
              label="BW"
              color={t4[1]}
              avatar={<Avatar>{t4[0]}</Avatar>}
            />
          </ListItem>

          <ListItem key="05">
          <Chip
              label="TOXOPLASME"
              color={t5[1]}
              avatar={<Avatar>{t5[0]}</Avatar>}
            />
          </ListItem>

          <ListItem key="06">
          <Chip
              label="RUBIOLE"
              color={t6[1]}
              avatar={<Avatar>{t6[0]}</Avatar>}
            />
          </ListItem>
    </Paper>
    </Container>
   

  );
}
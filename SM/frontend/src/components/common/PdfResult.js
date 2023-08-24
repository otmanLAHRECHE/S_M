import React from 'react';
import { Document, Text, Page } from '@react-pdf/renderer';
import { StyleSheet} from '@react-pdf/renderer';

export default function BonExamen(){

   

    const styles = StyleSheet.create({
        body: {
          paddingTop: 15,
          paddingBottom: 15,
          paddingHorizontal: 20,
        },
        title: {
          fontSize: 24,
          textAlign: 'center',
          marginTop: 10,
          marginBottom: 15
        },
        author: {
          fontSize: 10,
          marginBottom: 5,
          marginLeft: 8
        },
        subtitle: {
          fontSize: 10,
          marginLeft: 8,
          marginTop: 4,
          marginBottom: 4
        },
        text: {
          margin: 8,
          fontSize: 14,
          textAlign: 'justify',
          fontFamily: 'Times-Roman'
        },
        header: {
          fontSize: 10,
          marginBottom: 5,
          textAlign: 'center',
          color: 'grey',
        },
        title2: {
            fontSize: 18,
            textAlign: 'center',
            marginTop: 15,
            marginBottom: 15
          },
          author2: {
            fontSize: 11,
            marginBottom: 50,
            marginLeft: 8
          },
      });


    return(
    <Document>
        <Page style={styles.body} size="A5">
        <Text style={styles.header} fixed>
           REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE
      </Text>
      <Text style={styles.header} fixed>
           MINISTERE DE SANTE
      </Text>

      <Text style={styles.subtitle}>
        ETABLISSEMENT PUBLIQUE DE LA SANTE DE PROXIMITE DE DJANET
      </Text>

      <Text style={styles.subtitle}>
        SEMEP DE DJANET
      </Text>

      <Text style={styles.subtitle}>
        LABORATOIRE DE PREVENTION
      </Text>

      <Text style={styles.title}>BON D'EXAMEN</Text>

      <Text style={styles.author}>
        Nom : ..........                                                            Date de naissance: ...............
      </Text>

      <Text style={styles.author}>
        Prenom : ..........
      </Text>


      <Text style={styles.title2}>EXAMENS SEROLOGIQUES :</Text>

      <Text style={styles.author2}>
        HIV : ..........                                           Toxoplasme:...............   
      </Text>

      <Text style={styles.author2}>
        HBS : ..........                                           Rubiole:..................        
      </Text>

      <Text style={styles.author2}>
        HCV : ..........                         
      </Text>

      <Text style={styles.author2}>
        BW : ..........                  
      </Text>


      <Text style={styles.author}>
        .                                                                                Djanet le : ........................
      </Text>
        </Page>
    </Document>
    );
}
 



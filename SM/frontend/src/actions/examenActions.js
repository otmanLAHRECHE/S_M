export async function getAllExamenOfYear(token, month, year){
    const response = await fetch(
        '/app/api/get_all_examen_of_year/' + month + '/' + year ,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: JSON.stringify()
        }
    );
    const text = await response.text();
    if (response.status === 200) {
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "no data";
    }
  
  };



  export async function addNewExemen(token, data){
    const response = await fetch(
        '/app/api/create_new_examen/',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: data
        }
    );
    const text = await response.text();
    if (response.status === 201) {
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "error";
    }
    
    };


    export async function updateExemen(token, data, id){
        const response = await fetch(
            '/app/api/update_examen/'+id,
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' +token,
              },
              body: data
            }
        );
        const text = await response.text();
        if (response.status === 200) {
          return JSON.parse(text);
        } else {
          console.log("failed", text);
          return "error";
        }
        
        };



        export async function deleteExemen(token, id){
            const response = await fetch(
                '/app/api/delete_examen/'+id,
                {
                  method: 'DELETE',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' +token,
                  },
                  body: JSON.stringify()
                }
            );
            const text = await response.text();
            if (response.status === 200) {
              return JSON.parse(text);
            } else {
              console.log("failed", text);
              return "error";
            }
            
            };


            export async function getSelectedExemen(token, id){
  
              const response = await fetch(
                '/app/api/get_selected_examen/'+id,
                {
                  method: 'GET',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' +token,
                  },
                  body: JSON.stringify()
                }
            );
            const text = await response.text();
            if (response.status === 200) {
              return JSON.parse(text);
            } else {
              console.log("failed", text);
              return "no data";
            }
            
            };


            export async function getStatestiques(token, month, year){
              const response = await fetch(
                  '/app/api/get_statestiques/' + month + '/' + year ,
                  {
                    method: 'GET',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Token ' +token,
                    },
                    body: JSON.stringify()
                  }
              );
              const text = await response.text();
              if (response.status === 200) {
                return JSON.parse(text);
              } else {
                console.log("failed", text);
                return "no data";
              }
            
            };
          

  
            

import React, { useEffect, useRef, useState } from 'react'
import { base_url } from '../../utils/Config';

const CreateMovie = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const titleInputRef = useRef(null);
    const categoriesInputRef = useRef(null);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(base_url + '/api/Categories/GetAllCategories', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (response.ok) {
              const jsonData = await response.json();
              setCategoriesData(jsonData);
              console.log(jsonData)
            } else {
              console.log('Error al obtener las categorias:', response.status);
            }
          } catch (error) {
            console.log('Error al obtener las categorias:', error);
          }
        };
    
        fetchData();
      }, []);

      const handleSubmit = async (event) => {
        event.preventDefault();

        const titleValue = titleInputRef.current.value;
        const categoriesValue = (categoriesInputRef.current.value).split(",");
        //Itera por cada una para ponerle la propiedad name que se envia en el json.
        const categoryArray = categoriesValue.map((cn) => {
            return {
              name: cn.trim() 
            };
          });

        const data = {
            title: titleValue,
            categories : categoriesValue
        };

        const response = await fetch(base_url + "/api/Movies/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if(response.ok){
            console.log("Pelicula creada con exito...");
        }


      }
  return (
    <form onSubmit={handleSubmit} className='text-blue-950'>
        <label>Titulo: </label>
        <input type='text' className='border border-slate-800 rounded-sm' ref={titleInputRef}></input>
        <p className='text-black bg-slate-400'>Categorias(en bd): <span>[{categoriesData.map((c) => c.name).join(', ')}]</span></p>
        <label>Categorias(separadas por ","): </label>
        <input type='text' className='border border-slate-800 rounded-sm' ref={categoriesInputRef}></input>
        <br></br>
        <button type='submit' className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Crear</button>
    </form>
  )
}

export default CreateMovie
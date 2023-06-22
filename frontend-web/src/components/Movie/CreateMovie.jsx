
import React, { useEffect, useRef, useState } from 'react'
import { base_url } from '../../utils/Config';

const CreateMovie = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState("");
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();


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
      
      const handleTitleChange = (event) => {
        setTitle(event.target.value);
      }

      const handleCategoriesChange = (event) => {
        setCategories(event.target.value);
      }
      
      const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        // Mostrar vista previa de la imagen seleccionada
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);

      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        
        //Itera por cada una para ponerle la propiedad name que se envia en el json.
        const splitedCategories = categories.split(",");
        //Poner los nombres dentro de cada objeto
        const categoryArray = splitedCategories.map((cn) => {
            return {
              id:0,
              name: cn.trim() 
            };
          });

        const formData = new FormData();
        formData.append('Title', title);
        formData.append('Image', image);

        //Agregar categorias
        categoryArray.forEach((category, index) => {
          formData.append(`Categories[${index}].name`, category.name);
        });

        const response = await fetch(base_url + "/api/Movies/", {
          method: 'POST',
          body: formData,
        });

        if(response.ok){
            console.log("Pelicula creada con exito...");
        }


      }
  return (
    <form onSubmit={handleSubmit} className='text-blue-950' encType="multipart/form-data">
        <label>Titulo: </label>
        <input type='text' className='border border-slate-800 rounded-sm' onChange={handleTitleChange} value={title}></input>
        <p className='text-black bg-slate-400'>Categorias(en bd): <span>[{categoriesData.map((c) => c.name).join(', ')}]</span></p>
        <label>Categorias(separadas por ","): </label>
        <input type='text' className='border border-slate-800 rounded-sm' onChange={handleCategoriesChange} value={categories}></input>
        <label>Portada: </label>
        <input type="file" onChange={handleImageChange} />
        {preview && (
        <img src={preview} alt="Preview" style={{ width: '200px', height: '200px' }} />
      )}
        <br></br>
        <button type='submit' className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Crear</button>
    </form>
  )
}

export default CreateMovie
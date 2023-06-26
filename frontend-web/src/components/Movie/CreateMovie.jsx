
import React, { useEffect, useRef, useState } from 'react'
import { base_url } from '../../utils/Config';
import useCreateMovie from '../../hooks/movies/useCreateMovie';
import ButtonLoading from '../Shared/ButtonLoading';
import useGetCategories from '../../hooks/categories/useGetCategories';

const CreateMovie = () => {
    const [createdMovie, isCreatingMovie, isCreatingMovieError, createMovie] = useCreateMovie();
    const [categoriesData, isCategoriesLoading, isCategoriesLoadingError] = useGetCategories();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState("");
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();

      
      const handleTitleChange = (event) => {
        setTitle(event.target.value);
      }

      const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
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
        const formData = new FormData();
        const splitedCategories = categories.split(",");
        
        //Poner los nombres dentro de cada objeto
        const categoryArray = splitedCategories.map((cn) => {
            return {
              id:0,
              name: cn.trim() 
            };
          });


        formData.append('Title', title);
        formData.append('Description', description);
        formData.append('Image', image);

        //Agregar categorias
        categoryArray.forEach((category, index) => {
          formData.append(`Categories[${index}].name`, category.name);
        });

        //Api call
        await createMovie(formData);        

      }
      

  return (
    <form className='text-blue-950' encType="multipart/form-data">
        <label>Titulo: </label>
        <input type='text' className='border border-slate-800 rounded-sm' onChange={handleTitleChange} value={title}></input>
        <label>Descripcion: </label>
        <input type='text' className='border border-slate-800 rounded-sm' onChange={handleDescriptionChange} value={description}></input>
        <p className='text-gray-600 '>Categorias(en bd): 
            {isCategoriesLoading && <span>Cargando...</span>}
            {categoriesData !== null ? <span className='text-cyan-400'>{categoriesData.map((c) => c.name).join(', ')}</span> : null}
            {isCategoriesLoadingError && <span className='bg-red-300'>Error al obtener las categorias:{isCategoriesLoadingError}</span>}
        </p>

        <label>Categorias(separadas por ","): </label>
        <input type='text' className='border border-slate-800 rounded-sm' onChange={handleCategoriesChange} value={categories}></input>
        <br></br>
        <label>Portada: </label>
        <input type="file" onChange={handleImageChange} />
        {preview && (
        <img src={preview} alt="Preview" style={{ width: '150px', height: '200px' }} />
        )}
        {isCreatingMovieError && <p className='bg-red-400'>Error al crear la pelicula: {isCreatingMovieError}</p>}
        {createdMovie && <p>Pelicula creada con exito: {createdMovie}</p>} 
        <br></br>
        <ButtonLoading isLoading={isCreatingMovie} onClick={handleSubmit} buttonText={"Crear"} ></ButtonLoading>
    </form>
  )
}

export default CreateMovie
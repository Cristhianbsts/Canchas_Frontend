import React from 'react'
import { useForm } from "react-hook-form"
import "../css/searchBar.css"
export default function SearchBar() {

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      reset,
    } = useForm()


    const onSubmit =  async (data)=>{

    }


  return (
     <section class="py-4 ">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form action="/buscar" method="GET">
                    <div class="input-group search-box">
                        <button class="btn btn-search" type="submit">
                            <i class="bi bi-search"></i> </button>
                        <input type="text" class="form-control border-start-0" placeholder="Buscar productos..." aria-label="Buscar"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </section>
  )
}

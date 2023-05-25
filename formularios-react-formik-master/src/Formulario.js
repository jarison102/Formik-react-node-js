import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { handleDownloadPdf } from "./Mifuncion.js";
import { handleOpenPdf } from "./Funcionpdf.js";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";



const Formulario = () => {
  const [datos, setDatos] = useState([]);
  const [datostipo_negocio, setDatostipo_negocio] = useState([]);
  const [datosSubtipo, setDatosSubtipo] = useState([]);
  const [datosSubtipo2, setDatosSubtipo2] = useState([]);
  const [datosEstrato, setDatosEstrato] = useState([]);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);


  //boton imagenes
  const [indexImagen, setIndexImagen] = useState(0);
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
  

  const handleSeleccionarArchivo = (event) => {
    const archivo = event.target.files[0];
    const lector = new FileReader();
    lector.readAsDataURL(archivo);
    lector.onload = () => {
      setImagenesSeleccionadas([
        ...imagenesSeleccionadas,
        {
          id: imagenesSeleccionadas.length,
          imagen: lector.result,
        },
      ]);
    };
  };
  const handleIndexChange = (selectedIndex, e) => {
    setIndexImagen(selectedIndex);
  };

  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);

  const handleSeleccionarArchivosT = (event) => {
    const archivos = event.target.files;
    const nuevosArchivos = Array.from(archivos).map((archivo) => ({
      id: archivosSeleccionados.length,
      nombre: archivo.name,
      imagen: URL.createObjectURL(archivo),
    }));
    setArchivosSeleccionados([...archivosSeleccionados, ...nuevosArchivos]);
  };

  const handleEliminarArchivo = (id) => {
    setArchivosSeleccionados(
      archivosSeleccionados.filter((archivo) => archivo.id !== id)
    );
  };
  const handleSeleccionarArchivosF = (event) => {
    handleSeleccionarArchivosT(event); // Llamada a la función handleSeleccionarArchivoT
    handleSeleccionarArchivo(event); // Llamada a la función handleSeleccionarArchivo original
  };

  useEffect(() => {
    axios.get("http://localhost:3001/mostrar-datos").then((resp) => {
      console.log(resp.data);

      if (resp.data.success) {
        let datos = resp.data;
        console.log(datos.datos[0].Descripcion_estado);
        setDatos(datos.datos);
        return;
      }
      alert("No muestra nada de informacion");
    });

    axios.get("http://localhost:3001/subtipo").then((resp) => {
      console.log(resp.data);
      if (resp.data.success) {
        let datos = resp.data.datos;
        console.log(datos[0].Nombre);
        setDatosSubtipo(datos);
      } else {
        alert("No se pudo obtener la información de subtipo");
      }
    });

    axios.get("http://localhost:3001/subtipo2").then((resp) => {
      console.log(resp.data);
      if (resp.data.success) {
        let datos = resp.data;
        console.log(datos.datos[0].Nombre);
        setDatosSubtipo2(datos.datos); // Actualiza el estado usando setDatosSubtipo2
        return;
      }
      alert("No muestra nada de informacion");
    });

    axios.get("http://localhost:3001/estrato").then((resp) => {
      console.log(resp.data);
      if (resp.data.success) {
        let datos = resp.data;
        console.log(datos.datos[0].Nombre);
        setDatosEstrato(datos.datos); // Actualiza el estado usando setDatosEstrato
        return;
      }
      alert("No muestra nada de informacion");
    });

    axios.get("http://localhost:3001/tipo_negocio").then((resp) => {
      console.log(resp.data);
      if (resp.data.success) {
        let datos = resp.data;
        console.log(datos.datos[0].Nombre);
        setDatostipo_negocio(datos.datos); // Actualiza el estado usando setDatostipo_negocio
        return;
      }
      alert("No muestra nada de informacion");
    });
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          Proyecto: "",
          Fuente: "",
          Cod_sigma: "",
          inmobiliaria: "",
          Interior_Exterior: "",
          Telefono1: "",
          Telefono2: "",
          Telefono3: "",
          Area_M2: "",
          Area_mezanine: "",
          Area_terraza_M2: "",
          Num_piso: "",
          Alcobas: "",
          Num_garajes: "",
          Valor_Precio_m2: "",
          Costo_administracion: "",
          Valor_arriendo: "",
          Antiguedad: "",
        }}
        validate={(valores) => {
          let errores = {};

          // Validacion Proyecto
          if (!valores.Proyecto) {
            errores.Proyecto = "Por favor ingresa un Proyecto";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.Proyecto)) {
            errores.Proyecto =
              "El Proyecto solo puede contener letras y espacios";
          }

          // Validacion Proyecto
          if (!valores.Fuente) {
            errores.Fuente = "Por favor ingresa una Fuente";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.Fuente)) {
            errores.Fuente = "La Fuente solo puede contener letras y espacios";
          }

          // Validacion Cod_sigma
          if (!valores.Cod_sigma) {
            errores.Cod_sigma = "Por favor ingresa un Cod_sigma";
          } else if (!/^[0-9]+$/.test(valores.Cod_sigma)) {
            errores.Cod_sigma =
              "El Cod_sigma solo puede contener letras y espacios";
          }

          if (!valores.inmobiliaria) {
            errores.inmobiliaria = "Por favor ingresa una inmobiliaria";
          } else if (valores.inmobiliaria.length < 5) {
            errores.inmobiliaria = "La inmobiliaria debe tener al menos 5 caracteres";
          } else if (!/^[-0-9]+$/.test(valores.inmobiliaria)) {
            errores.inmobiliaria = "La inmobiliaria solo puede contener números y el signo -";
          }

          // Validacion Interior-Exterior
          if (!valores.Interior_Exterior) {
            errores.Interior_Exterior =
              "Por favor ingresa un Interior o Exterior";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.Interior_Exterior)) {
            errores.Interior_Exterior =
              "El Interior o Exterior solo puede contener letras y espacios";
          }

          if (!valores.Telefono1) {
            errores.Telefono1 = "Por favor ingresa un Telefono";
          } else if (!/^[0-9]{9}$/.test(valores.Telefono1)) {
            errores.Telefono1 =
              "El Telefono debe contener exactamente 9 numeros";
          }

          if (!valores.Telefono2) {
            errores.Telefono2 = "Por favor ingresa un Telefono";
          } else if (!/^[0-9]{9}$/.test(valores.Telefono2)) {
            errores.Telefono2 =
              "El Telefono debe contener exactamente 9 numeros";
          }

          if (!valores.Telefono3) {
            errores.Telefono3 = "Por favor ingresa un Telefono";
          } else if (!/^[0-9]{9}$/.test(valores.Telefono3)) {
            errores.Telefono3 =
              "El Telefono debe contener exactamente 9 numeros";
          }

          if (!valores.Area_M2) {
            errores.Area_M2 = "Por favor ingresa un valor";
          } else if (!/^[0-9.]+$/.test(valores.Area_M2)) {
            errores.Area_M2 = "El valor debe contener solo números y el signo .";
          }
          
          // Validacion Area_mezanine
          if (!valores.Area_mezanine) {
            errores.Area_mezanine = "Por favor ingresa un valor";
          } else if (!/^[0-9.]+$/.test(valores.Area_mezanine)) {
            errores.Area_mezanine = "El valor debe contener solo números y el signo .";
          }
          
          // Validacion Area_terraza_M2
          if (!valores.Area_terraza_M2) {
            errores.Area_terraza_M2 = "Por favor ingresa un valor";
          } else if (!/^[0-9.]+$/.test(valores.Area_terraza_M2)) {
            errores.Area_terraza_M2 = "El valor debe contener solo números y el signo .";
          }

          // Validacion Num_piso
          if (!valores.Num_piso) {
            errores.Num_piso = "Por favor ingresa un Num_piso";
          } else if (!/^[0-9]+$/.test(valores.Num_piso)) {
            errores.Num_piso = "El Num_piso solo puede contener numeros";
          }

          // Validacion AlcobasNum_garaje
          if (!valores.Alcobas) {
            errores.Alcobas = "Por favor ingresa un numero de Alcobas";
          } else if (!/^[0-9]+$/.test(valores.Alcobas)) {
            errores.Alcobas = "La Alcoba solo puede contener numeros";
          }

          // Validacion Num_garajes
          if (!valores.Num_garajes) {
            errores.Num_garajes = "Por favor ingresa un numero de garajes";
          } else if (!/^[0-9]+$/.test(valores.Num_garajes)) {
            errores.Num_garajes = "El garaje solo puede contener numeros";
          }

          // Validacion Valor_Precio_m2
          if (!valores.Valor_Precio_m2) {
            errores.Valor_Precio_m2 = "Por favor ingresa un valor";
          } else if (!/^[0-9.]+$/.test(valores.Valor_Precio_m2)) {
            errores.Valor_Precio_m2 = "El valor debe contener solo números y el signo .";
          }


          // Validacion Costo_administracion
          if (!valores.Costo_administracion) {
            errores.Costo_administracion =
              "Por favor ingresa un Costo_administracion ";
          } else if (!/^[0-9]+$/.test(valores.Costo_administracion)) {
            errores.Costo_administracion =
              "El Costo_administracion solo puede contener numeros";
          }

          // Validacion Valor_arriendo
          if (!valores.Valor_arriendo) {
            errores.Valor_arriendo = "Por favor ingresa un Valor";
          } else if (!/^[0-9]+$/.test(valores.Valor_arriendo)) {
            errores.Valor_arriendo = "El valor solo puede contener numeros";
          }

          // Validacion Antiguedad
          if (!valores.Antiguedad) {
            errores.Antiguedad = "Por favor ingresa una Antiguedad en años";
          } else if (!/^[0-9]+$/.test(valores.Antiguedad)) {
            errores.Antiguedad = "Por favor ingresa una Antiguedad en años";
          }

          return errores;
        }}
        onSubmit={(values, { resetForm }) => {
          console.log("Formulario enviado");
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 5000);
          const data = {
            Proyecto: values.Proyecto,
            Fuente: values.Fuente,
            Cod_sigma: values.Cod_sigma,
            inmobiliaria: values.inmobiliaria,
            Interior_Exterior: values.Interior_Exterior,
            Telefono1: values.Telefono1,
            Telefono2: values.Telefono2,
            Telefono3: values.Telefono3,
            Area_M2: values.Area_M2,
            Area_mezanine: values.Area_mezanine,
            Area_terraza_M2: values.Area_terraza_M2,
            Num_piso: values.Num_piso,
            Alcobas: values.Alcobas,
            Num_garaje: values.Num_garaje,
            Valor_Precio_m2: values.Valor_Precio_m2,
            Costo_administracion: values.Costo_administracion,
            Valor_arriendo: values.Valor_arriendo,
            Antiguedad: values.Antiguedad,
          };

          axios.post("http://localhost:3001/register", data).then((resp) => {
            console.log(resp.data);

            if (resp.data.success) {
              return alert("Formulario Enviado Con exito");
            }
            alert("Formulario No enviado");
          });
        }}
      >
        {({ errors }) => (
          <Form className="formulario" id="formulario">
            <div>
              <label htmlFor="Estado">Estado del Registro</label>
              <select id="Estado" name="Estado">
                <option value="">Seleccione una opción</option>
                {datos.map((opcion, index) => (
                  <option key={index} value={index}>
                    {opcion.Descripcion_estado}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="Proyecto">Nombre del Proyecto</label>
              <Field
                type="text"
                id="Proyecto"
                name="Proyecto"
                placeholder="Escribe el nombre de tu proyecto"
              />
              <ErrorMessage
                name="Proyecto"
                component={() => <div className="error">{errors.Proyecto}</div>}
              />
            </div>

            <div>
              <label htmlFor="Fuente">Fuente</label>
              <Field
                type="text"
                id="Fuente"
                name="Fuente"
                placeholder="Fuente"
              />
              <ErrorMessage
                name="Fuente"
                component={() => <div className="error">{errors.Fuente}</div>}
              />
            </div>

            <div>
              <label htmlFor="nombre">Subtipo</label>
              <select id="nombre" name="nombre">
                <option value="">Seleccione una opción</option>
                {datosSubtipo.map((opcion, index) => (
                  <option key={index} value={opcion.Nombre}>
                    {opcion.Nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="nombre">Subtipo2</label>
              <select id="nombre" name="nombre">
                <option value="">Seleccione una opción</option>
                {datosSubtipo2.map((opcion, index) => (
                  <option key={index} value={index}>
                    {opcion.Nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="estado">Estrato</label>
              <select id="estado" name="estado">
                <option value="">Seleccione una opción</option>
                {datosEstrato.map((opcion, index) => (
                  <option key={index} value={index}>
                    {opcion.Nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="nombre">Tipo negocio</label>
              <select id="estado" name="estado">
                <option value="">Seleccione una opción</option>
                {datostipo_negocio.map((opcion, index) => (
                  <option key={index} value={index}>
                    {opcion.Nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="Cod_sigma">Cod sigma</label>
              <Field
                type="text"
                id="Cod_sigma"
                name="Cod_sigma"
                placeholder="Cod sigma"
              />
              <ErrorMessage
                name="Cod_sigma"
                component={() => (
                  <div className="error">{errors.Cod_sigma}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="inmobiliaria">Matricula inmobiliaria</label>
              <Field
                type="text"
                id="inmobiliaria"
                name="inmobiliaria"
                placeholder="Matricula inmobiliaria"
              />
              <ErrorMessage
                name="inmobiliaria"
                component={() => (
                  <div className="error">{errors.inmobiliaria}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="Interior_Exterior">Interior-Exterior</label>
              <Field
                type="text"
                id="Interior_Exterior"
                name="Interior_Exterior"
                placeholder="Interior_Exterior"
              />
              <ErrorMessage
                name="Interior_Exterior"
                component={() => (
                  <div className="error">{errors.Interior_Exterior}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="Telefono1">Telefono1</label>
              <Field
                type="int"
                id="Telefono1"
                name="Telefono1"
                placeholder="32137894395"
                maxLength="9"
              />
              <ErrorMessage
                name="Telefono1"
                component={() => (
                  <div className="error">{errors.Telefono1}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="Telefono2">Telefono2</label>
              <Field
                type="int"
                id="Telefono2"
                name="Telefono2"
                placeholder="3216692365"
                maxLength="9"
              />
              <ErrorMessage
                name="Telefono2"
                component={() => (
                  <div className="error">{errors.Telefono2}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="Telefono3">Telefono3</label>
              <Field
                type="text"
                id="Telefono3"
                name="Telefono3"
                placeholder="322292043"
                maxLength="9"
              />
              <ErrorMessage
                name="Telefono3"
                component={() => (
                  <div className="error">{errors.Telefono3}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="Area_M2">Area M2</label>
              <Field
                type="text"
                id="Area_M2"
                name="Area_M2"
                placeholder="Area_M2"
              />
              <ErrorMessage
                name="Area_M2"
                component={() => <div className="error">{errors.Area_M2}</div>}
              />
            </div>

            <div>
              <label htmlFor="Area_mezanine">Area mezanine</label>
              <Field
                type="text"
                id="Area_mezanine"
                name="Area_mezanine"
                placeholder="Area_mezanine"
              />
              <ErrorMessage
                name="Area_mezanine"
                component={() => (
                  <div className="error">{errors.Area_mezanine}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="Area_terraza_M2">Area terraza M2</label>
              <Field
                type="text"
                id="Area_terraza_M2"
                name="Area_terraza_M2"
                placeholder="Area_terraza_M2"
              />
              <ErrorMessage
                name="Area_terraza_M2"
                component={() => (
                  <div className="error">{errors.Area_terraza_M2}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="Num_piso">Num piso</label>
              <Field
                type="int"
                id="Num_piso"
                name="Num_piso"
                placeholder="Num_piso"
              />
              <ErrorMessage
                name="Num_piso"
                component={() => <div className="error">{errors.Num_piso}</div>}
              />
            </div>

            <div>
              <label htmlFor="Alcobas">Alcobas</label>
              <Field
                type="text"
                id="Alcobas"
                name="Alcobas"
                placeholder="Alcobas"
              />
              <ErrorMessage
                name="Alcobas"
                component={() => <div className="error">{errors.Alcobas}</div>}
              />
            </div>

            <div>
              <label htmlFor="Num_garajes">Num garajes</label>
              <Field
                type="int"
                id="Num_garajes"
                name="Num_garajes"
                placeholder="Num_garajes"
              />
              <ErrorMessage
                name="Num_garajes"
                component={() => (
                  <div className="error">{errors.Num_garajes}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="Valor_Precio_m2">Valor Precio m2</label>
              <Field
                type="text"
                id="Valor_Precio_m2"
                name="Valor_Precio_m2"
                placeholder="Valor_Precio_m2"
              />
              <ErrorMessage
                name="Valor_Precio_m2"
                component={() => (
                  <div className="error">{errors.Valor_Precio_m2}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="Costo_administracion">Costo administracion</label>
              <Field
                type="float"
                id="Costo_administracion"
                name="Costo_administracion"
                placeholder="Costo_administracion"
              />
              <ErrorMessage
                name="Costo_administracion"
                component={() => (
                  <div className="error">{errors.Costo_administracion}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="Valor_arriendo">Valor arriendo</label>
              <Field
                type="float"
                id="Valor_arriendo"
                name="Valor_arriendo"
                placeholder="Valor_arriendo"
              />
              <ErrorMessage
                name="Valor_arriendo"
                component={() => (
                  <div className="error">{errors.Valor_arriendo}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="Antiguedad">Antiguedad</label>
              <Field
                type="text"
                id="Antiguedad"
                name="Antiguedad"
                placeholder="Antiguedad"
              />
              <ErrorMessage
                name="Antiguedad"
                component={() => (
                  <div className="error">{errors.Antiguedad}</div>
                )}
              />
            </div>

            <div>
              <div>
                <label htmlFor="negociacion">Fecha inicio negociación</label>
                <Field
                  type="datetime-local"
                  id="negociacion"
                  name="negociacion"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="Seleccionar_Foto">Seleccionar Foto</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSeleccionarArchivosF}
                />
              </div>
            </div>

            <div>
              <div className="contenedor-imagenes">
                {archivosSeleccionados.length > 0 ? (
                  <Carousel
                    activeIndex={indexImagen}
                    onSelect={handleIndexChange}
                  >
                    {archivosSeleccionados.map((archivo) => (
                      <Carousel.Item key={archivo.id}>
                        <img
                          className="d-block w-100 imagen-pdf"
                          src={archivo.imagen}
                          alt="Imagen seleccionada"
                        />
                        <Carousel.Caption></Carousel.Caption>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <p className="texto-rojo">No hay imágenes seleccionadas</p>
                )}
              </div>
            </div>

            <div className="tabla-archivos">
              {archivosSeleccionados.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre de Archivo</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {archivosSeleccionados.map((archivo, index) => (
                      <tr key={archivo.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{archivo.nombre}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => handleEliminarArchivo(archivo.id)}
                            className="icono-basura"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="texto-rojo">No hay archivos seleccionados</p>
              )}
            </div>

            <button type="submit">Enviar</button>
            {
              <button type="button" onClick={() => handleDownloadPdf(imagenesSeleccionadas,archivosSeleccionados)}>
                Descargar PDF
              </button>
            }
            <button
              type="button"
              onClick={() =>
                handleOpenPdf(imagenesSeleccionadas, archivosSeleccionados)
              }
            >
              Ver PDF
            </button>

            {formularioEnviado && (
              <p className="exito">Formulario enviado con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Formulario;

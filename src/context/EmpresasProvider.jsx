import React from "react";
import { useState, useEffect, createContext } from "react";
// import { Navigate } from "react-router-dom";
import clienteAxios from "@/configs/clinteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const EmpresasContext = createContext();

const EmpresasProvider = ({ children }) => {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [modalNuevaEmpresa, setModalNuevaEmpresa] = useState(false);
  const [modalEditarEmpresa, setModalEditarEmpresa] = useState(false);

  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [cuitEmpresa, setCuitEmpresa] = useState("");
  const [direccionEmpresa, setDireccionEmpresa] = useState("");
  const [actualizarListados, setActualizarListados] = useState(false);
  const [listadoEmpresas, setListadoEmpresas] = useState([]);
  const [idEditarEmpresa, setIdEditarEmpresa] = useState("");
  const [selectEntidades, setSelectEntidades] = useState(1);
  const [valueProfileEntidad, setValueProfileEntidad] = useState(1);

  const [nombreSector, setNombreSector] = useState("");
  const [modalSector, setModalSector] = useState(false);
  const [actualizarListadoSectores, setActualizarListadoSectores] =
    useState(false);

  const [modalEditarSector, setModalEditarSector] = useState(false);

  const [idSector, setIdSector] = useState("");

  const [usuariosEmpresas, setUsuariosEmpresas] = useState([]);

  const [sectoresEmpresa, setSectoresEmpresas] = useState([]);

  const [idSectorNuevoUsuario, setIdSectorNuevoUsuario] = useState("");

  const [modalNuevoCasoSuperAdmin, setModalNuevoCasoSuperAdmin] =
    useState(false);

  const [comentarioCaso, setComentarioCAso] = useState("");

  const [todosLosCasos, setTodosLosCasos] = useState([]);

  const [actualizarListadoCasos, setActualizarListadosCasos] = useState(false);

  const [casosPorEmpresa, setCasosPorEmpresa] = useState([]);

  const [modalNuevoCasoAdmin, setModalNuevoCasoAdmin] = useState(false);

  const [listadoCasosPorUser, setListadosCasosPorUser] = useState([]);

  const [modalNuevoCasoRol, setModalNuevoCasoRol] = useState(false);

  const [modalMostrarArchivos, setModalMostrarArchivos] = useState(false);
  const [archivo, setArchivo] = useState("");
  const [modalVerRol2, setModalVerRol2] = useState(false);
  const [fechaProcesarRol2, setFechaProcesarRol2] = useState("");
  const [usuarioProcesarRol2, setUsuarioProcesarRol2] = useState("");
  const [statusProcesarRol2, setStatusProcesarRol2] = useState("");
  const [idCasoProcesarRol2, setIdCasoProcesarRol2] = useState("");
  const [modalVerRespuesta, setModalVerRespuesta] = useState(false);

  const [fechaCargaAprobarDoc, setFechaCargaAprobarDoc] = useState("");
  const [nombreUsuarioAprobarDoc, setNombreUsuarioAprobarDoc] = useState("");
  const [respuestaAprobarDoc, setRespuestaAprobarDoc] = useState([]);
  const [resultadoChatGpt, setResultadoChatGpt] = useState([]);

  const [verificacionAprobada, setVerificacionAprobada] = useState([]);

  const [idDocumentoReprocesar, setIdDocumentoReprocesar] = useState("");
  const [idCasoVerificar, setIdCasoVerificar] = useState("");
  const [seleccion, setSeleccion] = useState(1);
  const [modalFiltrar, setModalFiltrar] = useState(false);
  const [idObtenerArchivo, setIdObtenerArchivo] = useState("");
  const [statusProcesado, setStatusProcesado] = useState("");
  const [selectListados, setSelectListados] = useState(1);
  const [selectSupervisor, setSelectSupervisor] = useState(1);
  const [buscar, setBuscar] = useState("");
  const [modalMostrarOcr, setModalMostrarOcr] = useState(false);
  const [actualizarDash, setActualizarDash] = useState(false);

  const handleModalOcr = () => {
    setModalMostrarOcr(!modalMostrarOcr);
  };

  const handleModalVerRespuesta = () => {
    setModalVerRespuesta(!modalVerRespuesta);
  };

  const handleModalFiltrar = () => {
    setModalFiltrar(!modalFiltrar);
  };

  const handleModalVerRol2 = () => {
    setModalVerRol2(!modalVerRol2);
  };

  const handleModalMostrarArhivos = () => {
    setModalMostrarArchivos(!modalMostrarArchivos);
  };

  const handleModalNuevoCasoRol = () => {
    setModalNuevoCasoRol(!modalNuevoCasoRol);
  };

  const handleModalNuevaEmpresa = () => {
    setModalNuevaEmpresa(!modalNuevaEmpresa);
  };

  const handleModalNuevoCasoAdmin = () => {
    setModalNuevoCasoAdmin(!modalNuevoCasoAdmin);
  };

  const handleModalNuevoCasoSuperAdmin = () => {
    setModalNuevoCasoSuperAdmin(!modalNuevoCasoSuperAdmin);
  };

  const handleModalEditarEmpresa = () => {
    setModalEditarEmpresa(!modalEditarEmpresa);
  };

  const handleModalSector = () => {
    setModalSector(!modalSector);
  };

  const handleModalEditarSector = () => {
    setModalEditarSector(!modalEditarSector);
  };

  //Guarda los usuarios en la base de datos
  const registrarEmpresa = async (nombre, cuit, direccion) => {
    const empresa = {
      nombre,
      cuit,
      direccion,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/empresas/registrar`,
        empresa,
        config
      );
      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerEmpresas = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/empresas/obtener-empresas", config);

      setListadoEmpresas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarEmpresa = async (_id, nombre, cuit, direccion) => {
    const empresaEditada = {
      nombre,
      cuit,
      direccion,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/empresas/editar-empresa/${_id}`,
        empresaEditada,
        config
      );
      toast.success("Editada Correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerSectores = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-sectores/${id}`,
        config
      );

      setSectoresEmpresas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarSector = async (_id, nombreSector, prompt) => {
    const empresaEditada = {
      nombreSector,
      prompt,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/empresas/editar-sector/${_id}`,
        empresaEditada,
        config
      );
      toast.success("Editado Correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerUsuariosPorEmpresa = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/usuarios/obtener-usuarios-por-empersa/${id}`,
        config
      );

      setUsuariosEmpresas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerUsuariosInactivosPorEmpresa = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/usuarios/obtener-usuarios-inactivos-por-empersa/${id}`,
        config
      );
      setUsuariosEmpresas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [casoAlmacenado, setCasoAlmacenado] = useState("");

  const nuevoCaso = async (id, formData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `empresas/nuevo-caso/${id}`,
        formData,
        config
      );
      console.log(data._id);
      // await procesarDocumento(data._id);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const reprocesarCasoSupervisor = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `empresas/reprocesar-caso-supervisor/${id}`,
        {},
        config
      );
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const obtenerTodosLosCasos = async () => {
    //obtiene todos los casos procesados!!
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-todos-los-casos`,
        config
      );

      setTodosLosCasos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [verTodosLosCasos, setVerTodosLosCasos] = useState([]);

  const obtenerTodosLosCasosVerTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-todos-los-casos-ver-todos`,
        config
      );

      setVerTodosLosCasos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [procesando, setProcesando] = useState([]);

  const obtenerTodosProcesando = async () => {
    //obtiene todos los casos procesando!!
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-todos-los-casos-procesando`,
        config
      );

      setProcesando(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [ingresados, setIngresados] = useState([]);

  const obtenerTodosIngresados = async () => {
    //obtiene todos los casos Ingresados!!
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-todos-los-casos-ingresados`,
        config
      );

      setIngresados(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [verificados, setVerificados] = useState([]);

  const obtenerTodosVerificados = async () => {
    //obtiene todos los casos Ingresados!!
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-todos-los-verificados`,
        config
      );

      setVerificados(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectDash, setSelectDash] = useState(1);

  const obtenerCasosPorEmpresa = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-casos-por-empresa/${id}`,
        config
      );

      setCasosPorEmpresa(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCasosProcesandoPorEmpresa = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-procesando-por-empresa/${id}`,
        config
      );

      setCasosPorEmpresa(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [datosDash, setDatosDash] = useState([]);
  const datosParaDash = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/datos-para-dash/${id}`,
        config
      );

      setDatosDash(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [dashUsuarioProcesados, setDashUsuarioProcesados] = useState([]);

  const procesadosDashUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/procesados-dash-usuario/${id}`,
        config
      );

      setDashUsuarioProcesados(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCasosProcesadosPorEmpresa = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-procesados-por-empresa/${id}`,
        config
      );

      setCasosPorEmpresa(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCasosVerificadosPorEmpresa = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-verificados-por-empresa/${id}`,
        config
      );

      setCasosPorEmpresa(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [procesandos, setprocesandos] = useState([]);
  const obtenerCasosPorEmpresaSupervisorProcesando = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-casos-por-empresa-supervisor-procesando/${id}`,
        config
      );

      setprocesandos(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [procesados, setProcesados] = useState([]);
  const obtenerCasosPorEmpresaSupervisorProcesados = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-casos-por-empresa-supervisor-procesados/${id}`,
        config
      );

      setProcesados(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [verificadosSuper, setVerificadosSuper] = useState([]);
  const obtenerCasosPorEmpresaSupervisorVerificados = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-casos-por-empresa-supervisor-verificado/${id}`,
        config
      );

      setVerificadosSuper(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCasosPorUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-casos-por-user/${id}`,
        config
      );

      setListadosCasosPorUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [file, setFile] = useState(null);

  const obtenerLink = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await clienteAxios.get(
        `/empresas/obtener-archivo/${id}`,
        config
      );
      window.open(response);
      setFile(response);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const [casosUsuario, setCasosUsuario] = useState([]);

  const obtenerCasosUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-casos-usuario/${id}`,
        config
      );

      setCasosUsuario(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [rol2, setRol2] = useState([]);

  const obtenerCasosRol2 = async (id, sector) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/empresas/obtener-rol2/${id}`,
        { sector },
        config
      );

      setRol2(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [rol3, setRol3] = useState([]);

  const obtenerCasosRol3 = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/empresas/obtener-rol3/${id}`,
        {},
        config
      );

      setRol3(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [todosCasos, setTodosCasos] = useState([]);

  const obtenerTodosLosCasosRoles = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/empresas/obtener-todos-casos-roles/${id}`,
        {},
        config
      );

      setTodosCasos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [rol3Procesados, setRol3Procesados] = useState([]);

  const obtenerCasosRol3Procesados = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/empresas/obtener-rol3-procesados/${id}`,
        {},
        config
      );

      setRol3Procesados(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [rol3Verificados, setRol3Verificados] = useState([]);

  const obtenerCasosRol3Verificados = async (id, sector) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/empresas/obtener-rol3-verificados/${id}`,
        { sector },
        config
      );

      setRol3Verificados(data);
    } catch (error) {
      console.log(error);
    }
  };

  const procesarDocumento = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/empresas/procesar-documento/${_id}`,
        {},
        config
      );
      toast.success("Documento en proceso", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const reprocesarDocumento = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/empresas/reprocesar-documento/${_id}`,
        {},
        config
      );
      toast.success("Documento Reprocesado Correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const verificarDocumento = async (id, verificacion, usuario) => {
    const info = {
      verificacion: verificacion,
      nombreUsuario: usuario,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/empresas/verificar-documento/${id}`,
        info,
        config
      );
      console.log(data);
      toast.success("Verificado Correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const guardarDocumento = async (id, verificacion, usuario) => {
    const info = {
      verificacion: verificacion,
      nombreUsuario: usuario,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/empresas/guardar-documento/${id}`,
        info,
        config
      );

      toast.success("Guardado Correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [resultadoBusqueda, setResultadoBusqueda] = useState([]);

  const busqueda = async (terminoBusqueda) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/empresas/buscar`,
        { terminoBusqueda },
        config
      );
      // console.log(data);
      setResultadoBusqueda(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [procesadosDash, setProcesadosDash] = useState([]);

  const obtenerRegistrosProcesadosDash = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/casos-por-dia-dash`,

        config
      );

      setProcesadosDash(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [porSemanaDash, setPorSemanaDash] = useState([]);

  const obtenerPorSemanaDash = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/casos-por-semana-dash`,

        config
      );

      setPorSemanaDash(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [porMesParaDash, setPorMesParaDash] = useState([]);

  const obtenerPorMesDash = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/casos-por-mes-dash`,

        config
      );

      setPorMesParaDash(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [prompt, setPrompt] = useState("");

  const obtenerPrompt = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(
        `/empresas/obtener-prompt/${id}`,
        config
      );

      setPrompt(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarPrompt = async (id, prompt) => {
    const empresa = {
      prompt,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/empresas/editar-prompt/${id}`,
        empresa,
        config
      );
      toast.success("Prompt guardado correctamente", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [respuesta, setRespuesta] = useState("");
  const chatear = async (mensaje, historial) => {
    try {
      const { data } = await clienteAxios.post(`/empresas/chat`, {
        mensaje,
        historial,
      });
      console.log(data);
      setRespuesta(data.msg);
      return data.historial; // Devuelve el historial actualizado desde el backend
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <EmpresasContext.Provider
      value={{
        reprocesarDocumento,
        handleModalNuevaEmpresa,
        modalNuevaEmpresa,
        registrarEmpresa,
        nombreEmpresa,
        setNombreEmpresa,
        cuitEmpresa,
        setCuitEmpresa,
        direccionEmpresa,
        setDireccionEmpresa,
        actualizarListados,
        setActualizarListados,
        obtenerEmpresas,
        listadoEmpresas,
        handleModalEditarEmpresa,
        modalEditarEmpresa,
        editarEmpresa,
        idEditarEmpresa,
        setIdEditarEmpresa,
        selectEntidades,
        setSelectEntidades,
        valueProfileEntidad,
        setValueProfileEntidad,
        prompt,
        setPrompt,
        nombreSector,
        setNombreSector,
        handleModalSector,
        modalSector,
        obtenerSectores,
        actualizarListadoSectores,
        setActualizarListadoSectores,
        idSector,
        setIdSector,
        editarSector,
        handleModalEditarSector,
        modalEditarSector,
        obtenerUsuariosPorEmpresa,
        usuariosEmpresas,
        setUsuariosEmpresas,
        sectoresEmpresa,
        idSectorNuevoUsuario,
        setIdSectorNuevoUsuario,
        handleModalNuevoCasoSuperAdmin,
        modalNuevoCasoSuperAdmin,
        nuevoCaso,
        comentarioCaso,
        setComentarioCAso,
        todosLosCasos,
        obtenerTodosLosCasos,
        actualizarListadoCasos,
        setActualizarListadosCasos,
        obtenerCasosPorEmpresa,
        casosPorEmpresa,
        handleModalNuevoCasoAdmin,
        modalNuevoCasoAdmin,
        obtenerCasosPorUser,
        listadoCasosPorUser,
        handleModalNuevoCasoRol,
        modalNuevoCasoRol,
        obtenerLink,
        archivo,
        setArchivo,
        casosUsuario,
        obtenerCasosUsuario,
        rol2,
        obtenerCasosRol2,
        rol3,
        obtenerCasosRol3,
        handleModalVerRol2,
        modalVerRol2,
        fechaProcesarRol2,
        setFechaProcesarRol2,
        usuarioProcesarRol2,
        setUsuarioProcesarRol2,
        statusProcesarRol2,
        setStatusProcesarRol2,
        idCasoProcesarRol2,
        setIdCasoProcesarRol2,
        handleModalVerRespuesta,
        modalVerRespuesta,
        fechaCargaAprobarDoc,
        setFechaCargaAprobarDoc,
        nombreUsuarioAprobarDoc,
        setNombreUsuarioAprobarDoc,
        respuestaAprobarDoc,
        setRespuestaAprobarDoc,
        procesarDocumento,
        setRol3,
        idDocumentoReprocesar,
        setIdDocumentoReprocesar,
        seleccion,
        setSeleccion,
        procesando,
        obtenerTodosProcesando,
        ingresados,
        obtenerTodosIngresados,
        verificarDocumento,
        idCasoVerificar,
        setIdCasoVerificar,
        verificados,
        obtenerTodosVerificados,
        handleModalFiltrar,
        modalFiltrar,
        file,
        obtenerLink,
        idObtenerArchivo,
        setIdObtenerArchivo,
        handleModalMostrarArhivos,
        modalMostrarArchivos,
        casoAlmacenado,
        statusProcesado,
        setStatusProcesado,
        verificacionAprobada,
        setVerificacionAprobada,
        guardarDocumento,
        rol3Procesados,
        obtenerCasosRol3Procesados,
        rol3Verificados,
        obtenerCasosRol3Verificados,
        selectListados,
        setSelectListados,
        obtenerTodosLosCasosVerTodos,
        verTodosLosCasos,
        resultadoChatGpt,
        setResultadoChatGpt,
        selectSupervisor,
        setSelectSupervisor,
        obtenerCasosPorEmpresaSupervisorProcesando,
        obtenerCasosPorEmpresaSupervisorProcesados,
        obtenerCasosPorEmpresaSupervisorVerificados,
        procesandos,
        procesados,
        verificadosSuper,
        buscar,
        setBuscar,
        busqueda,
        resultadoBusqueda,
        handleModalOcr,
        modalMostrarOcr,
        selectDash,
        setSelectDash,
        obtenerCasosProcesandoPorEmpresa,
        obtenerCasosProcesadosPorEmpresa,
        obtenerCasosVerificadosPorEmpresa,
        datosDash,
        datosParaDash,
        actualizarDash,
        setActualizarDash,
        procesadosDash,
        obtenerRegistrosProcesadosDash,
        porSemanaDash,
        obtenerPorSemanaDash,
        porMesParaDash,
        obtenerPorMesDash,
        reprocesarCasoSupervisor,
        dashUsuarioProcesados,
        procesadosDashUsuario,
        todosCasos,
        obtenerTodosLosCasosRoles,
        prompt,
        obtenerPrompt,
        editarPrompt,
        obtenerUsuariosInactivosPorEmpresa,
        chatear,
        respuesta,
      }}
    >
      {children}
    </EmpresasContext.Provider>
  );
};

export { EmpresasProvider };

export default EmpresasContext;

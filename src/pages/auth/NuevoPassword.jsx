import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import fondo from "../../../public/img/fondo-mano-robot-3d-vista-lateral-tecnologia-ai.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "@/configs/clinteAxios";
import useAuth from "@/hooks/useAuth";
import Cargando from "@/components/Cargando";

export function NuevoPassword() {
  const params = useParams();
  const [tokenValido, setTokenValido] = useState(false);
  const { token } = params;
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [passwordModificado, setPasswordModificado] = useState(false);
  const navigate = useNavigate();
  const { handleCargando } = useAuth();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/crear-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async () => {
    if (password != repetirPassword) {
      toast.error("Las contraseñas no coinciden", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("El password es muy corto, minimo 6 caracteres", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      handleCargando();
      const { data } = await clienteAxios.post(url, { password });
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
      setPasswordModificado(true);
      setPassword("");
      setRepetirPassword("");
      handleCargando();
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 3000,
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
    <>
      <img
        src={fondo}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <ToastContainer pauseOnFocusLoss={false} />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Nueva Contraseña
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Password"
              size="lg"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Repetir Password"
              size="lg"
              value={repetirPassword}
              type="password"
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Guardar
            </Button>
          </CardFooter>
        </Card>
        <Cargando />
      </div>
    </>
  );
}

export default NuevoPassword;

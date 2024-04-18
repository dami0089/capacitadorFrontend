import { Link } from "react-router-dom";
import { useState } from "react";
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

export function SignUp() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if ([nombre, apellido, email].includes("")) {
      toast("⚠️ Todos los campos son obligatorios!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast("⚠️ Email invalido", {
        position: "top-right",
        autoClose: 1500,
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
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        apellido,
        email,
      });
      // setAlerta({
      //   msg: data.msg,
      //   error: false,
      // });
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
      setNombre("");
      setApellido("");
      setEmail("");
      setCheck(false);
      setTimeout(() => {
        // setAlerta({});
      }, 1200);
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
            <Typography variant="h3" color="white" className="uppercase">
              Registrarse
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Nombre"
              type="text"
              size="lg"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <Input
              label="Apellido"
              type="text"
              size="lg"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
            <Input
              type="email"
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Registrar
            </Button>
            {/* <Typography variant="small" className="mt-6 flex justify-center">
              Ya tenes cuenta?
              <Link to="/">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Iniciar sesion
                </Typography>
              </Link>
            </Typography> */}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;

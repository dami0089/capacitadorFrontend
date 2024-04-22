import Cargando from "@/components/Cargando";
import useAuth from "@/hooks/useAuth";
import useEmpresas from "@/hooks/useEmpresas";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { marked } from "marked";
import './ToggleButton.css';

export function Home() {
  const prompt_comprador = "Necesito que actúes como si fueses un comprador. Iniciare la conversacion saludando. Deberemos interactuar, por lo tanto tendras que esperar mis respuestas a tus consultas. Te asesorare en todo el proceso de compra y cuando sientas que tienes lo que buscabas, necesito que le des un cierre a la conversacion e inicies una despedida"
  const prompt_vendedor = "Actua como si fueses un vendedor de la empresa 'retail-next' que esta interesado en vender típico de un retail. Interactua haciendo las consultas técnicas necesarias para poder vender una notebook. Retail_next vende: Notebook Lenovo, Notebook HP, Notebook Apple, Notebook Samsung. No vende ninguna otra marca de notebook. Siempre lo prioritario es ofrecer Samsung. La notebook Apple es la ultima que la empresa prefiere vender. Cuando interactues quiero que le preguntes al usuario para que la necesita para entender la capacidad de la notebook. Si te das cuenta que el usuario esta consultando por un producto que no es de “retail-next” necesito que contestes “No es un producto de retail-next”. Cuando consultes no hace falta que expliques todo, simplemente limítate a hace la consulta."
  const [mensajesEnviados, setMensajesEnviados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { chatear, respuesta } = useEmpresas();
  const { handleCargando } = useAuth();
  const [historial, setHistorial] = useState([
    {
      remitente: "Usuario",
      contenido: prompt_vendedor,
    },
  ]);
  const [modoVendedor, setModoVendedor] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [mensajesEnviados]);
  const endOfMessagesRef = useRef(null); // Nueva referencia

  useEffect(() => {
    if (respuesta) {
      setMensajesEnviados((mensajesAnteriores) => [
        ...mensajesAnteriores,
        { remitente: "Respuesta", contenido: respuesta },
      ]);
    }
  }, [respuesta]);

  const handleEnviarMensaje = async (e) => {
    e.preventDefault();
    if (mensaje.trim() !== "") {
      handleCargando();
      const historialActualizado = await chatear(mensaje, historial);
      setMensajesEnviados((mensajesAnteriores) => [
        ...mensajesAnteriores,
        { remitente: "Usuario", contenido: mensaje },
      ]);
      if (historialActualizado) {
        setHistorial(historialActualizado);
      }
      setMensaje("");
      handleCargando();
    } else {
      toast.error("Por favor, ingresa un mensaje válido");
    }
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensajesEnviados]);

  const toggleModo = () => {
    setModoVendedor((prevModo) => !prevModo); //cambio el nombre en el boton
    if (modoVendedor){
      prompt = prompt_vendedor
    }else{
      prompt = prompt_comprador
    }
    setHistorial([{
      remitente: "Usuario",
      contenido: prompt ,
    }]); // reinicio la conversacion segun el prompt
    setMensajesEnviados([]); // limpio los mensajes enviados
  };

  return (
    <>
      <div className="h-auto w-full pl-48 pr-48 sm:flex sm:items-start">
        <div className="mt-3 w-full text-center sm:ml-0 sm:mt-0 sm:text-left">
          <ToastContainer pauseOnFocusLoss={false} />
          {/* Contenedor de mensajes con ajuste de altura y margen */}
          <div className="relative  mt-4 flex h-[calc(90vh-200px)] flex-col-reverse overflow-y-auto">
            {mensajesEnviados
              .slice()
              .reverse()
              .map((mensaje, index) => (
                <div
                  key={index}
                  className={`mb-2 flex ${
                    mensaje.remitente === "Usuario"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-md p-2 text-lg font-bold text-gray-800 ${
                      mensaje.remitente === "Usuario"
                        ? "bg-blue-50 bg-opacity-90"
                        : "bg-yellow-50 bg-opacity-90"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(mensaje.contenido),
                    }}
                  ></div>
                </div>
              ))}
          </div>

          <div className="flex w-full items-center">
            <form
              className="ml-2 mr-2 mt-2 flex-grow"
              onSubmit={handleEnviarMensaje}
            >
              <textarea
                id="mensaje"
                placeholder="Escribe tu mensaje"
                className="w-full resize-none rounded-md border-2 border-black bg-black bg-opacity-50 font-bold text-white  placeholder-gray-400"
                rows={5}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleEnviarMensaje(e)
                }
              />
            </form>
            <Button
              className="mb-2 mr-2 h-16 flex-shrink p-4"
              type="submit"
              onClick={handleEnviarMensaje}
            >
              <PaperAirplaneIcon className="h-8 w-8 text-white" />
            </Button>
          </div>
          <Button
            className="mb-2 mr-2 h-16 flex-shrink p-4"
            type="button"
            onClick={toggleModo}
          >
            {modoVendedor ? "Modo Comprador" : "Modo Vendedor"}
          </Button>

        </div>
      </div>

      <Cargando />
    </>
  );
}

export default Home;

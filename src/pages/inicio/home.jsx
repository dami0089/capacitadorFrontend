import Cargando from "@/components/Cargando";
import useAuth from "@/hooks/useAuth";
import useEmpresas from "@/hooks/useEmpresas";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { marked } from "marked";

export function Home() {
  const [mensajesEnviados, setMensajesEnviados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { chatear, respuesta } = useEmpresas();
  const { handleCargando } = useAuth();
  const [historial, setHistorial] = useState([
    {
      remitente: "Usuario",
      contenido: `Necesito que actúes como si fueses un comprador. Iniciare la conversacion saludando. Deberemos interactuar, por lo tanto tendras que esperar mis respuestas a tus consultas. Te asesorare en todo el proceso de compra y cuando sientas que tienes lo que buscabas, necesito que le des un cierre a la conversacion e inicies una despedida`,
    },
  ]);

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
        </div>
      </div>

      <Cargando />
    </>
  );
}

export default Home;

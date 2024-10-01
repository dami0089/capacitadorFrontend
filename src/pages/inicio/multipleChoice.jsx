import React, { useState, useEffect } from "react";
import useEmpresas from "@/hooks/useEmpresas";
import { motion } from "framer-motion"; // Para las animaciones
import useAuth from "@/hooks/useAuth";
import Cargando from "@/components/Cargando";

export function MultipleChoice() {
  const { preguntas, obtenerPreguntas } = useEmpresas();
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Para almacenar las respuestas seleccionadas
  const [showResult, setShowResult] = useState(false); // Para manejar la visualización del resultado
  const [correctAnswers, setCorrectAnswers] = useState(0); // Para contar respuestas correctas
  const [incorrectAnswers, setIncorrectAnswers] = useState(0); // Para contar respuestas incorrectas
  const { handleCargando } = useAuth();

  useEffect(() => {
    const conseguirPreguntas = async () => {
      handleCargando();
      await obtenerPreguntas();
      handleCargando();
    };
    conseguirPreguntas();
  }, []);

  // Manejar la selección de respuesta
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(updatedAnswers);
  };

  // Manejar la confirmación de respuestas y calcular resultados
  const handleSubmit = () => {
    let correct = 0;
    let incorrect = 0;

    preguntas.forEach((pregunta, index) => {
      if (selectedAnswers[index] === parseInt(pregunta.respuesta)) {
        correct++;
      } else {
        incorrect++;
      }
    });

    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
    setShowResult(true); // Mostrar resultados
  };

  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: `url('img/vendedores2.jpeg')`,
      }}
    >
      <h1 className="mb-8 text-center text-3xl font-bold text-white">Trivia</h1>
      {/* Mostrar el resultado después de la corrección */}
      {showResult && (
        <div className=" flex items-center justify-center">
          <div className="mb-4 w-[250px] items-center justify-between rounded-3xl bg-white p-4 text-center text-black opacity-95 shadow-2xl">
            <p className="text-lg font-bold">Correctos: {correctAnswers}</p>
            <p className="text-lg font-bold">Incorrectos: {incorrectAnswers}</p>
          </div>
        </div>
      )}

      {preguntas && preguntas.length > 0 ? (
        <div className="space-y-6">
          {preguntas.map((pregunta, questionIndex) => (
            <motion.div
              key={questionIndex}
              className="rounded-lg bg-white bg-opacity-90 p-4 shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-lg font-bold">{pregunta.pregunta}</h2>
              <div className="space-y-2">
                {pregunta.opciones.map((opcion, optionIndex) => (
                  <motion.button
                    key={optionIndex}
                    onClick={() =>
                      handleAnswerSelect(questionIndex, optionIndex)
                    }
                    whileHover={{ scale: 1.05 }}
                    className={`w-full rounded-lg border-2 p-2 ${
                      showResult
                        ? optionIndex === parseInt(pregunta.respuesta)
                          ? "border-green-500 bg-green-200"
                          : selectedAnswers[questionIndex] === optionIndex
                          ? "border-red-500 bg-red-200"
                          : "border-gray-300"
                        : selectedAnswers[questionIndex] === optionIndex
                        ? "border-blue-500 bg-blue-200"
                        : "border-gray-300"
                    }`}
                  >
                    {opcion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}

          {!showResult && (
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.05 }}
              className="w-full rounded-lg bg-blue-500 p-3 text-white shadow-lg"
            >
              Enviar Respuestas
            </motion.button>
          )}
        </div>
      ) : (
        <p className="text-center text-black">Cargando preguntas...</p>
      )}
      <Cargando />
    </div>
  );
}

export default MultipleChoice;

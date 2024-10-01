import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import { Document, Page } from "react-pdf";

const backend = import.meta.env.VITE_BACKEND_URL;

const PDFViewer = () => {
  const [pdfUrl, setPdfUrl] = useState(null); // URL para el PDF
  const [numPages, setNumPages] = useState(null); // Total de páginas
  const [pageNumber, setPageNumber] = useState(1); // Página actual
  const [loadingPage, setLoadingPage] = useState(false); // Control de carga de página

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(`${backend}/api3/empresas/ver-pdf`, {
          headers: {
            "Content-Type": "application/pdf",
          },
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url); // Establecemos la URL del PDF para el visor
      } catch (error) {
        console.error("Error al obtener el PDF:", error);
      }
    };

    fetchPdf();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages); // Establecemos el número total de páginas
  };

  const changePage = (offset) => {
    setLoadingPage(true);
    setPageNumber((prevPageNumber) => prevPageNumber + offset); // Cambia la página actual
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      changePage(-1); // Cambia a la página anterior
    }
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      changePage(1); // Cambia a la página siguiente
    }
  };

  const onPageLoadSuccess = () => {
    setLoadingPage(false); // Desactiva el estado de carga cuando la página está lista
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      {pdfUrl ? (
        <>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex justify-center"
          >
            {loadingPage && <p>Cargando página...</p>}
            <Page
              pageNumber={pageNumber}
              height={800}
              scale={1.5}
              onLoadSuccess={onPageLoadSuccess}
              renderMode="svg" // Usamos SVG como modo de renderizado
              renderTextLayer={false} // Desactivar la capa de texto
              renderAnnotationLayer={false} // Desactivar la capa de anotaciones
            />
          </Document>
          <div className="mt-4 flex">
            <button
              onClick={previousPage}
              disabled={pageNumber <= 1 || loadingPage}
              className="mx-2 rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
            >
              Página anterior
            </button>
            <p>
              Página {pageNumber} de {numPages}
            </p>
            <button
              onClick={nextPage}
              disabled={pageNumber >= numPages || loadingPage}
              className="mx-2 rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
            >
              Página siguiente
            </button>
          </div>
        </>
      ) : (
        <p>Cargando PDF...</p>
      )}
    </div>
  );
};

export default PDFViewer;

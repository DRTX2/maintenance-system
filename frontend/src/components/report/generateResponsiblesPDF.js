import { jsPDF } from "jspdf";
import "jspdf-autotable";

const calculateCenter = (doc, text) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(text);
  const x = (pageWidth - textWidth) / 2;
  return x;
};

const generateResponsiblesPDF = () => {
  const doc = new jsPDF();

  // El titulo
  doc.setFont("helvetica", "bold");
  doc.text(
    "Historial de mantenimientos",
    calculateCenter(doc, "Historial de mantenimientos"),
    20
  );

  // La parte del encabezado del responsable
  doc.setFontSize(10);
  // text, x, y
  doc.setFont("helvetica", "bold");
  doc.text("Cedula:", 10, 30);
  doc.setFont("helvetica", "normal");
  doc.text("111111111", 25, 30);
  doc.setFont("helvetica", "bold");
  doc.text("Nombre y apellidos:", 10, 40);
  doc.setFont("helvetica", "normal");
  doc.text("David Manjarres", 48, 40);
  doc.setFont("helvetica", "bold");
  doc.text("Mantenimientos desde", 10, 50);
  doc.setFont("helvetica", "normal");
  doc.text("05/05/2018", 50, 50);
  doc.setFont("helvetica", "bold");
  doc.text("hasta", 70, 50);
  doc.setFont("helvetica", "normal");
  doc.text("05/05/2022", 83, 50);
  doc.setFont("helvetica", "bold");
  doc.text("3", 105, 50);

  const columns = [
    "Fecha",
    "Código",
    "Tipo",
    "Código activo",
    "Tareas realizadas",
    "Observaciones",
    "Componentes reemplazados",
  ];

  const rows = [
    [
      "6/1/2025",
      "MAT-01",
      "Preventivo",
      "ACT-01",
      [["Limpieza", "Reparación"].join(", ")],
      [["No hubo", "Mas o menos"].join(", ")],
      [["Tarjeta gráfica", "Procesador"].join(", ")],
    ],
  ];

  // En caso de que estuviese vacio.
  // doc.setFont("helvetica", "normal");
  // doc.text(
  //   "No se encontraron registros de mantenimientos realizados por este responsable en el período seleccionado.",
  //   calculateCenter(
  //     doc,
  //     "No se encontraron registros de mantenimientos realizados por este responsable en el período seleccionado."
  //   ),
  //   60
  // );

  doc.autoTable({
    head: [columns],
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
    body: rows,
    bodyStyles: { fillColor: [255, 255, 255], textColor: [20, 24, 20] },
    tableWidth: "auto",
    startY: 60,
    theme: "grid",
    styles: {
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
  });

  doc.save("reporte.pdf");
};

export default generateResponsiblesPDF;

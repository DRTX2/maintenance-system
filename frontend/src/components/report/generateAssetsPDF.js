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
  doc.text("Código de ingreso:", 10, 30);
  doc.setFont("helvetica", "normal");
  doc.text("IN_01", 43, 30);
  doc.setFont("helvetica", "bold");
  doc.text("Código de activo:", 10, 40);
  doc.setFont("helvetica", "normal");
  doc.text("ACT-05", 42, 40);
  doc.setFont("helvetica", "bold");
  doc.text("Número de seríe:", 10, 50);
  doc.setFont("helvetica", "normal");
  doc.text("123456", 40, 50);

  const columns = [
    "Fecha",
    "Código",
    "Tipo",
    "Cédula del responsable",
    "Tareas realizadas",
    "Observaciones",
    "Componentes reemplazados",
  ];

  const rows = [
    [
      "13/08/2024 - 18/08/2022",
      "MAT-01",
      "Preventivo",
      "1800000000",
      [["Limpieza", "Reparación"].join(", ")],
      [["No hubo", "Mas o menos"].join(", ")],
      [["Tarjeta gráfica", "Procesador"].join(", ")],
    ],
  ];

  // En caso de que estuviese vacio.
  // doc.setFont("helvetica", "normal");
  // doc.text(
  //   "Este activo no cuenta con mantenimienetos registrados.",
  //   calculateCenter(
  //     doc,
  //     "Este activo no cuenta con mantenimienetos registrados."
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

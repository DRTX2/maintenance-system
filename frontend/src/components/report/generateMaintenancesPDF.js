import { jsPDF } from "jspdf";
import "jspdf-autotable";

const calculateX = (doc, text) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(text);
  const x = (pageWidth - textWidth) / 2;
  return x;
};

const generateResponsiblesPDF = (results) => {
  const doc = new jsPDF();

  const columns = ["Código", "Número de serie", "2021", "2022", "2025"];

  doc.setFont("helvetica", "bold");
  doc.text(
    "Historial de mantenimientos",
    calculateX(doc, "Historial de mantenimientos"),
    20
  );

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Cumplidos", 10, 30);

  const rows2 = [["ACT-01", "11111111", "Realizado", "Realizado", "Realizado"]];
  if (rows2.length !== 0) {
    console.log("sdfsd");
    doc.autoTable({
      head: [columns],
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
      body: rows2,
      bodyStyles: { fillColor: [255, 255, 255], textColor: [20, 24, 20] },
      tableWidth: "auto",
      startY: 40,
      theme: "grid",
      styles: {
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
    });
  } else {
    doc.text("No se encontraron activos para evaluar.", 10, 40);
  }

  doc.text("En proceso", 10, doc.lastAutoTable.finalY + 10);
  doc.autoTable({
    head: [columns],
    body: rows2,
    startY: doc.lastAutoTable.finalY + 15,
  });
  doc.text("Incumplidos", 10, 30);


  doc.save("reporte.pdf");
};

export default generateResponsiblesPDF;

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";

const calculateCenter = (doc, text) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(text);
  const x = (pageWidth - textWidth) / 2;
  return x;
};

const generateResponsiblesPDF = (results) => {
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
  doc.text(results[0].asset.income, 43, 30); 
  doc.setFont("helvetica", "bold");
  doc.text("Código de activo:", 10, 40);
  doc.setFont("helvetica", "normal");
  doc.text(results[0].asset.cod_ass, 42, 40);
  doc.setFont("helvetica", "bold");
  doc.text("Número de seríe:", 10, 50);// no hay
  doc.setFont("helvetica", "normal");
  doc.text(results[0].asset.ser_num_ass, 40, 50);

  const columns = [
    "Fecha",
    "Código",
    "Tipo",
    "Cédula del responsable", // hice una busqueda pero toca modificar el back para que me lo de
    "Tareas realizadas",
    "Observaciones",
    "Componentes reemplazados",
  ];

  const rows = results.map((result) => [
    // Fechas formateadas
    `${
      dayjs(result.created_at).isValid()
        ? dayjs(result.created_at).format("YYYY-MM-DD HH:mm:ss")
        : "N/A"
    } - ${
      dayjs(result.ended_at).isValid()
        ? dayjs(result.ended_at).format("YYYY-MM-DD HH:mm:ss")
        : "N/A"
    }`,
  
    // Otros campos con fallback a "N/A"
    result.cod_main || "N/A",
    result.type || "N/A",
    result.dni_res || "N/A",
  
    // Actividades, observaciones y componentes reemplazados
    (result?.asset?.activities || [])
      .map((a) => a.act_main)
      .join("\n"),
  
    (result?.asset?.observations || [])
      .map((o) => o.des_obs)
      .join("\n"),
  
    (result?.asset?.replaced_components || [])
      .map((c) => `${c.nam_com}: ${c.des_rep_com}`)
      .join("\n.")
  ]);
  
    if (rows.length === 0) {
      // Si no hay datos
      doc.setFont("helvetica", "normal");
      doc.text(
        "No se encontraron registros de mantenimientos realizados por este responsable en el período seleccionado.",
        calculateCenter(
          doc,
          "No se encontraron registros de mantenimientos realizados por este responsable en el período seleccionado."
        ),
        60
      );
    } else {
      // Generar la tabla
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 70,
        theme: "grid",
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
      });
    }
  

  doc.save("reporte.pdf");
};

export default generateResponsiblesPDF;

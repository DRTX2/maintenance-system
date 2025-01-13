import { jsPDF } from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";

const calculateCenter = (doc, text) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(text);
  const x = (pageWidth - textWidth) / 2;
  return x;
};

const generateResponsiblesPDF = (responsibleData, results, inicio, fin) => {
  console.log("Datos para el PDF:");
  console.log("Cédula:", responsibleData.dni_res);
  console.log("Resultados:", results);
  console.log("Fecha inicio:", inicio);
  console.log("Fecha fin:", fin);

  const doc = new jsPDF();

  // Título
  doc.setFont("helvetica", "bold");
  doc.text(
    "Historial de mantenimientos",
    calculateCenter(doc, "Historial de mantenimientos"),
    20
  );

  // Información del encabezado
  const responsable = responsibleData.nam_res + responsibleData.las_res;
  console.log(`${responsibleData.nam_res}+ ${responsibleData.las_res}`);

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Cédula:", 10, 30);
  doc.setFont("helvetica", "normal");
  doc.text(responsibleData.dni_res, 25, 30);
  doc.setFont("helvetica", "bold");
  doc.text("Nombre y apellidos:", 10, 40);
  doc.setFont("helvetica", "normal");
  doc.text(responsable, 48, 40);
  doc.setFont("helvetica", "bold");
  doc.text("Mantenimientos desde", 10, 50);
  doc.setFont("helvetica", "normal");
  doc.text(inicio, 50, 50);
  doc.setFont("helvetica", "bold");
  doc.text("hasta", 70, 50);
  doc.setFont("helvetica", "normal");
  doc.text(fin, 83, 50);

  // Columnas de la tabla
  const columns = [
    "Fecha",
    "Código",
    "Tipo",
    "Código activo",
    "Tareas realizadas",
    "Observaciones",
    "Componentes reemplazados",
  ];

  // Filas de la tabla

  const rows = results.map((result) => [
    // Formatear created_at con fallback a "N/A"
    dayjs(result.created_at).isValid()
      ? dayjs(result.created_at).format("YYYY-MM-DD HH:mm:ss")
      : "N/A",

    // Formatear ended_at con fallback a "N/A"
    dayjs(result.ended_at).isValid()
      ? dayjs(result.ended_at).format("YYYY-MM-DD HH:mm:ss")
      : "N/A",

    // Otros campos
    result.cod_main || "N/A",
    result.type || "N/A",
    result.details?.[0]?.asset?.cod_ass || "N/A",

    // Listas de actividades, observaciones y componentes reemplazados
    (result.details || [])
      .flatMap((detail) => detail.asset?.activities || [])
      .map((a) => a.act_main)
      .join("\n"),

    // Todas las observaciones de todos los detalles
    (result.details || [])
      .flatMap((detail) => detail.asset?.observations || [])
      .map((o) => o.des_obs)
      .join("\n"),

    // Todos los componentes reemplazados de todos los detalles
    (result.details || [])
      .flatMap((detail) => detail.asset?.replaced_components || [])
      .map((c) => `${c.nam_com}: ${c.des_rep_com}`)
      .join("\n."),
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

  // Guardar el archivo PDF
  doc.save("reporte.pdf");
};

export default generateResponsiblesPDF;

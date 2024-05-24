const OrdenPago = require("../models/OrdenesPago");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require('path')

const OrdenPagoController = {
  async crearOrden(req, res) {
    try {
      const nuevaOrden = await OrdenPago.crearOrden(req.body);
      res.status(201).json(nuevaOrden);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async obtenerTodasLasOrdenes(req, res) {
    try {
      const ordenes = await OrdenPago.obtenerTodasLasOrdenes();
      res.json(ordenes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async obtenerOrdenPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const orden = await OrdenPago.obtenerOrdenPorId(id);
      res.json(orden);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async borrarOrden(req, res){
    try {
      const id = req.params.id;
      const result = await OrdenPago.deleteOrden(id);
      if (result > 0) {
          res.status(200).json({ message: 'Orden de Pago eliminada con éxito' });
      } else {
          res.status(404).json({ message: 'Orden de Pago no encontrada' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la orden de pago' });
  }
  },

  async generarPDF(req, res) {
    try {
      const id = parseInt(req.params.id);
      const ordenPago = await OrdenPago.obtenerOrdenPorId(id);
  
      const outputDirectory = path.join(__dirname, "..", "..", "ordenes");
  
      if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
      }
  
      const outputFilename = `orden_pago_${id}.pdf`;
      const outputPath = path.join(outputDirectory, outputFilename);
  
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });
  
      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);
        
      // Ahora continúa con el resto del encabezado
      doc.fontSize(18)
       .text("Orden de Pago", { align: "center", underline: true })
       .moveDown(1);
  
      let fechaCreacion = new Date(ordenPago.fecha_creacion).toLocaleDateString(); // Convierte a formato local

      doc
       .fontSize(12)
       .text(`Fecha: ${fechaCreacion}`, { align: "right" })
       .moveDown(1);
  
      // Tabla de detalles
      const tableTop = 250;
      const columnWidth = 250;
      const leftMargin = 50;
      const rightMargin = leftMargin + columnWidth;
  
      // Encabezados de la tabla
      doc
        .fontSize(12)
        .fillColor('black')
        .text('Descripción', leftMargin, tableTop, { bold: true })
        .text('Detalle', rightMargin, tableTop, { bold: true })
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveDown(0.5);
  
      // Línea debajo de los encabezados
      doc
        .moveTo(leftMargin, tableTop + 20)
        .lineTo(rightMargin + columnWidth, tableTop + 20)
        .stroke();
  
      // Datos de la tabla
      const itemDescriptions = [
        ["Financiamiento", ordenPago.financiamiento],
        ["Razón Social", ordenPago.razon_social],
        ["RIF/C.I", ordenPago.rif_ci],
        ["Dirección", ordenPago.direccion],
        ["Concepto", ordenPago.concepto],
        ["Tipo de Operación", ordenPago.tipo_op],
        ["Seguro Social Obligatorio", ordenPago.seguro_social_obligatorio],
        ["Seguro para Forzoso", ordenPago.seguro_para_forzoso],
        ["Fondo Jubilación", ordenPago.fondo_jubilacion],
        ["FAOV", ordenPago.faov],
        ["Retención IVA", ordenPago.retencion_iva],
        ["Retención Timbre Fiscal", ordenPago.retencion_timbre_fiscal],
        ["Total Retenciones", ordenPago.total_retenciones],
        ["Monto Neto a Pagar", ordenPago.monto_neto_pagar],
        ["Monto en Bs. Letras", ordenPago.monto_bs_letras],
        ["Cargo Banco", ordenPago.cargo_banco],
        ["Total", ordenPago.total],
      ];
  
      let y = tableTop + 30;
      itemDescriptions.forEach(([description, detail]) => {
        doc
          .fontSize(10)
          .fillColor('black')
          .text(description, leftMargin, y)
          .text(detail, rightMargin, y);
        y += 20;
      });
  
      // Línea al final de la tabla
      doc
        .moveTo(leftMargin, y)
        .lineTo(rightMargin + columnWidth, y)
        .stroke();
  
      // Finalizar el documento
      doc.end();
      stream.on("finish", function () {
        console.log(`PDF generado y guardado en: ${outputPath}`);
        res.status(200).sendFile(outputPath);
      });
    } catch (error) {
      console.error(`Error al generar el PDF para la orden de pago ${id}:`, error);
      res.status(500).json({ error: error.message });
    }
  }
  
  
};

module.exports = OrdenPagoController;

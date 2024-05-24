import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const Orden = () => {
  const params = useParams();
  const initialRifCi = params.cedula || "";
 const [financiamiento, setFinanciamiento] = useState("");
 const [razonSocial, setRazonSocial] = useState("");
 const [rifCi, setRifCi] = useState(initialRifCi);
 const [direccion, setDireccion] = useState("");
 const [concepto, setConcepto] = useState("");
 const [tipoOp, setTipoOp] = useState("");
 const [seguroSocialObligatorio, setSeguroSocialObligatorio] = useState(0);
 const [seguroParaForzoso, setSeguroParaForzoso] = useState(0);
 const [fondoJubilacion, setFondoJubilacion] = useState(0);
 const [faov, setFaov] = useState(0);
 const [retencionIva, setRetencionIva] = useState("");
 const [retencionTimbreFiscal, setRetencionTimbreFiscal] = useState(0);
 const [totalRetenciones, setTotalRetenciones] = useState("");
 const [montoNetoPagar, setMontoNetoPagar] = useState("");
 const [montoBsLetras, setMontoBsLetras] = useState("");
 const [cargoBanco, setCargoBanco] = useState("");
 const [total, setTotal] = useState("");
 const [x, setX] = useState(1.1153);
 const navigate = useNavigate();

 useEffect(() => {
  if (total) {
    const montoNetoPagar = parseFloat(total) / x;
    const retencionIva =  parseFloat(total) - parseFloat(montoNetoPagar);
    const totalRetenciones = parseFloat(total) - parseFloat(montoNetoPagar);

    // Actualizar los estados con los nuevos valores calculados
    setMontoNetoPagar(montoNetoPagar.toFixed(2));
    setRetencionIva(retencionIva.toFixed(2));
    setTotalRetenciones(totalRetenciones.toFixed(2));
  }
}, [total, x]); // Dependencias del efecto

 const handleSubmit = async (event) => {
    event.preventDefault();

    const ordenData = {
      financiamiento,
      razon_social: razonSocial,
      rif_ci: rifCi,
      direccion,
      concepto,
      tipo_op: tipoOp,
      seguro_social_obligatorio: seguroSocialObligatorio,
      seguro_para_forzoso: seguroParaForzoso,
      fondo_jubilacion: fondoJubilacion,
      faov,
      retencion_iva: retencionIva,
      retencion_timbre_fiscal: retencionTimbreFiscal,
      total_retenciones: totalRetenciones,
      monto_neto_pagar: montoNetoPagar,
      monto_bs_letras: montoBsLetras,
      cargo_banco: cargoBanco,
      total,
    };

    try {
      const response = await fetch("http://localhost:3000/ordenes_pago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ordenData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar la orden de pago");
      }

      const result = await response.json();
      console.log(result);
      navigate('/ListadoOrdenes');
    } catch (error) {
      console.error(error);
    }
 };

 const handleCancel = () => {
  navigate(-1);
};

 return (
  <Paper elevation={3} sx={{ padding: 2, margin: 'auto', width: '80%', maxWidth: 500 }}>
    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ORDEN DE PAGO
      </Typography>
      <TextField label="Financiamiento" value={financiamiento} onChange={e => setFinanciamiento(e.target.value)} required fullWidth />
      <TextField label="Razón Social" value={razonSocial} onChange={e => setRazonSocial(e.target.value)} required fullWidth />
      <TextField label="RIF O CI" value={rifCi} disabled onChange={e => setRifCi(e.target.value)} required fullWidth />
      <TextField label="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} required fullWidth />
      <TextField label="Por concepto de" value={concepto} onChange={e => setConcepto(e.target.value)} required fullWidth />
      <TextField label="Tipo de O/P" value={tipoOp} onChange={e => setTipoOp(e.target.value)} required fullWidth />
      <TextField label="Seguro social obligatorio" disabled type="number" value={seguroSocialObligatorio} onChange={e => setSeguroSocialObligatorio(e.target.value)} required fullWidth />
      <TextField label="Seguro de para forzoso" disabled type="number" value={seguroParaForzoso} onChange={e => setSeguroParaForzoso(e.target.value)} required fullWidth />
      <TextField label="Fondo de jubilacion" disabled type="number" value={fondoJubilacion} onChange={e => setFondoJubilacion(e.target.value)} required fullWidth />
      <TextField label="FAOV" type="number" disabled value={faov} onChange={e => setFaov(e.target.value)} required fullWidth />
      <TextField label="Retención de IVA" disabled type="number" value={retencionIva} onChange={e => setRetencionIva(e.target.value)} required fullWidth />
      <TextField label="Retención de timbre fiscal" disabled type="number" value={retencionTimbreFiscal} onChange={e => setRetencionTimbreFiscal(e.target.value)} required fullWidth />
      <TextField label="Total de retenciones" disabled type="number" value={totalRetenciones} onChange={e => setTotalRetenciones(e.target.value)} required fullWidth />
      <TextField label="Monto neto a pagar" disabled type="number" value={montoNetoPagar} onChange={e => setMontoNetoPagar(e.target.value)} required fullWidth />
      <TextField label="Monto en BS (letras)" value={montoBsLetras} onChange={e => setMontoBsLetras(e.target.value)} required fullWidth />
      <TextField label="Cargo a banco" value={cargoBanco} onChange={e => setCargoBanco(e.target.value)} required fullWidth />
      <TextField label="Total" type="number" value={total} onChange={e => setTotal(e.target.value)} required fullWidth />
      <Button variant="contained" color="primary" type="submit">
          Registrar
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>
          Cancelar
        </Button>
    </Box>
        </Paper>
 );
};

export default Orden;
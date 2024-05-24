import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';

export default function Principal() {
 return (
   <React.Fragment>        
    <Navbar />
       <Container maxWidth="lg" sx={{ height: 'calc(100vh - 64px)', overflow: 'auto', mt: '10px'}}>
         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 2 }}>
           <Card sx={{ flex: '1 0 275px', marginBottom: 2, marginRight: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <picture>
               <source srcSet="/mision.png" type="image/png" />
               <img src="mision.jpg" alt="Misión" style={{ width: '100%', height: 200 }} />
             </picture>
             <CardContent>
               <Typography variant="h5" component="div">
                 Misión
               </Typography>
               <Typography variant="body2">
                 Aplicar medidas de inclusión en lo económico, lo productivo, en lo social y cultural, que adquiere a la consolidación del Estado comunal, para garantizar la mayor suma de felicidad posible, teniendo como eje central los objetivos contenidos en el Plan de la Patria 2019-2025, para que el municipio Pampán sea un municipio modelo.
               </Typography>
             </CardContent>
           </Card>
           <Card sx={{ flex: '1 0 275px', marginBottom: 2, marginRight: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <picture>
               <source srcSet="/vision.png" type="image/jpeg" />
               <img src="vision.jpg" alt="Visión" style={{ width: '100%', height: 200 }} />
             </picture>
             <CardContent>
               <Typography variant="h5" component="div">
                 Visión
               </Typography>
               <Typography variant="body2">
                 Hacer que la AMP fije los cimientos sobre bases sólidas que sirva como brazo articulador que vaya de la mano con su pueblo, con sus problemas, y sea parte de la solución colectiva de inclusión. Que se traduzca en una mejor calidad de vida bajo los principios de sostenibilidad, eficiencia, eficacia y transparencia con el firme propósito de hacer las más prósperas, humanas y perdurables en el tiempo, enmarcada siempre en una visión futurista de productividad municipal.
               </Typography>
             </CardContent>
           </Card>
         </Box>
       </Container>
     </React.Fragment>
 );
 }
import { Document, Page, Text, View, pdf, StyleSheet, Image} from "@react-pdf/renderer";
import logo from "../src/assets/logo.png";
import Swal from 'sweetalert2';


const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: "40px",
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: "20px",
    borderSpacing: "0px",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "red",
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableHeaderCell: {
    margin: "5px",
    fontSize: "12pt",
    fontWeight: "bold",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  tableCell: {
    margin: "5px",
    fontSize: "12pt",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  heading: {
    fontSize: "18pt",
    fontWeight: "bold",
    marginBottom: "10pt",
  },
  image: {
    width: 75,
    height: 50,
    marginBottom: 10
  },
  thanksContainer: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    marginRight: 20,
  },
  thanksText: {
    color: 'white',
    fontSize: 16,
  },
  thanksPerito: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
    thanksVENTA: {
    color: '#555',
    fontSize: 8,
    textAlign: 'right',
    marginTop: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  thanksPerit:{
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  imagen2: {
    width: 200,
    height: 100,
    marginBottom: 10,
    marginRight: 10,
    border: "1px solid #ccc",
    borderRadius: 5,
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
});

export const handleDownloadPdf = (imagenes) => {
  const proyecto = document.getElementById("Proyecto").value;
  const Fuente = document.getElementById("Fuente").value;
  const Cod_sigma = document.getElementById("Cod_sigma").value;
  const inmobiliaria = document.getElementById("inmobiliaria").value;
  const Interior_Exterior = document.getElementById("Interior_Exterior").value;
  const Telefono1 = document.getElementById("Telefono1").value;
  const Telefono2 = document.getElementById("Telefono2").value;
  const Telefono3 = document.getElementById("Telefono3").value;
  const Area_M2 = document.getElementById("Area_M2").value;
  const Area_mezanine = document.getElementById("Area_mezanine").value;
  const Area_terraza_M2 = document.getElementById("Area_terraza_M2").value;
  const Num_piso = document.getElementById("Num_piso").value;
  const Alcobas = document.getElementById("Alcobas").value;
  const Num_garajes = document.getElementById("Num_garajes").value;
  const Valor_Precio_m2 = document.getElementById("Valor_Precio_m2").value;
  const Costo_administracion = document.getElementById("Costo_administracion").value;
  const Valor_arriendo = document.getElementById("Valor_arriendo").value;
  const Antiguedad = document.getElementById("Antiguedad").value;
  const negociacionInput = document.getElementById("negociacion");
  const negociacionDate = new Date(negociacionInput.value);
  const formattedDate = negociacionDate.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  if (!proyecto || !Fuente || !Cod_sigma || !inmobiliaria || !Interior_Exterior || !Telefono1 || !Telefono2 || !Telefono3 || !Area_M2 || !Area_mezanine || !Area_terraza_M2 || !Num_piso || !Valor_Precio_m2 || !Costo_administracion || !Valor_arriendo || !Antiguedad || !formattedDate) {
    Swal.fire({
      title: 'Error',
      text: 'Debe llenar todos los campos del formulario',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    return;
  }

  if (imagenes.length === 0) {
    Swal.fire({
      title: "Error",
      text: "Debe seleccionar al menos una imagen",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }

  const data = [
    { id: 1, first: "Proyecto", last: proyecto },
    { id: 2, first: "Fuente", last: Fuente },
    { id: 3, first: "Cod_sigma", last: Cod_sigma },
    { id: 4, first: "Inmobiliaria", last: inmobiliaria },
    { id: 5, first: "Interior_Exterior", last: Interior_Exterior },
    { id: 6, first: "Telefono1", last: Telefono1 },
    { id: 7, first: "Telefono2", last: Telefono2 },
    { id: 8, first: "Telefono3", last: Telefono3 },
    { id: 9, first: "Area_M2", last: Area_M2 },
    { id: 10, first: "Area_mezanine", last: Area_mezanine },
    { id: 11, first: "Area_terraza_M2", last: Area_terraza_M2 },
    { id: 12, first: "Num_piso", last: Num_piso },
    { id: 13, first: "Alcobas", last: Alcobas },
    { id: 14, first: "Num_garajes", last: Num_garajes },
    { id: 15, first: "Valor_Precio_m2", last: Valor_Precio_m2 },
    { id: 16, first: "Costo_administracion", last: Costo_administracion },
    { id: 17, first: "Valor_arriendo", last: Valor_arriendo },
    { id: 18, first: "Antiguedad", last: Antiguedad },
    { id: 19, first: "negociacion", last: formattedDate }, 
  ];
  
  pdf(
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logo} style={styles.image} />
        <Text style={styles.thanksPerito}>Registro Perito</Text>
        <Text style={styles.thanksPerit}>Registro Perito</Text>
        <Text style={styles.thanksVENTA}>FACTURA ELECTRÓNICA DE REGISTRO</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 0.1 }]}>#</Text>
            <Text style={[styles.tableHeaderCell, { flex: 0.3 }]}>
              Informacion
            </Text>
            <Text style={[styles.tableHeaderCell, { flex: 0.3 }]}>
              Resultado Final
            </Text>
          </View>
          {data.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 0.1 }]}>{item.id}</Text>
              <Text style={[styles.tableCell, { flex: 0.3 }]}>
                {item.first}
              </Text>
              <Text style={[styles.tableCell, { flex: 0.3 }]}>{item.last}</Text>
            </View>
          ))}
        </View>

        <View >
          <Text style={styles.thanksPerit}>Registro Perito</Text>
          <Text style={styles.thanksPerit}>Registro Perito</Text>
          <Text style={styles.thanksPerit}>Registro Perito</Text>
          <Text style={styles.thanksPerit}>Registro Perito</Text>
          <Text style={styles.thanksPerit}>Registro Perito</Text>
          <Text style={styles.thanksPerito}>Registro Perito (Imagenes)</Text>
          <Text style={styles.thanksPerit}>Registro Perito</Text>
        </View>

        <View style={styles.imageContainer}>
          {imagenes.map((imagen, index) => (
            <View key={index} style={styles.imagen2Wrapper}>
              <Image src={imagen.imagen} style={styles.imagen2} />
            </View>
          ))}
        </View>

        <View style={styles.thanksContainer}>
          <Text style={styles.thanksText}>
            ¡Muchas gracias por utilizar este medio!
          </Text>
        </View>
      </Page>
    </Document>
  )

    .toBlob()
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
            // Mostrar mensaje de éxito solo si los campos de entrada están llenos
    Swal.fire({
      title: "Exito",
      text: "El PDF Se descargo correctamente",
      icon: "success",
      confirmButtonText: "Ok",
    });
      link.href = url;
      link.setAttribute("download", "Ticket.pdf");
      document.body.appendChild(link);
      link.click();
    });
};
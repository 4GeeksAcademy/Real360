import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF"
  },

  header: {
    alignItems: "flex-end",
    marginBottom: 35
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },

  receipt: {
    fontSize: 12,
    marginBottom: 5
  },

  date: {
    fontSize: 12
  },
  section: {
    marginBottom: 30
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 12
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: 6
  },

  label: {
    width: 110,
    fontWeight: "bold"
  },

  value: {
    flex: 1
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 30
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2F67A2",
    color: "#FFFFFF",
    fontWeight: "bold"
  },

  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC"
  },

  colDescription: {
    width: "55%",
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: "#CCCCCC"
  },

  colPrice: {
    width: "15%",
    padding: 8,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#CCCCCC"
  },

  colQuantity: {
    width: "15%",
    padding: 8,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#CCCCCC"
  },

  colTotal: {
    width: "15%",
    padding: 8,
    textAlign: "center"
  },
  totalContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 30
  },

  totalBox: {
    width: "35%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#CCCCCC"
  },

  totalLabel: {
    flex: 1,
    padding: 8,
    fontWeight: "bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#CCCCCC"
  },

  totalValue: {
    width: 90,
    padding: 8,
    textAlign: "center",
    fontWeight: "bold"
  },
});

const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};

const meses = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

export const ConstanciaPDF = ({ datos }) => {
  console.log("DATOS PDF:", datos);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/*Encabezado*/}
        <View style={styles.header}>
          <Text style={styles.title}>
            CONSTANCIA DE PAGO
          </Text>
          <Text style={styles.receipt}>
            Recibo N° {datos.receipt_number}
          </Text>
          <Text style={styles.date}>
            Fecha de emisión:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {formatDate(datos.issue_date)}
            </Text>
          </Text>
        </View>

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            INFORMACIÓN DEL PROPIETARIO
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>
              {
                datos.unit?.owner
                  ? `${datos.unit.owner.firstname} ${datos.unit.owner.lastname}`
                  : "Sin propietario registrado"
              }
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Departamento:</Text>
            <Text style={styles.value}>
              {datos.unit?.unit_number || ""}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Edificio:</Text>
            <Text style={styles.value}>
              {datos.unit?.building || ""}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Dirección:</Text>
            <Text style={styles.value}>Calle Cerezo 395, Surquillo</Text>
          </View>

        </View>
        <View style={styles.table}>

          {/* Cabecera */}
          <View style={styles.tableHeader}>
            <Text style={styles.colDescription}>
              Descripción
            </Text>
            <Text style={styles.colPrice}>
              Precio
            </Text>
            <Text style={styles.colQuantity}>
              Cant.
            </Text>
            <Text style={styles.colTotal}>
              Total
            </Text>
          </View>

          {
            datos.debts_detail?.map((debt) => (
              <View
                style={styles.tableRow}
                key={debt.id}
              >
                <Text style={styles.colDescription}>
                  Pago de cuota de {meses[debt.fee_month]} {debt.fee_year}
                </Text>

                <Text style={styles.colPrice}>
                  {datos.currency} {Number(debt.fee_amount).toFixed(2)}
                </Text>

                <Text style={styles.colQuantity}>
                  1
                </Text>

                <Text style={styles.colTotal}>
                  {datos.currency} {Number(debt.fee_amount).toFixed(2)}
                </Text>

              </View>
            ))
          }

        </View>

        <View>
          <Text style={{ marginBottom: 15 }}>
            Fecha del depósito:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {formatDate(datos.payment_date)}
            </Text>
          </Text>
          <View style={styles.totalContainer}>
            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>
                TOTAL
              </Text>
              <Text style={styles.totalValue}>
                {datos.currency} {Number(datos.amount).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};
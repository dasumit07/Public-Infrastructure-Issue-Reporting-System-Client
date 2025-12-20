import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
});

const InvoicePDF = ({ payment }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>INVOICE</Text>

            <View style={styles.section}>
                <Text><Text style={styles.label}>Transaction ID:</Text> {payment.transactionId}</Text>
                <Text><Text style={styles.label}>Paid By:</Text> {payment.email}</Text>
                <Text><Text style={styles.label}>Amount:</Text> ${payment.amount}</Text>
                <Text><Text style={styles.label}>Status:</Text> {payment.paymentStatus}</Text>
                <Text>
                    <Text style={styles.label}>Paid At:</Text>{' '}
                    {new Date(payment.paidAt).toLocaleString()}
                </Text>
            </View>

            {payment.issueName && (
                <View style={styles.section}>
                    <Text><Text style={styles.label}>Issue:</Text> {payment.issueName}</Text>
                    <Text><Text style={styles.label}>Tracking ID:</Text> {payment.trackingId}</Text>
                </View>
            )}

            <Text style={{ marginTop: 30, textAlign: 'center' }}>
                Thank you for your payment
            </Text>
        </Page>
    </Document>
);

export default InvoicePDF;

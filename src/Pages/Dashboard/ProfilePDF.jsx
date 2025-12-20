import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        alignSelf: 'center',
    },
});

const ProfilePDF = ({ user }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Citizen Profile</Text>

            {user.photoURL && <Image src={user.photoURL} style={styles.image} />}

            <View style={styles.section}>
                <Text><Text style={styles.label}>Name:</Text> {user.displayName}</Text>
                <Text><Text style={styles.label}>Email:</Text> {user.email}</Text>
                <Text><Text style={styles.label}>Status:</Text> {user.status}</Text>
                <Text>
                    <Text style={styles.label}>Subscription:</Text>{' '}
                    {user.isPremium ? 'Premium' : 'Free'}
                </Text>
            </View>

            <Text style={{ marginTop: 30, textAlign: 'center' }}>
                Generated on {new Date().toLocaleDateString()}
            </Text>
        </Page>
    </Document>
);

export default ProfilePDF;

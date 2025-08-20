import ScrollContainer from "@/components/RnScrollContainer";
import RnText from "@/components/RnText";
import CustomInput from "@/components/ui/CustomInput";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function EditProfile() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Create New Order',
            headerStyle: { backgroundColor: Colors.dark.primary },
            headerTintColor: Colors.dark.white,
        });
    }, [navigation]);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        streetNo: "",
        streetAddress: "Rantnakar khand, south city, Raibarely road",
        nearby: "",
        pinCode: "226025",
        city: "Lucknow",
        state: "UP",
        country: "India",
        accHolder: "",
        accNumber: "",
        ifsc: "",
        bankName: "",
        branchName: "",
        gstNo: "",
    });

    const handleChange = (field: string, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log("Profile Updated:", profile);
        Alert.alert("Success", "Profile updated successfully!");
    };

    const handleChangeImage = () => {
        Alert.alert("Change Photo", "Image picker logic goes here.");
    };

    return (
        <ScrollContainer>
            <View style={{ gap: 8, paddingBottom: 32, paddingHorizontal: 8, paddingTop: 16 }}>

                {/* Profile Image */}
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={handleChangeImage}>
                        <Image
                            source={{
                                uri: "https://avatar.iran.liara.run/public/boy", // replace with actual image
                            }}
                            style={styles.profileImage}
                        />
                        <RnText style={styles.changePhotoText}>Change Photo</RnText>
                    </TouchableOpacity>
                </View>

                {/* Profile Details */}
                <Section title="Profile Details">
                    <View style={{ gap: 8, }}>
                        <CustomInput
                            placeholder="Name"
                            value={profile.name}
                            onChangeText={(text) => handleChange("name", text)}
                        />
                        <CustomInput
                            placeholder="Email"
                            value={profile.email}
                            onChangeText={(text) => handleChange("email", text)}
                        />
                        <CustomInput
                            placeholder="Phone"
                            value={profile.phone}
                            onChangeText={(text) => handleChange("phone", text)}
                        />
                    </View>
                </Section>

                {/* Address Details */}
                <Section title="Address Details">
                    <View style={{ gap: 8, }}>
                        <CustomInput
                            placeholder="Street No"
                            value={profile.streetNo}
                            onChangeText={(text) => handleChange("streetNo", text)}
                        />
                        <CustomInput
                            placeholder="Street Address"
                            value={profile.streetAddress}
                            onChangeText={(text) => handleChange("streetAddress", text)}
                        />
                        <CustomInput
                            placeholder="Near By"
                            value={profile.nearby}
                            onChangeText={(text) => handleChange("nearby", text)}
                        />
                        <CustomInput
                            placeholder="Pin Code"
                            value={profile.pinCode}
                            onChangeText={(text) => handleChange("pinCode", text)}
                        />
                        <CustomInput
                            placeholder="City"
                            value={profile.city}
                            onChangeText={(text) => handleChange("city", text)}
                        />
                        <CustomInput
                            placeholder="State"
                            value={profile.state}
                            onChangeText={(text) => handleChange("state", text)}
                        />
                        <CustomInput
                            placeholder="Country"
                            value={profile.country}
                            onChangeText={(text) => handleChange("country", text)}
                        />
                    </View>
                </Section>

                {/* Bank Details */}
                <Section title="Bank Details">
                    <View style={{ gap: 8, }}>
                        <CustomInput
                            placeholder="Account Holder Name"
                            value={profile.accHolder}
                            onChangeText={(text) => handleChange("accHolder", text)}
                        />
                        <CustomInput
                            placeholder="Account Number"
                            value={profile.accNumber}
                            onChangeText={(text) => handleChange("accNumber", text)}
                        />
                        <CustomInput
                            placeholder="IFSC Code"
                            value={profile.ifsc}
                            onChangeText={(text) => handleChange("ifsc", text)}
                        />
                        <CustomInput
                            placeholder="Bank Name"
                            value={profile.bankName}
                            onChangeText={(text) => handleChange("bankName", text)}
                        />
                        <CustomInput
                            placeholder="Branch Name"
                            value={profile.branchName}
                            onChangeText={(text) => handleChange("branchName", text)}
                        />
                        <CustomInput
                            placeholder="GST No"
                            value={profile.gstNo}
                            onChangeText={(text) => handleChange("gstNo", text)}
                        />
                    </View>
                </Section>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <RnText style={styles.saveBtnText}>Save Changes</RnText>
                </TouchableOpacity>

            </View>
        </ScrollContainer>
    );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
        <RnText style={styles.sectionTitle}>{title}</RnText>
        {children}
    </View>
);

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: Colors.light.primary,
    },
    changePhotoText: {
        marginTop: 8,
        fontSize: 13,
        color: Colors.light.primary,
        textAlign: "center",
    },
    section: {
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        color: Colors.light.primary,
    },
    saveBtn: {
        backgroundColor: Colors.light.primary,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30,
    },
    saveBtnText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
    },
});

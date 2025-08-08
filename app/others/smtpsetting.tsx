import ScrollContainer from "@/components/RnScrollContainer";
import RnText from "@/components/RnText";
import { Colors } from "@/constants/Colors";
import { FontSize } from "@/constants/FontSize";
import { hp, wp } from "@/utils/Dimensions";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
    StyleSheet,
    Switch,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SmtpSettings() {
    const [smtpHost, setSmtpHost] = useState("");
    const [smtpPort, setSmtpPort] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [sslEnabled, setSslEnabled] = useState(false);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ title: "SMTP Settings",headerStyle: {
                    backgroundColor: Colors.dark.primary, // Customize this
                  },
                  headerTintColor: Colors.dark.white, // Customize this
                });
    }, [navigation]);
    return (
        <ScrollContainer>
            <View style={styles.container}>
                <RnText style={styles.title}>Edit SMTP Configuration</RnText>

                {/* SMTP Host and Port */}
                <View style={styles.row}>
                    <View style={styles.halfInput}>
                        <RnText style={styles.label}>SMTP Host *</RnText>
                        <TextInput
                            value={smtpHost}
                            onChangeText={setSmtpHost}
                            placeholder="Enter SMTP Host"
                            style={styles.input}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.halfInput}>
                        <RnText style={styles.label}>SMTP Port *</RnText>
                        <TextInput
                            value={smtpPort}
                            onChangeText={setSmtpPort}
                            placeholder="0"
                            keyboardType="numeric"
                            style={styles.input}
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>

                {/* Username */}
                <RnText style={styles.label}>Username *</RnText>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    placeholder="Enter Username"
                    placeholderTextColor="#999"
                />

                {/* Password */}
                <RnText style={styles.label}>Password *</RnText>
                <View style={styles.passwordWrapper}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter Password"
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#999"
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                        <FontAwesome
                            name={showPassword ? "eye-slash" : "eye"}
                            size={20}
                            color="#888"
                        />
                    </TouchableOpacity>
                </View>

                {/* SSL */}
                <View style={styles.sslRow}>
                    <RnText style={styles.label}>Use SSL</RnText>
                    <View style={styles.switchContainer}>
                        <RnText>Enable SSL</RnText>
                        <Switch
                            value={sslEnabled}
                            onValueChange={setSslEnabled}
                            thumbColor={sslEnabled ? Colors.dark.primary : "#ccc"}
                            trackColor={{ false: "#ccc", true: "#b3d4fc" }}
                        />
                    </View>
                </View>

                {/* Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelBtn}>
                        <RnText style={styles.cancelText}>✕ Cancel</RnText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saveBtn}>
                        <RnText style={styles.saveText}>Save SMTP Configuration</RnText>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: wp(5),
    },
    title: {
        fontSize: FontSize.extraLarge,
        fontWeight: "600",
        marginBottom: hp(2),
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    halfInput: {
        width: "48%",
    },
    label: {
        marginTop: hp(2),
        marginBottom: hp(0.5),
        fontSize: FontSize.small,
        fontWeight: "500",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        padding: wp(3),
        fontSize: FontSize.small,
        backgroundColor: "#fafafa",
        marginBottom: hp(1),
    },
    passwordWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        backgroundColor: "#fafafa",
        paddingRight: wp(2),
        marginBottom: hp(2),
    },
    eyeIcon: {
        paddingHorizontal: wp(2),
    },
    sslRow: {
        marginTop: hp(1),
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: hp(1),
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: hp(3),
    },
    cancelBtn: {
        backgroundColor: "#f5f5f5",
        paddingVertical: hp(1.4),
        paddingHorizontal: wp(5),
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    cancelText: {
        color: "#333",
        fontWeight: "600",
    },
    saveBtn: {
        backgroundColor: Colors.dark.primary,
        paddingVertical: hp(1.4),
        paddingHorizontal: wp(5),
        borderRadius: 6,
    },
    saveText: {
        color: "#fff",
        fontWeight: "600",
    },
});

import Tenant from "@/models/Tenant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TENANTS_KEY = "tenants";
const SELECTED_TENANT_KEY = "selectedTenant";
const USER_ID_KEY = "userId";
const USER_NAME_KEY = "userName";
const USER_EMAIL_KEY = "userEmail";
// ✅ Save list of tenants
export const saveTenants = async (tenants: Tenant[]) => {
  try {
    await AsyncStorage.setItem(TENANTS_KEY, JSON.stringify(tenants));
  } catch (error) {
    console.error("Error saving tenants:", error);
  }
};

// ✅ Get all tenants
export const getTenants = async (): Promise<Tenant[]> => {
  try {
    const data = await AsyncStorage.getItem(TENANTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return [];
  }
};



// ✅ Add new tenant
export const addTenant = async (tenant: Tenant) => {
  const tenants = await getTenants();
  tenants.push(tenant);
  await saveTenants(tenants);
};

// ✅ Set selected tenant
export const setSelectedTenant = async (tenant: any) => {
  try {
    await AsyncStorage.setItem(SELECTED_TENANT_KEY, JSON.stringify(tenant));
  } catch (error) {
    console.error("Error setting selected tenant:", error);
  }
};

// ✅ Get selected tenant
export const getSelectedTenant = async () => {
  try {
    const tenant = await AsyncStorage.getItem(SELECTED_TENANT_KEY);
    return tenant ? JSON.parse(tenant) : null; // ✅ parse back to object
  } catch (error) {
    console.error("Error getting selected tenant:", error);
    return null;
  }
};



// ✅ Set user ID
export const setUserId = async (userId: string) => {
  try {
    await AsyncStorage.setItem(USER_ID_KEY, userId);
  } catch (error) {
    console.error("Error setting user ID:", error);
  }
};

// ✅ Get user ID
export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem(USER_ID_KEY);
    return userId ? userId : null; // ✅ parse back to object
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};
// ✅ Set user email
export const setUserEmail = async (userEmail: string) => {
  try {
    await AsyncStorage.setItem(USER_EMAIL_KEY, userEmail);
  } catch (error) {
    console.error("Error setting user email:", error);
  }
};

// ✅ Get user email
export const getUserEmail = async () => {
  try {
    const userEmail = await AsyncStorage.getItem(USER_EMAIL_KEY);
    return userEmail ? userEmail : null; // ✅ parse back to object
  } catch (error) {
    console.error("Error getting user email:", error);
    return null;
  }
};


// ✅ Set user name
export const setUserNames = async (userName: string) => {
  try {
    await AsyncStorage.setItem(USER_NAME_KEY, userName);
  } catch (error) {
    console.error("Error setting user name:", error);
  }
};

// ✅ Get user name
export const getUserName = async () => {
  try {
    const userName = await AsyncStorage.getItem(USER_NAME_KEY);
    return userName ? userName : null; // ✅ parse back to object
  } catch (error) {
    console.error("Error getting user name:", error);
    return null;
  }
};



export const clearSelectedTenant = async () => {
  try {
    await AsyncStorage.removeItem(SELECTED_TENANT_KEY);
  } catch (error) {
    console.error("Error clearing selected tenant:", error);
  }
};

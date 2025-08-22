// src/services/inventoryService.ts
import api from "./api";
class inventoryService {
    createCustomer(data: any) {
        return api.post("/inventory-service/api/Customer/Create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    getCustomers() {
        return api.get("/inventory-service/api/Customer/GetAll");
    }

    getCustomerById(customerId: string) {
        return api.get(`/inventory-service/api/Customer/GetById?id=${customerId}`);
    }

    updateCustomer(customerId: string, data: any) {
        return api.put(`/inventory-service/api/Customer/Updatedby/${customerId}`, data);
    }

    deleteCustomer(customerId: string) {
        return api.delete(`/inventory-service/api/Customer?customerId=${customerId}`);
    }

    // Product APIs
    createProduct(data: any) {
        return api.post("/inventory-service/api/Product/Create", data);
    }

    getProducts() {
        return api.get("/inventory-service/api/Product/GetAll");
    }

    getProductById(productId: string) {
        return api.get(`/inventory-service/api/Product/GetById?id=${productId}`);
    }

    updateProduct(productId: string, data: any) {
        return api.put(`/inventory-service/api/Product/Updatedby/${productId}`, data);
    }

    deleteProduct(productId: string) {
        return api.delete(`/inventory-service/api/Product?productId=${productId}`);
    }
    // Inventory APIs
    getAllUnits() {
        return api.get("/inventory-service/api/Unit/GetAll");
    }

    getCategoriesInfo() {
        return api.get("/inventory-service/api/Inventory/global/Categories-info");
    }

    getParentCategories() {
        return api.get("/inventory-service/api/Category/GetParentCategoryIDAll");
    }

}

export default new inventoryService();

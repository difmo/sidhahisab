// models/Tenant.ts
export default class Tenant {
    TenantID: string;
    Role: string;
    Name: string;

    constructor(TenantID: string, Role: string, Name: string, Phone: string, Address: string) {
        this.TenantID = TenantID;
        this.Role = Role;
        this.Name = Name;
    }
}

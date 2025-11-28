// Input Validation Utilities
class Validator {
    static validateTableNumber(tableNumber) {
        const num = parseInt(tableNumber);
        if (isNaN(num) || num < 1 || num > 50) {
            throw new Error('Nomor meja harus antara 1-50');
        }
        return num;
    }

    static validateOrderItems(items) {
        if (!Array.isArray(items)) {
            throw new Error('Items harus berupa array');
        }
        
        if (items.length === 0) {
            throw new Error('Minimal satu item harus dipesan');
        }
        
        if (items.length > 50) {
            throw new Error('Maksimal 50 item per pesanan');
        }

        items.forEach((item, index) => {
            if (!item.menu_item_id || !Number.isInteger(item.menu_item_id)) {
                throw new Error(`Item ${index + 1}: menu_item_id harus valid`);
            }
            
            if (!item.quantity || !Number.isInteger(item.quantity) || item.quantity < 1) {
                throw new Error(`Item ${index + 1}: quantity harus minimal 1`);
            }
            
            if (item.quantity > 99) {
                throw new Error(`Item ${index + 1}: quantity maksimal 99`);
            }
        });

        return items;
    }

    static validateStatus(status) {
        const validStatuses = ['orderan_masuk', 'orderan_selesai', 'orderan_diantar', 'dibayar'];
        if (!validStatuses.includes(status)) {
            throw new Error('Status tidak valid');
        }
        return status;
    }

    static validateMenuId(id) {
        const num = parseInt(id);
        if (isNaN(num) || num < 1) {
            throw new Error('ID menu tidak valid');
        }
        return num;
    }

    static sanitizeString(input, maxLength = 255) {
        if (typeof input !== 'string') {
            throw new Error('Input harus berupa string');
        }
        
        const trimmed = input.trim();
        if (trimmed.length === 0) {
            throw new Error('Input tidak boleh kosong');
        }
        
        if (trimmed.length > maxLength) {
            throw new Error(`Input maksimal ${maxLength} karakter`);
        }
        
        // Basic XSS prevention
        return trimmed.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }
}

module.exports = Validator;
const pool = require('../../config/db');

module.exports = {
    insertFormResponse: (data, callback) => {
        pool.query(
            `INSERT INTO efficiency_report.responses (
                employee_name, warehouse_location, submitted_date, task_date, process_prime_qty, process_prime_time,
                process_rapid_qty, process_rapid_time, add_inventory_qty, add_inventory_time, bulk_cases_processed_qty,
                bulk_cases_processed_time, bulk_cases_labeled_qty, bulk_cases_labeled_time, items_labeled_qty,
                items_labeled_time, processed_removal_qty, processed_removal_time, process_returns_qty, process_returns_time,
                audit_locations_qty, audit_locations_time, process_onsite_qty, process_onsite_time)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.employeeName, data.warehouseLocation, data.submittedDate, data.taskDate,
                data.processPrimeQty, data.processPrimeTime, data.processRapidQty, data.processRapidTime,
                data.addInventoryQty, data.addInventoryTime, data.bulkCasesProcessedQty, data.bulkCasesProcessedTime,
                data.bulkCasesLabeledQty, data.bulkCasesLabeledTime, data.itemsLabeledQty, data.itemsLabeledTime,
                data.processedRemovalQty, data.processedRemovalTime, data.processReturnsQty, data.processReturnsTime,
                data.auditLocationsQty, data.auditLocationsTime, data.processOnsiteQty, data.processOnsiteTime
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                };

                return callback(null, results);
            }
        );
    }
};
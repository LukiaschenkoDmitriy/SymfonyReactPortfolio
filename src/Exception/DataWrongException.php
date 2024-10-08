<?php

namespace App\Exception;

/**
 * Exception thrown when data validation fails.
 */
class DataWrongException extends \Exception {
    /**
     * Constructs a new DataWrongException.
     *
     * @param string $data_name The name of the data that failed validation.
     * @param string $field The specific field that is missing or invalid.
     * @param string $add_info Additional information about the error (optional).
     */
    public function __construct(string $data_name, string $field, string $add_info = "") {
        // Pass a custom message to the parent constructor
        parent::__construct("Data error '$data_name'. Not all data was transferred, or, specifically, '$field' is missing. $add_info");
    }
}

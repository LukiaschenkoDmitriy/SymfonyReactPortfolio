<?php

namespace App\Exception;

class DataWrongException extends \Exception {
    public function __construct($data_name, $field, $add_info = "") {
        parent::__construct(`Data error '$data_name'. Not all data was transferred, or, specifically, '$field' is missing. $add_info`);
    }
}
<?php

namespace App\Data;

use App\Exception\DataWrongException;

/**
 * Represents contact form data and validates it.
 */
class ContactData {
    public string $name;
    public string $email;
    public string $theme;
    public string $message;

    /**
     * Initializes the ContactData object with the provided data.
     *
     * @param array $data An associative array containing contact form data.
     * @throws DataWrongException if any required field is missing.
     */
    public function __construct(array $data) {
        try {
            $this->name = $data["name"];
            $this->email = $data["email"];
            $this->theme = $data["theme"];
            $this->message = $data["message"];
        } catch (\Exception $e) {
            throw new DataWrongException("Contact", "name | email | theme | message", $e->getMessage());
        }
    }

    /**
     * Validates the contact data.
     *
     * @return array An associative array of validation errors.
     */
    public function getErrors(): array {
        $errors = [];

        if (strlen($this->name) === 0) $errors["name"] = "wrong";
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) $errors["email"] = "wrong";
        if (strlen($this->theme) === 0) $errors["theme"] = "wrong";
        if (strlen($this->message) === 0) $errors["message"] = "wrong";

        return $errors;
    }
}

/**
 * Represents a pricing category for tickets
 * Corresponds to the PriceTypeOpenApiModel in the backend
 * Examples: Normal, Student, Senior, Child
 */
export interface PriceType {
  /** Unique identifier of the price type */
  id: number;

  /** Code of the price category (e.g., "NORMAL", "STUDENT", "SENIOR") */
  code: string;

  /** Label/name of the price category (e.g., "Normal", "Tarif -26 ans", "Tarif -14 ans") */
  label: string;

  /** Description of who qualifies for this price type */
  description?: string;

  /** Discount percentage applied (0-100) */
  discountPercentage?: number;

  /** Whether this price type is active */
  isActive?: boolean;

  /** Creation timestamp */
  createdAt?: string;

  /** Last update timestamp */
  updatedAt?: string;

  /** Calculated price (computed on frontend based on base price and discount) */
  price?: number;
}



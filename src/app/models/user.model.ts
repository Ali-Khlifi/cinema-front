/**
 * Represents a user in the cinema system
 * Corresponds to the UserDto in the backend
 * Typically synchronized with Keycloak user
 */
export interface User {
  /** Unique identifier of the user */
  id: number;

  /** User's email address (unique) */
  email: string;

  /** User's first name */
  firstName: string;

  /** User's last name */
  lastName: string;

  /** Keycloak subject identifier (sub claim from JWT) */
  keycloakId: string;

  /** Whether the user account is active */
  isActive?: boolean;

  /** User's phone number */
  phoneNumber?: string;

  /** Full name for display (computed from firstName + lastName) */
  fullName?: string;
}




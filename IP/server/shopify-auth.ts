const SHOPIFY_DOMAIN = "p52yuw-uq.myshopify.com";
const STOREFRONT_TOKEN = "c65b638b635b6782cc4d5a467c024378";
const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; field?: string[] }>;
}

interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

interface CustomerUserError {
  code: string;
  field: string[];
  message: string;
}

interface Customer {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  acceptsMarketing: boolean;
  createdAt: string;
  updatedAt: string;
  defaultAddress: {
    id: string;
    address1: string | null;
    city: string | null;
    country: string | null;
    zip: string | null;
  } | null;
}

async function shopifyGraphQL<T>(query: string, variables: Record<string, any> = {}): Promise<GraphQLResponse<T>> {
  const response = await fetch(STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  return response.json();
}

export async function customerLogin(email: string, password: string): Promise<{
  success: boolean;
  accessToken?: CustomerAccessToken;
  errors?: CustomerUserError[];
}> {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const result = await shopifyGraphQL<{
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(query, { input: { email, password } });

  if (result.errors) {
    return {
      success: false,
      errors: result.errors.map((e) => ({
        code: "GRAPHQL_ERROR",
        field: [],
        message: e.message,
      })),
    };
  }

  const { customerAccessToken, customerUserErrors } = result.data!.customerAccessTokenCreate;

  if (customerUserErrors.length > 0) {
    return { success: false, errors: customerUserErrors };
  }

  if (!customerAccessToken) {
    return {
      success: false,
      errors: [{ code: "INVALID_CREDENTIALS", field: [], message: "Invalid email or password" }],
    };
  }

  return { success: true, accessToken: customerAccessToken };
}

export async function customerRegister(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
): Promise<{
  success: boolean;
  customer?: { id: string; email: string };
  errors?: CustomerUserError[];
}> {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const input: Record<string, any> = {
    email,
    password,
    acceptsMarketing: true,
  };

  if (firstName) input.firstName = firstName;
  if (lastName) input.lastName = lastName;

  const result = await shopifyGraphQL<{
    customerCreate: {
      customer: { id: string; email: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(query, { input });

  if (result.errors) {
    return {
      success: false,
      errors: result.errors.map((e) => ({
        code: "GRAPHQL_ERROR",
        field: [],
        message: e.message,
      })),
    };
  }

  const { customer, customerUserErrors } = result.data!.customerCreate;

  if (customerUserErrors.length > 0) {
    return { success: false, errors: customerUserErrors };
  }

  if (!customer) {
    return {
      success: false,
      errors: [{ code: "UNKNOWN_ERROR", field: [], message: "Failed to create account" }],
    };
  }

  return { success: true, customer };
}

export async function getCustomerByToken(accessToken: string): Promise<{
  success: boolean;
  customer?: Customer;
  error?: string;
}> {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        phone
        acceptsMarketing
        createdAt
        updatedAt
        defaultAddress {
          id
          address1
          city
          country
          zip
        }
      }
    }
  `;

  const result = await shopifyGraphQL<{
    customer: Customer | null;
  }>(query, { customerAccessToken: accessToken });

  if (result.errors) {
    return { success: false, error: result.errors[0].message };
  }

  if (!result.data?.customer) {
    return { success: false, error: "Customer not found or token expired" };
  }

  return { success: true, customer: result.data.customer };
}

export async function renewAccessToken(accessToken: string): Promise<{
  success: boolean;
  accessToken?: CustomerAccessToken;
  error?: string;
}> {
  const query = `
    mutation customerAccessTokenRenew($customerAccessToken: String!) {
      customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const result = await shopifyGraphQL<{
    customerAccessTokenRenew: {
      customerAccessToken: CustomerAccessToken | null;
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>(query, { customerAccessToken: accessToken });

  if (result.errors) {
    return { success: false, error: result.errors[0].message };
  }

  const { customerAccessToken, userErrors } = result.data!.customerAccessTokenRenew;

  if (userErrors.length > 0) {
    return { success: false, error: userErrors[0].message };
  }

  if (!customerAccessToken) {
    return { success: false, error: "Failed to renew token" };
  }

  return { success: true, accessToken: customerAccessToken };
}

export async function deleteAccessToken(accessToken: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const query = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
          field
          message
        }
      }
    }
  `;

  const result = await shopifyGraphQL<{
    customerAccessTokenDelete: {
      deletedAccessToken: string | null;
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>(query, { customerAccessToken: accessToken });

  if (result.errors) {
    return { success: false, error: result.errors[0].message };
  }

  return { success: true };
}

export async function recoverCustomerPassword(email: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const result = await shopifyGraphQL<{
    customerRecover: {
      customerUserErrors: CustomerUserError[];
    };
  }>(query, { email });

  if (result.errors) {
    return { success: false, error: result.errors[0].message };
  }

  const { customerUserErrors } = result.data!.customerRecover;

  if (customerUserErrors.length > 0) {
    return { success: false, error: customerUserErrors[0].message };
  }

  return { success: true };
}

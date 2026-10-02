export const getAdminMessages = {
  success: "Admin retrieved successfully",
  failure: "Failed to retrieve admin",
  notFoundEmail: (email: string) => `Admin with email ${email} not found`,
};

export const createAdminMessages = {
  success: "Admin created successfully",
  failure: "Failed to create admin",
  alreadyExists: (email: string) => `Admin with email ${email} already exists`,
};

export const signUpAdminMessages = {
  success: "You registered successfully",
  failure: "Failed to register",
};

export const getAdminMessages = {
  success: "Admin retrieved successfully",
  failure: "Failed to retrieve admin",
  notFoundEmail: (email: string) => `Admin with email ${email} not found`,
};

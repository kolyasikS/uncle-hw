export const createUserMessages = {
  success: "User created successfully",
  failure: "Failed to create user",
  alreadyExists: (email: string) => `User with email ${email} already exists`,
};

export const getAllUsersMessages = {
  success: "Successfully retrieved users",
  failure: "Users retrieving failed",
};

export const getUserByIdMessages = {
  success: "User retrieved successfully",
  failure: "Failed to retrieve user",
  notFound: (id: string) => `User with ID ${id} not found`,
};

export const updateUserMessages = {
  success: "User updated successfully",
  failure: "Failed to update user",
};

export const deleteUserMessages = {
  success: "User deleted successfully",
  failure: "Failed to delete user",
};

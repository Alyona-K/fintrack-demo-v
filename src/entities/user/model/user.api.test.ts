import { userApi } from "./user.api";
import type { UpdateUserPayload } from "./user.types";
import { demoUsers } from "@/data/mock/demoUsers";

describe("userApi (demo version)", () => {
  const userId = 1;

  it("getById returns a user if exists", async () => {
    const result = await userApi.getById(userId);
    const expected = demoUsers.find((u) => u.id === userId);
    expect(result).toEqual(expected);
  });

  it("getById throws an error if user not found", async () => {
    await expect(userApi.getById(999)).rejects.toThrow("User not found");
  });

  it("update changes user data and returns updated user", async () => {
    const payload: UpdateUserPayload = { firstName: "NewName" };
    const result = await userApi.update(userId, payload);
    const expected = { ...demoUsers.find((u) => u.id === userId), ...payload };
    expect(result).toEqual(expected);
    expect(demoUsers.find((u) => u.id === userId)?.firstName).toBe("NewName");
  });

  it("update throws if user not found", async () => {
    await expect(userApi.update(999, { firstName: "X" })).rejects.toThrow(
      "User not found"
    );
  });

  it("update with empty payload returns user unchanged", async () => {
    const oldUser = { ...demoUsers.find((u) => u.id === userId)! };
    const result = await userApi.update(userId, {});
    expect(result).toEqual(oldUser);
  });
});

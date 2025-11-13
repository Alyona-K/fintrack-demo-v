jest.mock("./user.api");

import { act } from "@testing-library/react";
import { useUserStore } from "./user.store";
import { userApi } from "./user.api";

describe("User Store", () => {
  const mockUser = {
    id: 1,
    email: "user@test.com",
    firstName: "Test",
    lastName: "User",
    avatar: "",
  };

  const updatedUser = { ...mockUser, firstName: "Updated" };

  beforeEach(() => {
    jest.resetAllMocks();
    useUserStore.getState().setUser(null); // сброс сторе
  });

  it("sets user", () => {
    act(() => {
      useUserStore.getState().setUser(mockUser);
    });
    expect(useUserStore.getState().user).toEqual(mockUser);
  });

  it("fetches user by id", async () => {
    (userApi.getById as jest.Mock).mockResolvedValue(mockUser);

    await act(async () => {
      await useUserStore.getState().fetchUser(mockUser.id);
    });

    expect(userApi.getById).toHaveBeenCalledWith(mockUser.id);
    expect(useUserStore.getState().user).toEqual(mockUser);
  });

  it("updates user when exists", async () => {
    act(() => useUserStore.getState().setUser(mockUser));
    (userApi.update as jest.Mock).mockResolvedValue(updatedUser);

    await act(async () => {
      await useUserStore.getState().updateUser({ firstName: "Updated" });
    });

    expect(userApi.update).toHaveBeenCalledWith(mockUser.id, {
      firstName: "Updated",
    });
    expect(useUserStore.getState().user).toEqual(updatedUser);
  });

  it("does not update if no user exists", async () => {
    (userApi.update as jest.Mock).mockResolvedValue(updatedUser);

    await act(async () => {
      await useUserStore.getState().updateUser({ firstName: "Updated" });
    });

    expect(userApi.update).not.toHaveBeenCalled();
    expect(useUserStore.getState().user).toBeNull();
  });
});

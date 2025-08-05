import axiosInstance from "./axiosInterceptor";

export const userListExchange = async(userId: string) => {
    try {
        const { data } = await axiosInstance.get('/User/list-exchange/', {
            params: {
                user_id: userId
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}
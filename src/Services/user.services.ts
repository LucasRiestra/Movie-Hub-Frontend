export const createUser = async (userObject: {}) => {
    const { VITE_API_URL: url } = import.meta.env;
    try {
        const response = await fetch(`${url}user`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(userObject)
        });

        if (!response.ok) {
            throw new Error(`Error creating user: ${response.statusText}`);
        }

        const dataFetched = await response.json();
        return dataFetched;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

export const getUserByEmail = async (getToken: any, userEmail: string) => {
    const { VITE_API_URL: url } = import.meta.env;
    try {
        const token = await getToken();
        const response = await fetch(`${url}user/email/${userEmail}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`User with email ${userEmail} not found.`);
            } else {
                console.error(`Error fetching user by email: ${response.statusText}`);
            }
            return null;
        }

        const dataFetched = await response.json();
        return dataFetched;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return null;
    }
}

// user.services.ts

// user.services.ts

export const addMovieToUser = async (getToken: any, userId: string, movieData: any) => {
    const { VITE_API_URL: url } = import.meta.env;
    try {
      const token = await getToken();
      const response = await fetch(`${url}movie/${userId}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(movieData),
      });
  
      if (!response.ok) {
        console.error(`Error adding movie to user: ${response.statusText}`);
        return null;
      }
  
      const dataFetched = await response.json();
      return dataFetched;
    } catch (error) {
      console.error("Error adding movie to user:", error);
      return null;
    }
};

  
  